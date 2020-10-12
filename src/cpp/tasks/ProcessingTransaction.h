#ifndef GRADIDO_LOGIN_SERVER_TASKS_PROCESSING_TRANSACTION_INCLUDE 
#define GRADIDO_LOGIN_SERVER_TASKS_PROCESSING_TRANSACTION_INCLUDE

#include "CPUTask.h"

#include "../lib/NotificationList.h"
#include "../lib/DRHash.h"
#include "../model/gradido/TransactionBase.h"

#include "../proto/gradido/TransactionBody.pb.h"

#include "../SingletonManager/LanguageManager.h"

/*
* @author: Dario Rekowski
*
* @date: 25.10.19
* @desc: Task for processing Transactions
*/

enum TransactionType {
	TRANSACTION_NONE,
	TRANSACTION_CREATION,
	TRANSACTION_TRANSFER
};

namespace model {
	namespace gradido {
		class TransactionCreation;
		class TransactionTransfer;
		
	}
}
class SigningTransaction;


class ProcessingTransaction : public UniLib::controller::CPUTask, public NotificationList
{
	friend SigningTransaction;
public:
	//! \param lang for error messages in user language
	ProcessingTransaction(const std::string& proto_message_base64, DHASH userEmailHash, Languages lang, Poco::DateTime transactionCreated = Poco::DateTime());
	virtual ~ProcessingTransaction();

	int run();

	const char* getResourceType() const { return "ProcessingTransaction"; };

	inline TransactionType getType() { lock(); auto t = mType; unlock(); return t; }
	std::string getMemo();
	
	// not secured zone, no locking
	bool isCreation() { return mType == TRANSACTION_CREATION; }
	bool isTransfer() { return mType == TRANSACTION_TRANSFER; }

	model::gradido::TransactionCreation* getCreationTransaction();
	model::gradido::TransactionTransfer* getTransferTransaction();

	static HASH calculateHash(const std::string& proto_message_base64);
	static std::string calculateGenericHash(const std::string& protoMessageBase64);
	inline HASH getHash() { mHashMutex.lock(); HASH hs = mHash; mHashMutex.unlock(); return hs; }

	std::string getBodyBytes();

protected:

	void reportErrorToCommunityServer(std::string error, std::string errorDetails, std::string created);

	TransactionType mType;
	std::string mProtoMessageBase64;

	proto::gradido::TransactionBody mTransactionBody;
	model::gradido::TransactionBase* mTransactionSpecific;

	HASH mHash;
	DHASH mUserEmailHash;
	Languages mLang;
	Poco::Mutex mHashMutex;
	Poco::DateTime mTransactionCreated;
private:

};


#endif //GRADIDO_LOGIN_SERVER_TASKS_PROCESSING_TRANSACTION_INCLUDE
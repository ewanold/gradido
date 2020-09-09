#ifndef _GRADIDO_LOGIN_SERVER_MODEL_HEDERA_TRANSACTION_BODY_H
#define _GRADIDO_LOGIN_SERVER_MODEL_HEDERA_TRANSACTION_BODY_H

/*!
* @author: Dario Rekowski
*
* @date: 02.09.20
*
* @brief: class for composing transaction body for hedera transaction
*
*/

#include "../../proto/hedera/TransactionBody.pb.h"
#include "../../controller/NodeServer.h"
#include "CryptoTransferTransaction.h"
#include "ConsensusCreateTopic.h"

namespace model {
	namespace hedera {
		class TransactionBody
		{
		public:
			TransactionBody(Poco::AutoPtr<controller::HederaId> operatorAccountId, const controller::NodeServerConnection& connection);
			~TransactionBody();

			void setMemo(const std::string& memo);
			void setFee(Poco::UInt64 fee);

			bool setCryptoTransfer(CryptoTransferTransaction& cryptoTransferTransaction);
			bool setCreateTopic(ConsensusCreateTopic& consensusCreateTopicTransaction);
			//bool 

			inline const proto::TransactionBody* getProtoTransactionBody() const { return &mTransactionBody; }
			inline std::string getConnectionString() const { return mConnection.getUriWithPort(); }
			inline controller::NodeServerConnection getConnection() const { return mConnection; }

		protected:
			void updateTimestamp();
			proto::TransactionBody mTransactionBody;
			controller::NodeServerConnection mConnection;
		};
	}
}


#endif //_GRADIDO_LOGIN_SERVER_MODEL_HEDERA_TRANSACTION_BODY_H
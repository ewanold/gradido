#ifndef __GRADIDO_LOGIN_SERVER_CRYPTO_AUTHENTICATED_ENCRYPTION_H
#define __GRADIDO_LOGIN_SERVER_CRYPTO_AUTHENTICATED_ENCRYPTION_H


#include "../SingletonManager/MemoryManager.h"

#include <shared_mutex>

/*! 
 * 
 * \author: Dario Rekowski
 * 
 * \date: 07-06-2020
 *
 * \brief: Wrapper Class for make using libsodium authenticated encryption easy, used for encrypt private keys for user
 *
 */

typedef Poco::UInt64 KeyHashed;

class AuthenticatedEncryption
{
public:

	enum ResultType {
		AUTH_ENCRYPT_OK,
		AUTH_DECRYPT_OK,
		AUTH_CREATE_ENCRYPTION_KEY_FAILED,
		AUTH_NO_KEY,
		AUTH_ENCRYPT_MESSAGE_FAILED,
		AUTH_DECRYPT_MESSAGE_FAILED
	};

	//! \brief init with default algorithms parameter
	AuthenticatedEncryption();
	//! \brief init with custom algorithms parameter
	//! 
	//! details see in libsodium crypto_pwhash 
	AuthenticatedEncryption(unsigned long long opslimit, size_t memlimit, int algo);

	~AuthenticatedEncryption();


	inline KeyHashed getKeyHashed() const { std::shared_lock<std::shared_mutex> _lock(mWorkingMutex);  return mEncryptionKeyHash; }
	inline bool operator == (const AuthenticatedEncryption& b) const {
		std::shared_lock<std::shared_mutex> _lock(mWorkingMutex);
		return mEncryptionKeyHash == b.getKeyHashed();
	}

	inline bool hasKey() const { std::shared_lock<std::shared_mutex> _lock(mWorkingMutex);  return !mEncryptionKey; }

	//! \brief generate encryption key, with default parameter use ca. 300 ms 
	//! 
	//! should be call from task, running in g_CryptoCPUScheduler, lock shared mutex for writing
	//! \param salt_parameter for example email 
	//! \return AUTH_CREATE_ENCRYPTION_KEY_FAILED call strerror(errno) for more details 
	ResultType createKey(const std::string& salt_parameter, const std::string& passwd);

	ResultType encrypt(const MemoryBin* message, MemoryBin** encryptedMessage);

	ResultType decrypt(const MemoryBin* encryptedMessage, MemoryBin** message);

	const char* getErrorMessage(ResultType type);

protected:
	// algorithms parameter
	unsigned long long mOpsLimit;
	size_t			   mMemLimit;
	int				   mAlgo;

	// encryption key and hash
	MemoryBin* mEncryptionKey;
	KeyHashed  mEncryptionKeyHash;

	mutable std::shared_mutex mWorkingMutex;
};

#endif //__GRADIDO_LOGIN_SERVER_CRYPTO_AUTHENTICATED_ENCRYPTION_H
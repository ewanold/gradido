
#include "main.h"
#include <list>
#include "gtest/gtest.h"

#include "Poco/Util/PropertyFileConfiguration.h"
#include "Poco/Environment.h"
#include "Poco/Path.h"
#include "Poco/AsyncChannel.h"
#include "Poco/SimpleFileChannel.h"
#include "Poco/FileChannel.h"
#include "Poco/ConsoleChannel.h"
#include "Poco/SplitterChannel.h"

#include "../SingletonManager/ConnectionManager.h"
#include "../SingletonManager/SessionManager.h"

#include "../lib/Profiler.h"


std::list<Test*> gTests;

void fillTests()
{
	gTests.push_back(new TestTasks());
	gTests.push_back(new TestRegExp());
	gTests.push_back(new TestPassphrase());
	//	gTests.push_back(new LoginTest());
}

int runMysql(std::string sqlQuery)
{
	auto cm = ConnectionManager::getInstance();
	auto session = cm->getConnection(CONNECTION_MYSQL_LOGIN_SERVER);
	Poco::Data::Statement mysqlStatement(session);
	mysqlStatement << sqlQuery;

	try {
		mysqlStatement.execute(true);
	}
	catch (Poco::Exception& ex) {
		printf("exception in runMysql: %s\n", ex.displayText().data());
		return -1;
	}
	return 0;
}

int load(int argc, char* argv[]) {
	// init server config, init seed array
	std::clog << "[load]" << std::endl;
	Poco::AutoPtr<Poco::Util::LayeredConfiguration> test_config(new Poco::Util::LayeredConfiguration);
	std::string config_file_name = Poco::Path::config() + "grd_login/grd_login_test.properties";
#ifdef WIN32 
	config_file_name = "Gradido_LoginServer_Test.properties";
#endif
	if(argc > 1 && strlen(argv[1]) > 4) {
		config_file_name = argv[1];
	}

	try {
		auto cfg = new Poco::Util::PropertyFileConfiguration(config_file_name);
		test_config->add(cfg);
	}
	catch (Poco::Exception& ex) {
		std::clog 
			<< "[load] error loading grd_login_test.properties, make sure this file exist! " 
			<< ex.displayText().data()
			<< std::endl;

		return -3;
	}

	if (!ServerConfig::initServerCrypto(*test_config)) {
		//printf("[Gradido_LoginServer::%s] error init server crypto\n", __FUNCTION__);
		printf("[load] error init server crypto");
		return -1;
	}
	if (!ServerConfig::loadMnemonicWordLists()) {
		printf("[load] error in loadMnemonicWordLists");
		return -2;
	}

	// start cpu scheduler
	uint8_t worker_count = Poco::Environment::processorCount();

	ServerConfig::g_CPUScheduler = new UniLib::controller::CPUSheduler(worker_count, "Default Worker");
	ServerConfig::g_CryptoCPUScheduler = new UniLib::controller::CPUSheduler(2, "Crypto Worker");

	// load up connection configs
	// register MySQL connector
	Poco::Data::MySQL::Connector::registerConnector();
	//Poco::Data::MySQL::Connector::KEY;
	auto conn = ConnectionManager::getInstance();
	//conn->setConnection()
	//printf("try connect login server mysql db\n");
	bool connected = false;
	try {
		if(conn->setConnectionsFromConfig(*test_config, CONNECTION_MYSQL_LOGIN_SERVER)) {
			connected = true;
		}
	}
	catch (Poco::Exception& ex) {
		// maybe we in docker environment and db needs some time to start up
		printf("Poco Exception by connecting to db: %s, let's try again\n", ex.displayText().data());
	}
	if(!connected) {
		// let's wait 10 seconds
		int count = 10;
		while (count > 0) {
			printf("\rwait on mysql/mariadb %d seconds...", count);
			count--;
			Poco::Thread::sleep(1000);
		}
		try {
			if(conn->setConnectionsFromConfig(*test_config, CONNECTION_MYSQL_LOGIN_SERVER)) {
				connected = true;
			}
		} catch(Poco::Exception& ex) {
			printf("Poco Exception by connecting to db: %s, let's wait another 10 seconds\n", ex.displayText().data());
		}
	}
	if(!connected) {
		Poco::Thread::sleep(10000);
		try {
			conn->setConnectionsFromConfig(*test_config, CONNECTION_MYSQL_LOGIN_SERVER);
		} catch(Poco::Exception& ex) {
			printf("Poco Exception by connecting to db: %s, exit\n", ex.displayText().data());
			return -4;
		}
	}
	
	std::string log_Path = "/var/log/grd_login/";
//#ifdef _WIN32
#if defined(_WIN32) || defined(_WIN64)
	log_Path = "./";
#endif
	
	std::string filePath = log_Path + "errorLog.txt";
	Poco::AutoPtr<Poco::ConsoleChannel> logConsoleChannel(new Poco::ConsoleChannel);
	Poco::AutoPtr<Poco::FileChannel> logFileChannel(new Poco::FileChannel(filePath));
	Poco::AutoPtr<Poco::SplitterChannel> logSplitter(new Poco::SplitterChannel);
	logSplitter->addChannel(logConsoleChannel);
	logSplitter->addChannel(logFileChannel);

	Poco::AutoPtr<Poco::AsyncChannel> logAsyncChannel(new Poco::AsyncChannel(logSplitter));

	Poco::Logger& log = Poco::Logger::get("errorLog");
	log.setChannel(logAsyncChannel);
	log.setLevel("information");

	log.error("Test Error");

	SessionManager::getInstance()->init();

	//errorLog
	
	//printf("try connect php server mysql \n");
	//conn->setConnectionsFromConfig(*test_config, CONNECTION_MYSQL_PHP_SERVER);

	Profiler timeUsed;

	// clean up and fill db
	std::string tables[] = { 
		"groups",
		"users"
	};
	for (int i = 0; i < 2; i++) {
		if (runMysql("TRUNCATE " + tables[i])) {
			return -1;
		}
		if (runMysql("ALTER TABLE " + tables[i] + " AUTO_INCREMENT = 1")) {
			return -1;
		}
	}

	std::stringstream ss;
	// password = TestP4ssword&H
	ss << "INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `username`, `password`, `pubkey`, `privkey`, `created`, `email_checked`, `passphrase_shown`, `language`, `disabled`, `group_id`) VALUES "
		<< "(1, 'd_schultz32@gmx.de', 'DDD', 'Schultz', 'Diddel', 18242007140018938940, 0x69f2fefd6fa6947a370b9f8d3147f6617cf67416517ce25cb2d63901c666933c, 0x567f3e623a1899d1f8d69190c5799433c134ce0137c0c38cc0347874586d6234a19f2a0b484e6cc1863502e580ae6c17db1131f29a35eba45a46be29c7ee592940a3bd3ad519075fdeed6e368f0eb818, '2020-02-20 16:05:44', 1, 0, 'de', 0, 1), "
		<< "(2, 'Jeet_bb@gmail.com', 'Darios', 'Bruder', 'Jeet', 10417562666175322069, 0x6afd24f46eb79a839281fe537a1888155b102d4fbe0613ea92d51845bd8036cb, 0xe7aed71cd4ae2d1aba9343ffb3822b759f972e41b63a6032b7f6c69f566217784c2e7bcdaeaa2f7dd16bf3b6f1540b22afa65fc054550a9296454c6ecdbd4131eac7f9c703318a867e666691e1808a6e, '2020-02-20 16:05:44', 1, 0, 'de', 0, 1), "
		<< "(3, 'Tiger_231@yahoo.com', 'Dieter', 'Schultz', 'Tiger', 13790258844849208764, 0x9a79a5daea92218608fa1e3a657d78961dc04c97ff996cc0ea17d6896b5368e6, 0x4993a156a120728f0fa93fc63ab01482ed85ecf433c729c8426c4bb93f0b7ce6142fda531b11f5d5e925acd1d2e55fdfef94fe07dbb78d43322f7df1234c7251aa58946c96ec6e551395f0fb5e87decf, '2020-02-20 16:05:45', 1, 0, 'de', 0, 1), "
		<< "(4, 'Nikola_Tesla@email.de', 'Nikola', 'Tesla', 'Erfinder', 1914014100253540772, 0x1c199421a66070afb28cb7c37de98865b28924bff26161bb65faaf5695050ee3, 0xe38ca460ca748954b29d79f0e943eed3ba85e7e13b18f69349666e31a8e3b06c9df105171796b37b4201895a2f3fe8ec8bf58a181700caaa5752a94a968c50e90ebb6280002a056126b2055ff75d69d1, '2020-02-20 16:05:46', 1, 0, 'de', 0, 1), "
		<< "(5, 'Elfenhausen@arcor.de', 'Thomas', 'Markuk', 'Elf', 8105871797752167168, 0x98d703f0ea1def3ef9e6265a76281d125a94c80665425bd7a844580ec1a2ce98, 0x63612a1d07d78a0c945d765a10a30d9de2be602e79e3f39268d731bc6f7fa945d7d04c638000bae089ac058263f52e7c1f2c3550b35b5727e41523f2f592781add65d12b8b8c0b3226f32174cfa1bcee, '2020-02-20 16:05:46', 1, 0, 'de', 0, 1), "
		<< "(6, 'coin-info12@gradido.net', 'coin-info12', 'Test', 'Test Username', 9005874071610817324, 0xb3ee1c82a9877f664d05364106e259621b2e203bfbb5323edb7b597051efecc2, 0xa039da7d59e2475dd1aaa635f803ec1aeffc2506e7a96a934bf8d7cf4ac2a96dc962d4e1bdf8e11c5ce7e18189edc36014b89e9e72628004ec5901be6c407a955efb5142a1ee9a2f3aed888125a44aa2, '2020-02-20 16:05:47', 1, 0, 'de', 0, 1), "
		<< "(7, 'AlexWesper@gmail.com', 'Alex', 'Wesper', 'Wespe', 7264393213873828644, 0x735a5c22ebe84ab1d6453991d50019b677b82b0663b023c30127ec906ee9b59a, 0xaec30051ad3ab2d2132a76e9dfe5a396d2dfbcc83a4eb27223b4da8803893959af9e29c6963f9e73eddc447cb3d3995527b94054e7fdecd7d5f8cb45c3954ff9bb2c9e0374f2124b3170301f990c5d7d, '2020-02-20 16:05:47', 1, 0, 'de', 0, 1); ";
	if (runMysql(ss.str())) {
		return -1;
	}
	ss.str(std::string());

	ss << "INSERT INTO `groups` (`id`, `alias`, `name`, `url`, `description`) VALUES"
		<< "(1, 'gdd1', 'Gradido1', 'gdd1.gradido.com', 'Der erste offizielle Gradido Server (zum Testen)'), "
	    << "(2, 'gdd_test', 'Gradido Test', 'gdd1.gradido.com', 'Testgroup (zum Testen)'); ";
	if (runMysql(ss.str())) {
		return -1;
	}
	ss.str(std::string());

	

	printf("init db in : %s\n", timeUsed.string().data());
	
	
	fillTests();
	for (std::list<Test*>::iterator it = gTests.begin(); it != gTests.end(); it++)
	{
		std::clog << "call init on test: " << (*it)->getName() << std::endl;
		if ((*it)->init()) printf("Fehler bei Init test: %s\n", (*it)->getName());
	}
	return 0;
}

int run()
{
	std::clog << "[Gradido_LoginServer_Test::run]" << std::endl;
	for (std::list<Test*>::iterator it = gTests.begin(); it != gTests.end(); it++)
	{
		//printf("running: %s\n", it->getName());
		printf("running test: %s\n", (*it)->getName());
		try {
			if (!(*it)->test()) printf("success\n");
		} catch(std::exception& ex) {
			std::clog << "exception in running test: " << ex.what() << std::endl;
		}
	}
	return 0;
}

void ende()
{
	for (std::list<Test*>::iterator it = gTests.begin(); it != gTests.end(); it++)
	{
		if (*it) {
			delete *it;
		}

	}
	gTests.clear();
	SessionManager::getInstance()->deinitalize();
}


int main(int argc, char** argv)
{
	try {
		if (load(argc, argv) < 0) {
			printf("early exit\n");
			return -42;
		}
	} catch(std::exception& ex) {
		printf("no catched exception while loading: %s\n", ex.what());
	}
	
  	//printf ("\nStack Limit = %ld and %ld max\n", limit.rlim_cur, limit.rlim_max);

	run();
	ende();
	::testing::InitGoogleTest(&argc, argv);

	auto result = RUN_ALL_TESTS();
	ServerConfig::unload();
	return result;
}

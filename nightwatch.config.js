var config = {
    test_settings: {
      chrome: {
          desiredCapabilities: {
            browserName: 'chrome',
            javascriptEnabled: true,
            acceptSslCerts: true,
            nativeEvents: true,
            chromeOptions : {
              "args" : ["headless", "disable-gpu"]
            }
          }
      }
    }
}

module.exports = config;
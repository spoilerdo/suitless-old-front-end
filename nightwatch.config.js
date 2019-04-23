
var config = {
    test_settings: {
      chrome: {
          desiredCapabilities: {
            browserName: 'chrome',
            javascriptEnabled: true,
            acceptSslCerts: true,
            nativeEvents: true,
            chromeOptions : {
              "args" : ["headless", "no-sandbox", "disable-gpu"]
            }
          }
      }
    }
}

module.exports = config;
var config = {
    globals_path: "globals.js",
    test_settings: {
      chrome: {
          desiredCapabilities: {
            browserName: 'chrome',
            javascriptEnabled: true,
            acceptSslCerts: true,
            nativeEvents: true,
            chromeOptions : {
              "args" : ["headless", "disable-gpu", "no-sandbox"]
            }
          }
      }
    }
}

module.exports = config;
let config = {
  "page_objects_path" : "tests/e2e/pages",

  test_settings: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        nativeEvents: true,
        chromeOptions: {
          "args": ["disable-gpu", "no-sandbox"]
        }
      }
    }
  }
}

module.exports = config;
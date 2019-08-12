let config = {
  "page_objects_path": "tests/e2e/pages",

  webdriver: {
    server_path: 'node_modules/chromedriver/lib/chromedriver/chromedriver'
  },

  test_settings: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        nativeEvents: true,
        chromeOptions: {
          "args": ["headless", "disable-gpu", "no-sandbox"]
        }
      }
    }
  }
}

module.exports = config;
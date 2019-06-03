module.exports = {
    'Landing Page title check': function(browser) {
      // Browser is the browser that is being controlled
      browser
      .url(`${browser.globals.environment}/`) // Navigate to the url
      .waitForElementVisible('body', 1000) // Wait until you can see the body element.
      .assert.urlEquals(`${browser.globals.environment}/`)
      .verify.title("ehvLINC") //verify if the title is correct
      .end() // This must be called to close the browser at the end
    },
    'Landing page click login test': function(browser){ 
      browser
      .url(`${browser.globals.environment}/`) // Navigate to the url
      .waitForElementVisible('body', 1000) // Wait until you can see the body element.
      .assert.urlEquals(`${browser.globals.environment}/`)
      .waitForElementVisible('#loginbtn', 1000)
      .click('#loginbtn')
      .pause(100)
      .assert.urlEquals(`${browser.globals.environment}/login`)
      .end() // This must be called to close the browser at the end
    },
    'Landing page click start test': function(browser) {
      browser
      .url(`${browser.globals.environment}/`)
      .waitForElementVisible('body', 1000)
      .assert.urlEquals(`${browser.globals.environment}/`)
      .waitForElementVisible('#startbtn', 1000)
      .click('#startbtn')
      .pause(100)
      .assert.urlEquals(`${browser.globals.environment}/landingregister`)
      .end()
    }
}
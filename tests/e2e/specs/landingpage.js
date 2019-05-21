module.exports = {
    'Landing Page title check': function(browser) {
      // Browser is the browser that is being controlled
      browser
      .url(`${browser.globals.environment}/`) // Navigate to the url
      .waitForElementVisible('body', 1000) // Wait until you can see the body element.
      .verify.title("ehvLINC") //verify if the title is correct
      .end() // This must be called to close the browser at the end
    },
    'Landing page click login test': function(browser){ 
      browser
      .url(`${browser.globals.environment}/`) // Navigate to the url
      .waitForElementVisible('body', 1000) // Wait until you can see the body element.
      .click('#loginbtn')
      .pause(100)
      .assert.urlContains("/login")
      .end() // This must be called to close the browser at the end
    },
    'Landing page click start test': function(browser) {
      browser
      .url(`${browser.globals.environment}/`)
      .waitForElementVisible('body', 1000)
      .click('#startbtn')
      .pause(100)
      .assert.urlContains("/landingregister")
      .end()
    }
}
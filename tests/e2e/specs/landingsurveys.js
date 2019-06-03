module.exports = {
    'Landing page survey load check': function(browser) {
        browser
        .url(`${browser.globals.environment}/surveys`)
        .waitForElementVisible('body', 1000)
        .assert.urlEquals(`${browser.globals.environment}/surveys`)
        .verify.title("ehvLINC")
        .end()
    },
    'Landing page no thanks click not logged in': function(browser) {
        browser
        .url(`${browser.globals.environment}/surveys`)
        .pause(1000)
        .waitForElementVisible('body', 1000)
        .assert.urlEquals(`${browser.globals.environment}/surveys`)
        .waitForElementPresent('#skipbtn', 10000)
        .click("#skipbtn")
        .pause(100)
        .assert.urlContains(`${browser.globals.environment}/login`)
        .end()
    },
    'Landing page survey click survey': function(browser) {
        browser
        .url(`${browser.globals.environment}/surveys`)
        .pause(1000)
        .waitForElementPresent('body', 1000)
        .waitForElementPresent('.pickcard', 50000)
        .click('.pickcard:nth-of-type(1)')
        .pause(100)
        .assert.urlContains(`${browser.globals.environment}/survey/`)
        .end()
    },

}
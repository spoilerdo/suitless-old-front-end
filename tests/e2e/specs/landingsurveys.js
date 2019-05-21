module.exports = {
    'Landing page survey load check': function(browser) {
        browser
        .url(`${browser.globals.environment}/surveys`)
        .waitForElementVisible('body', 1000)
        .verify.title("ehvLINC")
        .end()
    },
 /*   'Landing page survey click survey': function(browser) {
        browser
        .useCss()
        .url(`${browser.globals.enviroment}/surveys`)
        .waitForElementPresent('.surveycard', 2000)
        .click(".surveycard(1)")
        .pause(100)
        .assert.urlContains("/survey/")
        .end()
    }, 
    'Landing page no thanks click': function(browser) {
        browser
        .url(`${browser.globals.enviroment}/surveys`)
        .waitForElementVisible('body', 1000)
        .waitForElementPresent('div[id=skipbtn]', 10000)
        .click("#skipbtn")
        .pause(100)
        .assert.urlContains("/dashboard")
        .end()
    } */
}
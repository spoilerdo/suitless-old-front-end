module.exports = {
    'Landing login option load check': function(browser) {
        // Browser is the browser that is being controlled
        browser
            .url(`${browser.globals.environment}/landingregister`) // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .verify.title("ehvLINC") //verify if the title is correct
            .end() // This must be called to close the browser at the end
    },
    'Landing login option create account check': function(browser) {
        browser
            .url(`${browser.globals.environment}/landingregister`) // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .click("#createaccbtn")
            .pause(100)
            .assert.urlContains("/login")
            .end() // This must be called to close the browser at the end
    },
    'Landing login option continue anonymously check': function(browser) {
        browser
            .url(`${browser.globals.environment}/landingregister`) // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .click("#anonymousbtn")
            .pause(100)
            .assert.urlContains("/surveys")
            .end() // This must be called to close the browser at the end
    }
}
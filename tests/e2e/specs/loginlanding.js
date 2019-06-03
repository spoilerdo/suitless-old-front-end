module.exports = {
    'Landing login option load check': function(browser) {
        // Browser is the browser that is being controlled
        browser
            .url(`${browser.globals.environment}/landingregister`) // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .assert.urlEquals(`${browser.globals.environment}/landingregister`)
            .verify.title("ehvLINC") //verify if the title is correct
            .end() // This must be called to close the browser at the end
    },
    'Landing login option create account check': function(browser) {
        browser
            .url(`${browser.globals.environment}/landingregister`) // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .assert.urlEquals(`${browser.globals.environment}/landingregister`)
            .waitForElementVisible('#createaccbtn', 1000)
            .click("#createaccbtn")
            .pause(100)
            .assert.urlEquals(`${browser.globals.environment}/login`)
            .end() // This must be called to close the browser at the end
    },
    'Landing login option continue anonymously check': function(browser) {
        browser
            .url(`${browser.globals.environment}/landingregister`) // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .assert.urlEquals(`${browser.globals.environment}/landingregister`)
            .waitForElementVisible('#anonymousbtn', 1000)
            .click("#anonymousbtn")
            .pause(100)
            .assert.urlEquals(`${browser.globals.environment}/surveys`)
            .end() // This must be called to close the browser at the end
    }
}
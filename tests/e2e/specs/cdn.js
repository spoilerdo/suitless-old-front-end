
module.exports = {
    before: function (browser) {
        //login and load cdn page
        let loginPage = browser.page.loginPage();

        loginPage.login("martijn.devlam@hotmail.com", "password12")

        browser
            .url('http://localhost:8080/cdn')
            .waitForElementVisible('body', 10000)
    },

    'CDN Title check': function (browser) {
        browser
            .waitForElementVisible('body', 10000)
            .verify.title("ehvLINC")
    },

    'CDN Upload Bar exists': function (browser) {
        browser
            .useCss()
            .waitForElementVisible('body', 10000)
            .waitForElementVisible('#topbar', 50000)
            .assert.visible('#uploadBtn')
            .assert.visible('#nameField')
            .assert.visible('#fileField')
            .assert.containsText('b', 'Create a new serviceable')
    },

    'CDN Table exists': function (browser) {
        browser
            .waitForElementVisible('body', 10000)
            .useXpath()
            //Check table is visible
            .assert.visible('//table')
    },

    'CDN No tag warning': function (browser) {
        browser
            .useCss()
            .click('#uploadBtn')
            .pause(100)
            .useXpath()
            .assert.containsText('//div/span', 'The tag field is required.')
    },

    'CDN Short tag warning': function (browser) {
        browser
            .useCss()
            .sendKeys('#nameField', 'sh')
            .pause(100)
            .click('#uploadBtn')
            .useXpath()
            .assert.containsText('//div/span', 'The tag field must be at least 3 characters.')
            .end()
    }
}
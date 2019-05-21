
module.exports = {
    'CDN Title check': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .useCss()
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .verify.title("ehvLINC") //verify if the title is correct
            .end() // This must be called to close the browser at the end
    },

    'CDN Upload Bar exists': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .useCss()
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .assert.visible('#uploadBtn') //Upload button
            .assert.visible('#nameField') //Tag input
            .assert.visible('#fileField') //Select Image
            .assert.containsText('b', 'Create a new serviceable') //Title of bar
            .end() // This must be called to close the browser at the end
    },

    'CDN Table exists': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .useCss()
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .useXpath()
            .assert.visible('//table') //Check table
            .end() // This must be called to close the browser at the end
    },

    'CDN No tag warning': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .useCss()
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .click('#uploadBtn')
            .pause(100)
            .useXpath()
            .assert.containsText('//div/span', 'The tag field is required.')
            .end() // This must be called to close the browser at the end
    },

    'CDN Short tag warning': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .useCss()
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .sendKeys('#nameField', 'sh')
            .pause(100)
            .click('#uploadBtn')
            .useXpath()
            .assert.containsText('//div/span', 'The tag field must be at least 3 characters.')
            .end() // This must be called to close the browser at the end
    }
}
module.exports = {
    'CDN Title check': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .verify.title("ehvLINC") //verify if the title is correct
            .end() // This must be called to close the browser at the end
    },

    'CDN Upload Bar exists': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .assert.visible('button.v-btn.theme--light.info') //Upload button
            .assert.visible('div.v-input.v-text-field.theme--light') //Tag input
            .assert.visible('div.v-input.v-text-field.v-input--is-readonly.theme--light') //Select Image
            .assert.containsText('b', 'Create a new serviceable') //Title of bar
            .end() // This must be called to close the browser at the end
    },

    'CDN Table exists': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .assert.visible('table.v-datatable.v-table.theme--light') //Check table
            .end() // This must be called to close the browser at the end
    },

    'CDN Upload warning': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            //Enter a correct tag name.
            //Click the upload button.
            //check for file warning.
            .end() // This must be called to close the browser at the end
    },

    'CDN Upload success': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .url('http://localhost:8080/cdn') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            //Enter a correct tag name.
            //Enter a correct debug name.
            //Click upload button.
            //Wait for the upload
            //Check the feedback
            .end() // This must be called to close the browser at the end
    }
}
module.exports = {
    before: function (browser) {
        let loginPage = browser.page.loginPage()

        //Login as admin user
        loginPage.login("martijn.devlam@hotmail.com", "password12")

        browser
            .url('http://localhost:8080/flowchart')
            .waitForElementVisible('ellipse', 50000)
            .assert.visible('ellipse')
    },

    'Cut Toolbox Simple': function (browser) {
        browser.expect.element('img[title="Cut"]').to.be.present
        browser
            .assert.visible('img[title="Cut"]')

        // Add Question node:

        //Collect radius-x value from the start node
        browser.getCssProperty('ellipse', "rx", function (rx) {
            //Collect radius-y value from the start node
            this.getCssProperty('ellipse', "ry", function (ry) {

                var xOffset = parseInt(rx.value) * 2
                var yOffset = parseInt(ry.value) * 1

                //Move mouse to start node with specified offset.
                this.moveToElement('ellipse', xOffset, yOffset)
                this.mouseButtonDown('left')
                //Move mouse to new location, based on offset of startnode
                this.moveToElement('ellipse', 200, yOffset)
                this.mouseButtonUp('left')

                this.waitForElementVisible('table', 50000)
                //Move mouse to dropdown node menu
                this.moveToElement('table', 50, 35)
                this.mouseButtonClick('left')

                this.waitForElementVisible('rect', 50000)
            })
        })
        browser
            //  Move mouse to question node
            .moveToElement('rect', 20, 20)
            .mouseButtonClick('left')
            //  Move mouse to cut button
            .moveToElement('img[title="Cut"]', 10, 10)
            .mouseButtonClick('left')

        //Start node shouldn't be present anymore after cutting it.
        browser.expect.element('rect').not.to.be.present
    },


    'Paste Toolbox Simple': function (browser) {
        browser
            .moveToElement('img[title="Paste"]', 10, 10)
            .mouseButtonClick('left')

        //Start node should be back again
        browser.expect.element('rect').to.be.present
        browser.assert.visible('rect')
    },

    'Delete Toolbox Simple': function (browser) {
        browser.expect.element('img[title="Delete"]').to.be.present
        browser.expect.element('img[title="Paste"]').to.be.present
        browser
            .assert.visible('img[title="Delete"]')
            .assert.visible('img[title="Paste"]')

            //  Move mouse to start node
            .moveToElement('rect', 20, 20)
            .mouseButtonClick('left')
            .moveToElement('img[title="Delete"]', 10, 10)
            .mouseButtonClick('left')

        browser.expect.element('rect').not.to.be.present

        browser.end()
    },
}


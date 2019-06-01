module.exports = {
    beforeEach: function (browser) {    //  All test from this file while start with the following function
        let loginPage = browser.page.loginPage();       //  specify loginPage

        loginPage.login("admin@admin.admin", "admin1234");      // Login as admin user

        browser.url('http://localhost:8080/flowchart')      // Go to the flowchart editor
        browser.pause(1000)     // Give page time to reload
        browser.waitForElementVisible('body', 1000)     // What until page is finished
        browser.assert.urlEquals('http://localhost:8080/flowchart')     // Check current page is correct.

        browser.waitForElementVisible('ellipse', 1000)      // Wait for the start node.
        browser.expect.element('ellipse').to.be.present     // Check if the start node is present in the html
        browser.assert.visible('ellipse')                   // Check if the start node is also visible
    },

    'Cut Toolbox Simple' : function (browser) {
        browser.expect.element('img[title="Cut"]').to.be.present    //  Check if cut button is present in the html
        browser.assert.visible('img[title="Cut"]')                  //  Check if the cut button is also visible

        browser.moveToElement('ellipse', 20, 20)                    //  Move mouse to start node
        browser.mouseButtonClick('left')                            //  Click element ones
        browser.moveToElement('img[title="Cut"]', 10, 10)           //  Move mouse to cut button
        browser.mouseButtonClick('left')                            //  Click button ones

        browser.expect.element('ellipse').not.to.be.present         //  Start node shouldn't be present anymore after cutting it.
        browser.end()       // Close browser
    },
    

    'Paste Toolbox Simple' : function (browser){
        browser.expect.element('img[title="Cut"]').to.be.present    //  Check if the cut button is present in the html
        browser.expect.element('img[title="Paste"]').to.be.present  //  Check if the paste button is present in the html
        browser.assert.visible('img[title="Cut"]')                  //  Check if the cut button is also visible
        browser.assert.visible('img[title="Paste"]')                //  Check if the paste button is also visible
        

        browser.moveToElement('ellipse', 20, 20)                //  Move mouse to the start node
        browser.mouseButtonClick('left')                        //  Click the element ones
        browser.moveToElement('img[title="Cut"]', 10, 10)       //  Move mouse to the cut button
        browser.mouseButtonClick('left')                        //  Click the cut button ones

        browser.expect.element('ellipse').not.to.be.present     //  Selected start node shouldn't be present anymore

        browser.moveToElement('img[title="Paste"]', 10, 10)     //  Move mouse to the paste button
        browser.mouseButtonClick('left')                        //  Click the paste button ones

        browser.expect.element('ellipse').to.be.present         //  Start node should be back again
        browser.assert.visible('ellipse')                       //  Start node is also visible
        browser.end()
    },

    'Delete Toolbox Simple' : function(browser){
        browser.expect.element('img[title="Delete"]').to.be.present
        browser.expect.element('img[title="Paste"]').to.be.present
        browser.assert.visible('img[title="Delete"]')
        browser.assert.visible('img[title="Paste"]')

        browser.moveToElement('ellipse', 20, 20)
        browser.mouseButtonClick('left')
        browser.moveToElement('img[title="Delete"]', 10, 10)
        browser.mouseButtonClick('left')

        browser.expect.element('ellipse').not.to.be.present

        browser.moveToElement('img[title="Paste"]', 10, 10)
        browser.mouseButtonClick('left')

        browser.expect.element('ellipse').not.to.be.present

        browser.end()
    },
}


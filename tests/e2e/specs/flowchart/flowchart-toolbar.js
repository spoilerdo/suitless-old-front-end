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

    'Cut Toolbox Simple' : function (browser) {
        browser.expect.element('img[title="Cut"]').to.be.present
        browser
            .assert.visible('img[title="Cut"]')

        //  Move mouse to start node
            .moveToElement('ellipse', 20, 20)
            .mouseButtonClick('left')
        //  Move mouse to cut button
            .moveToElement('img[title="Cut"]', 10, 10)
            .mouseButtonClick('left')

        //Start node shouldn't be present anymore after cutting it.
        browser.expect.element('ellipse').not.to.be.present
    },
    

    'Paste Toolbox Simple' : function (browser){
        browser
            .moveToElement('img[title="Paste"]', 10, 10)
            .mouseButtonClick('left')

        //Start node should be back again
        browser.expect.element('ellipse').to.be.present
        browser.assert.visible('ellipse')
    },

    'Delete Toolbox Simple' : function(browser){
        browser.expect.element('img[title="Delete"]').to.be.present
        browser.expect.element('img[title="Paste"]').to.be.present
        browser
            .assert.visible('img[title="Delete"]')
            .assert.visible('img[title="Paste"]')

        //  Move mouse to start node
            .moveToElement('ellipse', 20, 20)
            .mouseButtonClick('left')
            .moveToElement('img[title="Delete"]', 10, 10)
            .mouseButtonClick('left')

        browser.expect.element('ellipse').not.to.be.present

        browser.end()
    },
}


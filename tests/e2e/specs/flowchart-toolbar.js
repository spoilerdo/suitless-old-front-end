module.exports = {
    beforeEach: function (browser) {
        let loginPage = browser.page.loginPage();

        loginPage.login("admin@admin.admin", "admin1234");

        browser.url('http://localhost:8080/flowchart')
        browser.pause(1000)
        browser.waitForElementVisible('body', 1000)
        browser.assert.urlEquals('http://localhost:8080/flowchart')
    },

    'Cut Toolbox Simple' : function (browser) {
        browser.expect.element('img[title="Cut"]').to.be.present
        browser.expect.element('ellipse').to.be.present

        browser.assert.visible('img[title="Cut"]')
        browser.assert.visible('ellipse')

        browser.pause(1000)

        browser.moveToElement('ellipse', 20, 20)
        browser.mouseButtonClick('left')
        browser.pause(1000)
        browser.moveToElement('img[title="Cut"]', 10, 10)
        browser.mouseButtonClick('left')
        browser.pause(1000)

        browser.expect.element('ellipse').not.to.be.present


        browser.end()
    },
    

    // 'copy' : function (browser){
    //      browser.expect.element('img[title="Copy"]').to.be.present
    //     browser.expect.element('ellipse').to.be.present   
    // },

    'Generate question node v1': function (browser) {

        browser.waitForElementVisible('ellipse', 1000)
        browser.assert.visible('ellipse')

        var xOffset = 65
        var yOffset = 65

        browser.getCssProperty('ellipse', "rx", function (rx) { xOffset = (parseInt(rx.value) * 2) })
        browser.getCssProperty('ellipse', "ry", function (ry) { yOffset = (parseInt(ry.value) * 1) })

        browser.perform(function () {
            browser.moveToElement('ellipse', xOffset, yOffset)
            browser.mouseButtonDown('left')
            browser.pause(1000)
            browser.moveToElement('ellipse', 300, 300)
            browser.pause(1000)
            browser.mouseButtonUp('left')
            browser.pause(1000)

            browser.moveToElement('table', 50, 35)
            browser.pause(1000)
            browser.mouseButtonDown('left')
            browser.mouseButtonUp('left')
            browser.pause(1000)

            browser.waitForElementVisible('rect', 1000)
            browser.assert.visible('rect')

            browser.end()
        })
    },

    'Generate question node v2': function (browser) {

        browser.waitForElementVisible('ellipse', 1000)
        browser.assert.visible('ellipse')

        browser.getCssProperty('ellipse', "rx", function (rx) {
            this.getCssProperty('ellipse', "ry", function (ry) {
                
                var xOffset = parseInt(rx.value)*2
                var yOffset = parseInt(ry.value)*1

                this.moveToElement('ellipse', xOffset, yOffset)
                this.mouseButtonDown('left')
                this.pause(1000)
                this.moveToElement('ellipse', 300, 300)
                this.pause(1000)
                this.mouseButtonUp('left')
                this.pause(1000)

                this.moveToElement('table', 50, 35)
                this.pause(1000)
                this.mouseButtonDown('left')
                this.mouseButtonUp('left')
                this.pause(1000)

                this.waitForElementVisible('rect', 1000)
                this.assert.visible('rect')

                this.end()
            })
        })
    }
}


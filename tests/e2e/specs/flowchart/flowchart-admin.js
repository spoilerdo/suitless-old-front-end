module.exports = {
  before: function (browser) {
    let loginPage = browser.page.loginPage()

    //admin user
    loginPage.login("martijn.devlam@hotmail.com", "password12")

    browser
      .url('http://localhost:8080/flowchart')
      .waitForElementVisible('body', 1000)

    //wait for the startnode
      .waitForElementVisible('ellipse', 1000)
      .assert.visible('ellipse')
  },

  'Import flowchart': function (browser) {
    browser
      .waitForElementVisible('#btn_import_flowchart', 10000)
      .assert.visible('#btn_import_flowchart')
      .click('#btn_import_flowchart')
      .waitForElementVisible('#btn_import_flowchart_dialog', 100000)
      .assert.visible('#btn_import_flowchart_dialog')
      .click('#btn_cancel_import_flowchart_dialog')
      .waitForElementNotVisible('#btn_import_flowchart_dialog', 10000)
      .assert.hidden('#btn_import_flowchart_dialog')
  },

  'Generate question node v2': function (browser) {
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

        this.waitForElementVisible('table', 1000)
        //Move mouse to dropdown node menu
        this.moveToElement('table', 50, 35)
        this.mouseButtonClick('left')

        this.waitForElementVisible('rect', 1000)
        this.assert.visible('rect')

        this.end()
      })
    })
  }
}
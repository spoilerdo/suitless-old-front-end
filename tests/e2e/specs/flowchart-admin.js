

module.exports = {
  beforeEach: function (browser) {                      //  All test from this file while start with the following function
    let loginPage = browser.page.loginPage()            //  specify loginPage

    loginPage.login("admin@admin.admin", "admin1234")   // Login as admin user

    browser.url('http://localhost:8080/flowchart')                  // Go to the flowchart editor
    browser.pause(2000)                                             // Give page time to reload
    browser.waitForElementVisible('body', 1000)                     // What until page is finished
    browser.assert.urlEquals('http://localhost:8080/flowchart')     // Check current page is correct.

    browser.waitForElementVisible('ellipse', 1000)      // Wait for the start node.
    browser.expect.element('ellipse').to.be.present     // Check if the start node is present in the html
    browser.assert.visible('ellipse')                   // Check if the start node is also visible
  },

  'Import flowchart': function (browser) {
    browser.waitForElementVisible('#btn_import_flowchart', 1000)          //  Wait for import button
    browser.assert.visible('#btn_import_flowchart')                       //  Check if import button is visible
    browser.click('#btn_import_flowchart')                                //  Click login button 
    browser.waitForElementVisible('#btn_import_flowchart_dialog', 1000)   //  Wait for dialog import button
    browser.assert.visible('#btn_import_flowchart_dialog')                //  Check if the dialog import button is visible

    browser.end()   //Close browser
  },

  'Generate question node v2': function (browser) {
    browser.getCssProperty('ellipse', "rx", function (rx) {   //  Collect radius-x value from the start node
      this.getCssProperty('ellipse', "ry", function (ry) {    //  Collect radius-y value from the start node

        var xOffset = parseInt(rx.value) * 2    //  Save collected radius-x value and change for needed offset
        var yOffset = parseInt(ry.value) * 1    //  Save collected radius-y value and change for needed offset

        this.moveToElement('ellipse', xOffset, yOffset)   //  Move mouse to start node with specified offset.
        this.mouseButtonDown('left')                      //  Click and hold left mouse button
        this.moveToElement('ellipse', 200, yOffset)       //  Move mouse to new location, based on offset of startnode
        this.mouseButtonUp('left')                        //  Release left mouse button
        this.pause(1000)

        this.moveToElement('table', 50, 35)   //  Move mouse to dropdown node menu
        this.mouseButtonClick('left')         //  Select item from menu (question-node)          
        this.pause(1000)

        this.waitForElementVisible('rect', 1000)  // Wait for new node to appear
        this.assert.visible('rect')               // Check if the question-node is viisble

        this.end()    //  Close browser
      })
    })
  }
}
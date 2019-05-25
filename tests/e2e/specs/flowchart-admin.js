

module.exports = {
  'Login': function (browser) {
    let loginPage = browser.page.loginPage();

    loginPage.login("admin@admin.admin", "admin1234")

    browser.url('http://localhost:8080/flowchart')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.urlEquals('http://localhost:8080/flowchart')
      .end()
  },

  'Import flowchart': function (browser) {
    let loginPage = browser.page.loginPage();

    loginPage.login("admin@admin.admin", "admin1234")

    browser.url('http://localhost:8080/flowchart')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.urlEquals('http://localhost:8080/flowchart')
      .waitForElementVisible('#btn_import_flowchart', 1000)
      .assert.visible('#btn_import_flowchart')       // Check if login button is visible
      .click('#btn_import_flowchart')        // Click login button 
      .waitForElementVisible('#btn_import_flowchart_dialog', 1000)
      .assert.visible('#btn_import_flowchart_dialog')
      .end()
  },

  'Generate question node': function (browser) {
    let loginPage = browser.page.loginPage();

    loginPage.login("admin@admin.admin", "admin1234")

    browser.url('http://localhost:8080/flowchart')
    browser.pause(1000)
    browser.waitForElementVisible('body', 1000)
    browser.assert.urlEquals('http://localhost:8080/flowchart')
    browser.waitForElementVisible('ellipse', 1000)
    browser.assert.visible('ellipse')

    browser.moveToElement('ellipse', 65, 65)
    browser.mouseButtonDown('left')
    browser.pause(1000)
    browser.moveToElement('ellipse', 200, 40)
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
  }
}
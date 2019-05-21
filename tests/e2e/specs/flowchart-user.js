module.exports = {
    'Login': function (browser) {
      let loginPage = browser.page.loginPage();
  
      loginPage.login("user@user.user", "user1234")
  
      browser.url('http://localhost:8080/flowchart')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.urlEquals('http://localhost:8080/login?redirect=%2Fflowchart')
      .end()
    }
  }
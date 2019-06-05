module.exports = {
    'Register Page title check': function(browser) {
    browser                                 // Browser is the browser that is being controlled
    .url('http://localhost:8080/register')  // Navigate to the url
    .waitForElementVisible('body', 1000)    // Wait until you can see the body element.
    .verify.title("ehvLINC")                //verify if the title is correct
    .end()                                  // This must be called to close the browser at the end
    },

    'Register with already existing account': function(browser) {
      let loginPage = browser.page.loginPage();
      loginPage.register("dontdelete@me.test", "henkiespenkie", "dont", "delete", "henkiespenkie")
      
      browser
      .waitForElementVisible('#LoginForm', 1000)
      .waitForElementVisible('#alert', 1000)
      .assert.visible('#alert')
      .end()
    },

    'Login with existing account': function(browser) {
      let loginPage = browser.page.loginPage();
      loginPage.login("dontdelete@me.test", "henkiespenkie")
      
      browser
      .waitForElementVisible('#dashboard', 1000)
      .assert.visible('#dashboard')
      .end()
    },

    'Login with non existing account': function(browser) {
      let loginPage = browser.page.loginPage();
      loginPage.login("iktyphiermaarwat123@yikes.yeet", "xXx_Wachtwoordje_Dat_Heel_Veilig_Is_xXx")
      
      browser
      .waitForElementVisible('#alert', 1000)
      .assert.visible('#alert')
    }
}
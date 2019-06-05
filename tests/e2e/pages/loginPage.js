// legacy page object as a function in MyLegacyPage.js

// browser is automatic, anything following is from factory call
module.exports = function (browser) {
  this.login = function (email, password) {
    browser
    .url('http://localhost:8080/login')                     // Navigate to this url
    .waitForElementVisible('body', 1000)                    // Wait until the body is shown
    .assert.visible('#LoginForm input[name=email]')         // Check if input field is present
    .assert.visible('#LoginForm input[name=password]')      // Check if input field is present
    .setValue('#LoginForm input[name=email]', email)        // Fill email input
    .setValue('#LoginForm input[name=password]', password)  // Fill password input
    .assert.visible('#btn_login')                           // Check if login button is visible
    .click('#btn_login')                                    // Click login button 
    .pause(1000)                                            // Wait an extra 1 second so browser can reload itself when login is succesful.
  },

  this.logout = function() {
    browser.deleteCookie()
    .end()
  }

  this.register = function(email, password, firstname, lastname, confirm_password) {
    browser
    .url('http://localhost:8080/register')                                          // Navigate to this url
    .waitForElementVisible('body', 1000)                                            // Wait until the body is shown
    .assert.visible('#btn_SwitchToRegister')
    .click('#btn_SwitchToRegister')
    .waitForElementVisible('#RegisterForm', 1000)
    .assert.visible('#RegisterForm input[name=email]')                              // Check if input field is present
    .assert.visible('#RegisterForm input[name=password]')                           // Check if input field is present
    .assert.visible('#RegisterForm input[name=firstname]')                          // Check if input field is present
    .assert.visible('#RegisterForm input[name=lastname]')                           // Check if input field is present
    .assert.visible('#RegisterForm input[name=confirm_password]')                   // Check if input field is present
    .setValue('#RegisterForm input[name=email]', email)                             // Fill email input
    .setValue('#RegisterForm input[name=password]', password)                       // Fill password input
    .setValue('#RegisterForm input[name=firstname]', firstname)                     // Fill firstname input
    .setValue('#RegisterForm input[name=lastname]', lastname)                       // Fill lastname input
    .setValue('#RegisterForm input[name=confirm_password]', confirm_password)       // Fill confirm password input
    .assert.visible('#btn_register')                                                // Check if register button is visible
    .click('#btn_register')                                                         // Click register button
  }
};
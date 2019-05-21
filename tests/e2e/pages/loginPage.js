// legacy page object as a function in MyLegacyPage.js

// browser is automatic, anything following is from factory call
module.exports = function (browser) {
  this.login = function (email, password) {
    browser
    .url('http://localhost:8080/login') //  Navigate to this url
    .waitForElementVisible('body', 1000) // Wait until the body is shown
    .assert.visible('input[name=email]')        // Check if input field is present
    .assert.visible('input[name=password]')     // Check if input field is present
    .setValue('input[name=email]', email)     // Fill email input
    .setValue('input[name=password]', password)      // Fill password input
    .assert.visible('#btn_login')       // Check if login button is visible
    .click('#btn_login')        // Click login button 
    .pause(1000)        // Wait an extra 1 second so browser can reload itself when login is succesful.
  },

  this.logout = function() {
    browser.deleteCookie()
    .end()
  }
};
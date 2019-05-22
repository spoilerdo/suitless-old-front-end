module.exports = {
    'Register Page title check': function(browser) {
      // Browser is the browser that is being controlled
    browser
    .url('http://localhost:8080/register') // Navigate to the url
    .waitForElementVisible('body', 1000) // Wait until you can see the body element.
    .verify.title("ehvLINC") //verify if the title is correct
    .end() // This must be called to close the browser at the end
    },

    'Show Register field check': function(browser) {
        browser
        .url('http://localhost:8080/register')
        .waitForElementVisible('body', 1000)
        .click('#SwitchToRegister')
        .waitForElementVisible('form[name="registerForm"]', 1000)
        .verify.visible('#RegisterForm')
        .end()
    }
}
module.exports = {
    'Landing Page title check': function(browser) {
      // Browser is the browser that is being controlled
    browser
    .url('http://localhost:8080/') // Navigate to the url
    .waitForElementVisible('body', 1000) // Wait until you can see the body element.
    .verify.title("ehvLINC") //verify if the title is correct
    .end() // This must be called to close the browser at the end
    }
}
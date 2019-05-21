module.exports = {
    'Dashboard-guest page title check': function(browser) {
      // Browser is the browser that is being controlled
    browser
    .url('http://localhost:8080/dashboard') // Navigate to the url
    .waitForElementVisible('body', 1000) // Wait until you can see the body element.
    .verify.title("ehvLINC") //verify if the title is correct
    .end() // This must be called to close the browser at the end
    },

    'Dashboard-guest redirect login url check': function(browser) {
      // Browser is the browser that is being controlled
    browser
    .url('http://localhost:8080/dashboard') // Navigate to the url
    .url(function(result) {
      this.assert.equal(result.value, 'http://localhost:8080/login?redirect=%2Fdashboard', 'Url is the same') //Check if we got redirected
    })
    .end() // This must be called to close the browser at the end
    },
}
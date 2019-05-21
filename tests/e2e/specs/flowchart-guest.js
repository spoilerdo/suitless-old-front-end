module.exports = {
  'Flowchart-guest page title check': function (browser) {
    // Browser is the browser that is being controlled
    browser
      .url('http://localhost:8080/flowchart') // Navigate to the url
      .waitForElementVisible('body', 1000) // Wait until you can see the body element.
      .verify.title("ehvLINC") //verify if the title is correct
      .end() // This must be called to close the browser at the end
  },

  'Flowchart-guest redirect login url check': function (browser) {
    // Browser is the browser that is being controlled
    browser
      .url('http://localhost:8080/flowchart') // Navigate to the url
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/login?redirect=%2Fflowchart')
      .end() // This must be called to close the browser at the end
  },
}
module.exports = {
  'Flowchart-guest redirect login url check': function (browser) {
    browser
      .url('http://localhost:8080/flowchart')
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/login?redirect=%2Fflowchart')
      .end()
  },
}
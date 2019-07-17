module.exports = {
    'Redirect to login Page v1': function(browser) {
        browser
            .url('http://localhost:8080/dashboard')
            .waitForElementVisible('body', 10000)
            .assert.urlEquals('http://localhost:8080/login?redirect=%2Fdashboard')
            .end()
    },

    'Login to admin account': function(browser){
        let loginPage = browser.page.loginPage();

        loginPage.login("martijn.devlam@hotmail.com", "password12")

        browser
            .url('http://localhost:8080/dashboard')
            .waitForElementVisible('body', 10000)
            .waitForElementVisible('#AllSurveys_Component', 1000)
            .assert.urlEquals('http://localhost:8080/dashboard')

        browser.expect.element('#AllSurveys_Component').to.be.present;

        browser.end()
    },
}
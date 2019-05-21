module.exports = {
    'Redirect to login Page v1': function(browser) {
        browser
        .url('http://localhost:8080/dashboard') // Navigate to this url
        .waitForElementVisible('body', 1000)    // Wait until the body is shown
        .assert.urlEquals('http://localhost:8080/login?redirect=%2Fdashboard') // Check if the browser has correctly redirected to the login page --> user wasn't logged in
        .end()      // Close browser
    },

    'Login to admin account': function(browser){
        let loginPage = browser.page.loginPage();

        loginPage.login("admin@admin.admin", "admin1234")

        browser
        .url('http://localhost:8080/dashboard') //  Navigate to this url
        .pause(1000)        // Wait an extra 1 second so browser can reload itself when login is succesful.
        .waitForElementVisible('body', 1000) // Wait until the body is shown
        .assert.urlEquals('http://localhost:8080/dashboard') // Check if the browser has succesfully logged in and contiued to the dashboard page.
        .waitForElementVisible('#AllSurveys_Component', 1000)

        browser.expect.element('#AllSurveys_Component').to.be.present;  // Check the following components if they are(n't) present
        browser.expect.element('#IncompleteSurveys_Component').to.be.not.present;
        browser.expect.element('#LatestReports_Component').to.be.not.present;
        browser.expect.element('#RecommendedSurveys_Component').to.be.not.present;

        browser.end()   // Close browser
    },
}
module.exports = {
    'Redirect to login Page': function(browser) {
        browser
        .url('http://localhost:8080/dashboard') // Navigate to this url
        .waitForElementVisible('body', 1000)    // Wait until the body is shown
        .assert.urlEquals('http://localhost:8080/login?redirect=%2Fdashboard') // Check if the browser has correctly redirected to the login page --> user wasn't logged in
        .end()
    },

    'Login to admin account': function(browser){
        browser
        .url('http://localhost:8080/login') //  Navigate to this url
        .waitForElementVisible('body', 1000) // Wait until the body is shown
        .setValue('input[name=email]', 'admin@admin.admin')
        .setValue('input[name=password]', 'admin1234')
        .click("//div[contains(@class,'v-btn__content') and text()= 'Login']")
        .waitForElementVisible('body', 1000)    // Wait until the body is shown
        .assert.urlEquals('http://localhost:8080/dashboard') // Check if the browser has succesfully logged in and contiued to the dashboard page.
        .end()
    }
}
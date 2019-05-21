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
        .assert.visible('input[name=email]')        // Check if input field is present
        .assert.visible('input[name=password]')     // Check if input field is present
        .setValue('input[name=email]', 'admin@admin.admin')     // Fill email input
        .setValue('input[name=password]', 'admin1234')      // Fill password input
        .assert.visible('#btn_login')       // Check if login button is visible
        .click('#btn_login')        // Click login button 
        .pause(1000)        // Wait an extra 1 second so browser can reload itself when login is succesful.
        .waitForElementVisible('body', 1000)    // Wait until the body is shown
        .assert.urlEquals('http://localhost:8080/dashboard') // Check if the browser has succesfully logged in and contiued to the dashboard page.
        .deleteCookie()
        .end()
    }
}
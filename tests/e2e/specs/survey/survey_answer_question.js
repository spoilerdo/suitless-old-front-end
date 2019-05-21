module.exports = {
    'Login': function (browser) {
        let loginPage = browser.page.loginPage();
    
        loginPage.login("admin@admin.admin", "admin1234")
    
        browser
        .url('http://localhost:8080/survey/5cb71cdb3fc9910008f9f2f4')
        .waitForElementVisible('body', 1000)
    },

    'Loading Survey check': function(browser) {
        browser
        .waitForElementVisible('#question-7', 1000)
        .click('#question-7>div')
        .pause(10000)
        browser.expect.element('#question-7').to.have.css('questionCard v-card v-sheet theme--light selectedCard')
        browser.end()
    },

    /*'Answer first question': function(browser) {
        browser
        
    }*/
}
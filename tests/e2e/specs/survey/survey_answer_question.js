let progresses = [
    'width: 9.09091%;',
    'width: 18.1818%;',
    'width: 27.2727%;',
]

let index = 0;

module.exports = {
    before: function (browser) {
        //login and load the survey
        let loginPage = browser.page.loginPage();
    
        loginPage.login("martijn.dormans@gmail.com", "12345678")
    
        browser
        .url('http://localhost:8080/survey/5ce511506401640008fe5a29')
        .waitForElementVisible('body', 1000)
    },

    afterEach: function(browser, done) {
        //check the progress bar
        browser
        .click('#next-btn')
        browser.expect.element('.v-progress-linear__bar__determinate').to.have.attribute('style').which.contains(progresses[index])
        index++;
        done();
    },

    /**TODO; make it so that you have 2 methods you call for every question */

    'Click first question': function(browser) {
        browser
        .waitForElementVisible('#question-13', 1000)
        .click('#question-13>div')
        .assert.cssClassPresent('#question-13', 'selectedCard')
    },

    'Click second question': function(browser) {
        browser
        .waitForElementVisible('#question-13', 1000)
        .click('#question-13>div')
        .assert.cssClassPresent('#question-13', 'selectedCard')
    },

    'Click third question': function(browser) {
        browser
        .waitForElementVisible('#question-13', 1000)
        .click('#question-13>div')
        .assert.cssClassPresent('#question-13', 'selectedCard')
        .end()
    },

    //TODO: after the questionaire check if you will be redirected to the result page.
    //print the PDF and check if it contains the correct answers
}
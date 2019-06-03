/*let progresses = [
    'width: 25%;',
    'width: 50%;',
    'width: 75%;',
    'width: 57.1429%;',
    'width: 71.4286%;',
    'width: 100%;',
    'finished'
]

let index = 0;

module.exports = {
    before: function (browser) {
        //login and load the survey
        let loginPage = browser.page.loginPage();
    
        loginPage.login("martijn.dormans@gmail.com", "12345678")
    
        browser
        .url('http://localhost:8080/survey/5cf39258316aef00062b6195')
        .waitForElementVisible('body', 10000)
    },

    'Click first multi choice': function(browser) {
        browser
        .waitForElementVisible('#question-5', 10000)
        .click('#question-5')
        browser.expect.element('#question-5')
            .to.have.attribute('checked')
                .which.contains('true').before(10000)

        browser
        .waitForElementVisible('#question-4', 100000)
        .click('#question-4')
        browser.expect.element('#question-4')
            .to.have.attribute('checked')
                .which.contains('true').before(10000)

        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
                .to.have.attribute('style')
                    .which.contains(progresses[index]).before(100000)
        }
    },

    'Click first question': function(browser) {
        browser
        .waitForElementVisible('#question-23', 10000)
        .click('#question-23')
        .assert.cssClassPresent('#question-23', 'selectedCard')
        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
            .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
    },

    'Click second multi choice': function(browser) {
        browser
        .waitForElementVisible('#question-5', 10000)
        .click('#question-5')
        browser.expect.element('#question-5')
            .to.have.attribute('checked')
                .which.contains('true').before(10000)

        browser
        .waitForElementVisible('#question-4', 100000)
        .click('#question-4')
        browser.expect.element('#question-4')
            .to.have.attribute('checked')
                .which.contains('true').before(10000)

        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
                .to.have.attribute('style')
                    .which.contains(progresses[index]).before(100000)
        }
    },
}*/
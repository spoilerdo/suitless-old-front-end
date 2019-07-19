let progresses = [
    'width: 14.2857%;',
    'width: 28.5714%;',
    'width: 42.8571%;',
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
    
        loginPage.login("martijn.devlam@hotmail.com", "password12")
    
        browser
            .url('http://localhost:8080/survey/5cefa3fdeb56062d208afdae')
            .waitForElementVisible('body', 10000)
            .click('#disclaimer-agree')
            .waitForElementNotVisible('#disclaimer-dialog', 10000)
            .waitForElementVisible('#survey-information', 10000)
            .click('#start-survey-btn-45783')
            .pause(1000)
    },

    'Click first question': function(browser) {
        browser
            .waitForElementVisible('#question-5', 100000000)
            .click('#question-5')
            .assert.cssClassPresent('#question-5', 'selectedCard')
        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
            .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
    },

    'Click second question': function(browser) {
        browser
            .waitForElementVisible('#question-7', 10000)
            .click('#question-7')
            .assert.cssClassPresent('#question-7', 'selectedCard')
        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
            .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
    },

    'Click third question': function(browser) {
        browser
            .waitForElementVisible('#question-9', 10000)
            .click('#question-9')
            .assert.cssClassPresent('#question-9', 'selectedCard')
        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
            .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
    },

    'Click fourth question': function(browser) {
        browser
            .waitForElementVisible('#question-11', 10000)
            .click('#question-11')
            .assert.cssClassPresent('#question-11', 'selectedCard')
        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
            .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
    },

    'Click fifth question': function(browser) {
        browser
            .waitForElementVisible('#question-13', 10000)
            .click('#question-13')
            .assert.cssClassPresent('#question-13', 'selectedCard')
        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
            .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
    },

    'Click sixth question': function(browser) {
        browser
            .waitForElementVisible('#question-15', 10000)
            .click('#question-15')
            .assert.cssClassPresent('#question-15', 'selectedCard')
        if(progresses[index] != 'finished'){
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
            .to.have.attribute('style')
                .which.contains(progresses[index]).before(1000);
            index++;
        }
    },

    'Check AnswerView': function(browser) {
        browser
            .waitForElementVisible('#advise', 10000)
        browser.elements('css selector','#advise > div', function(result){
            browser.assert.equal(result.value.length, 8)
        });
        browser.end()
    },
}
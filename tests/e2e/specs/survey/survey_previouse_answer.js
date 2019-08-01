let progresses = [
    'width: 0%',
    'width: 14.2857%;',
    'width: 100%',
    'finished'
]

let index = 1;

module.exports = {
    before: function (browser) {
        //login and load survey
        let loginPage = browser.page.loginPage();

        loginPage.login("martijn.dormans@gmail.com", "12345678")

        browser
            .url('http://localhost:8080/survey/5cefa3fdeb56062d208afdae')
            .waitForElementVisible('body', 10000)
            .click('#disclaimer-agree')
            .waitForElementNotVisible('#disclaimer-dialog', 10000)
            .waitForElementVisible('#survey-information', 10000)
            .pause(1000)
            .click('#start-survey-btn-45783')
            .pause(1000)
    },

    'Click first question': function (browser) {
        browser
            .waitForElementVisible('#question-5', 10000)
            .click('#question-5')
            .assert.cssClassPresent('#question-5', 'selectedCard')
        if (progresses[index] != 'finished') {
            browser.click('#next-btn')
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
                .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
    },

    'Click previouse question': function (browser) {
        browser
            .waitForElementVisible('#question-7', 10000)
            .click('#previouse-btn')

        index -= 2; //beceause previouse btn is pressed

        if (progresses[index] != 'finished') {
            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
                .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
        }

        browser
            .waitForElementVisible('#question-5', 10000)
            .assert.visible('#question-5')
    },

    'Click second question': function (browser) {
        browser
            .waitForElementVisible('#question-17', 10000)
            .click('#question-17')
            .assert.cssClassPresent('#question-17', 'selectedCard')
        if (progresses[index] != 'finished') {
            browser.click('#next-btn')

            //end of the questionair so progress needs to be 100%
            index += 2;

            //check the progress bar
            browser.expect.element('.v-progress-linear__bar__determinate')
                .to.have.attribute('style')
                .which.contains(progresses[index]).before(10000);
            index++;
        }
        browser.end()
    },

    /*'Check Answer length': function (browser) {
        browser
            .waitForElementVisible('#advise', 10000)
        browser.elements('css selector', '#advise > div', function (result) {
            browser.assert.equal(result.value.length, 2)
        });
        browser.end()
    }*/
}
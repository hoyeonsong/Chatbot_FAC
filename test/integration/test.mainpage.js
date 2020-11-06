casper.test.begin('Watson Assistant Intermediate Demo', 5, function suite(test) {
  var baseHost = 'http://localhost:3000';

  function testWelcomeMessageExists() {
    casper.waitForSelector('.from-watson', function () {
      test.assertExists('.message-inner', 'Welcome message received');
    });
  }

  function testEnterMessageClick() {
    casper.then(function () {
      this.sendKeys('#textInput', 'credit card');
      this.sendKeys('#textInput', casper.page.event.key.Enter);
    });
    casper.waitForSelector('.from-user', function () {
      test.assertExists('.message-inner', 'Message sent');
      test.assertTextExists('credit card', 'Message in bubble');
      casper.waitForText('I can help you find a credit card');
    });
  }

  casper.start(baseHost, function () {
    casper.test.comment('Starting Testing');
    test.assertHttpStatus(200, 'assistant-intermediate is up');
    test.assertTitle('Watson Assistant Intermediate App', 'Title is correct');

    testWelcomeMessageExists();
    testEnterMessageClick();
  });

  casper.run(function () {
    test.done();
  });
});

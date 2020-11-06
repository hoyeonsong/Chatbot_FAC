var bankFunctions = (function () {

  var validAccounts = [5624, 5893, 9225];

  this.validateAccountNumber = function(accNum) {
    return validAccounts.includes(accNum);
  };
});


module.exports = bankFunctions;
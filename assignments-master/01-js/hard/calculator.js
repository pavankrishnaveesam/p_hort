/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

const math = require("mathjs");

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(n) {
    this.result += n;
  }

  subtract(n) {
    this.result -= n;
  }

  multiply(n) {
    this.result *= n;
  }

  divide(n) {
    if (n !== 0) {
      this.result /= n;
    } else {
      throw new Error("Error");
    }
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    // Step 1: Remove extra spaces
    const cleanedExpression = expression.replace(/\s+/g, "");

    // Step 2: Validate the input expression
    if (!/^[0-9+\-*/().]*$/.test(cleanedExpression)) {
      throw new Error("Invalid input");
    }
    //mathjs does not throw an error for division by zero;
    //instead, it returns Infinity or NaN. To handle this scenario correctly
    if (cleanedExpression.includes("/0")) {
      throw new Error("Cannot divide by zero");
    }

    // Step 3: Evaluate the expression using mathjs
    try {
      this.result = math.evaluate(cleanedExpression);
      return this.result;
    } catch (e) {
      throw new Error(`Invalid expression: ${e.message}`);
    }
  }
}

module.exports = Calculator;

# Online Calculator
## Created using **HTML** **CSS** and **JavaScript**

### Description
Basic calculator wich supports the addition, subtraction, multiplication and division operations.
It also supports the 'backspace', 'clear' and 'change sign' functions.

### Highlights
* Division by zero is handled.
* Number input control.
  * If the first number is zero, no additional zeros will be displayed after the first one.
  * If the dot button is pressed without any numbers on the display. Zero is added at the start.
  * If there are no numbers after the dot, then it's removed.
  * No more one dot is allowed on each number.
  * Numbers with floating point are rounded to 2 digits after the dot.
  * The length of the output is limited to 25 characters from the end of the expression.
  * _NO **EVAL()** was used. Only Regular Expressions_

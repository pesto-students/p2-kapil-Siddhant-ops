// Stack & Queue
// Parenthesis checker
// Given an expression string x. Examine whether the pairs and the orders of“{“,”}”,”(“,”)”,”[“,”]” are correct in exp.For example, the function should return 'true' for exp= “[()]{}{()()}” and 'false' for exp = “[(])”
// Expected Time Complexity: O(|x|)
// Expected Auixilliary Space: O(|x|)
// Constraints: 1 ≤ |x| ≤ 32000
const checkParenthesis = (exp) => {
  if (
    exp.length === 0 ||
    !exp.includes("(") ||
    !exp.includes("[") ||
    !exp.includes("{")
  )
    return false;

  let stack = [];

  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "(" || exp[i] === "[" || exp[i] === "{") {
      stack.push(exp[i]);
    } else if (exp[i] === ")" || exp[i] === "]" || exp[i] === "}") {
      if (stack.length === 0) {
        return false;
      }
      let top = stack.pop();
      if (
        (exp[i] === ")" && top !== "(") ||
        (exp[i] === "]" && top !== "[") ||
        (exp[i] === "}" && top !== "{")
      ) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
console.log(checkParenthesis("[()]{}{()()}"));
console.log(checkParenthesis("[(])"));
console.log(checkParenthesis("["));
console.log(checkParenthesis(""));
console.log(checkParenthesis("iuacbiugyauitacidt"));

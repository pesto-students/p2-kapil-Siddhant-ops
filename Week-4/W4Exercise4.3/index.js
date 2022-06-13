const Fib = function (n) {
  return {
    [Symbol.iterator]: function () {
      let i = 1,
        _prev = 0,
        _next = 0;

      return {
        next: () => {
          if (i++ <= n) {
            [_prev, _next] = [_next, _prev + _next || 1];
            return { value: _prev, done: false };
          } else return { done: true };
        },
      };
    },
  };
};

console.log("The Fibonaci Series is:");
for (const num of Fib(7)) {
  console.log(num);
}

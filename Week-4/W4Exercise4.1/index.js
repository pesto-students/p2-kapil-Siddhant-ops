const promiseStates = {
  pending: "PENDING",
  fulfilled: "FULFILLED",
  rejected: "REJECTED",
};

class CustomPromise {
  constructor(executor) {
    let state = promiseStates.pending;
    let value = null;
    let handlers = [];
    let catchers = [];

    function resolve(val) {
      if (state !== promiseStates.pending) return;
      value = val;
      state = promiseStates.fulfilled;

      handlers.forEach((callback) => callback(value));
    }

    function reject(val) {
      if (state !== promiseStates.pending) return;
      value = val;
      state = promiseStates.rejected;

      catchers.forEach((callback) => callback(value));
    }

    this.then = function (successCallback) {
      if (state === promiseStates.fulfilled) {
        successCallback(value);
      } else {
        handlers.push(successCallback);
      }
      return this;
    };

    this.catch = function (failureCallback) {
      if (state === promiseStates.rejected) {
        failureCallback(value);
      } else {
        catchers.push(failureCallback);
      }
      return this;
    };

    executor(resolve, reject);
  }
}

const getNumber = () => {
  return new CustomPromise((resolve, onReject) => {
    setTimeout(() => {
      let randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber % 5 === 0) onReject(randomNumber);
      else resolve(randomNumber);
    }, 100);
  });
};

getNumber()
  .then((value) => {
    console.log(
      `Promise ${promiseStates.fulfilled} ${value} is not divisible by 5`
    );
    return;
  })
  .catch((reason) => {
    console.log(`Promise ${promiseStates.rejected} ${value} is divisible by 5`);
  });

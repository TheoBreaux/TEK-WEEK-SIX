// Create a Promise that resolves after one second.
// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(console.log("Guess this worked!"));
//   }, 1000);
// });

// // Add some then() methods to handle additional tasks.
// myPromise
//   .then((x) => x + console.log(" Again?"))
//   .then((x) => x + console.log(" Third time!"))
//   .then((x) => x + console.log(" Promises are cool."))
//   .catch((err) => {
//     console.error(err);
//   });

// new Promise((resolve, reject) => {
//   console.log("Initial");

//   resolve();
// })
//   .then(() => {
//     throw new Error("Something failed");

//     console.log("Do this");
//   })
//   .catch(() => {
//     console.error("Do that");
//   })
//   .then(() => {
//     console.log("Do this, no matter what happened before");
//   });

//   const myFirstPromise = new Promise((resolve, reject) => {
//     // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
//     // In this example, we use setTimeout(...) to simulate async code.
//     // In reality, you will probably be using something like XHR or an HTML API.
//     setTimeout(() => {
//       resolve("Theo!"); // Yay! Everything went well!
//     }, 250);
//   });
  
//   myFirstPromise.then((successMessage) => {
//     // successMessage is whatever we passed in the resolve(...) function above.
//     // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
//     console.log(`Yay! ${successMessage}`);
//   });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(0).then(() => console.log("Cat"));

Promise.resolve()
  .then(() => console.log("Dog"))
  .then(() => console.log("Cow"));

console.log("Bird");

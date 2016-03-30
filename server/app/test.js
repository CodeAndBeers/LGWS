var p1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000, "one");
});
var p2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 2000, "two");
});
var p3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 3000, "three");
});
var p4 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 4000, "four");
});
var p5 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 5000, "five");
});

Promise.all([p5, p1, p2, p3, p4]).then(function(value) {
  console.log(value);
}, function(reason) {
  console.log(reason)
});

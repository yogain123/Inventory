let arr = [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 6, 7, 7];
let res;
let length1 = 0;
let length2 = 5;
//let timer;
// setInterval(() => {
//   res = arr.slice(length1, length2);
//   console.log(res);
//   length1 = length2;
//   length2 = length1 + 5;
//   if (arr.length === 0) {
//     process.exit();
//   }
// }, 1000);

async function callme() {
  for (let i = 0; i < arr.length; i = i + 5) {
    await timer(arr.slice(i, i + 5));
  }
}

function timer(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data);
      resolve();
    }, 1000);
  });
}

callme();

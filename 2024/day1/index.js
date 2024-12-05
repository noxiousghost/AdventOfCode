const fs = require("fs");
const readline = require("readline");
const input = fs.createReadStream("./input.txt", "utf-8");

const rl = readline.createInterface({
  input: input,
});

const arrLeft = [];
const arrRight = [];

rl.on("line", (line) => {
  const [value1, value2] = line.trim().split(/\s+/);
  arrLeft.push(parseInt(value1, 10));
  arrRight.push(parseInt(value2, 10));
  return;
});

function partOne(arrLeft, arrRight) {
  arrLeft.sort((a, b) => {
    return a - b;
  });
  arrRight.sort((a, b) => {
    return a - b;
  });
  let totalCount = 0;
  for (let i = 0; i < arrLeft.length; i++) {
    totalCount += Math.abs(arrLeft[i] - arrRight[i]);
  }
  console.log("Part One: ", totalCount);
}

function partTwo(arrLeft, arrRight) {
  let totalCount = 0;
  arrLeft.forEach((item) => {
    const numOfOccurrences = arrRight.filter((x) => x === item).length;
    totalCount += item * numOfOccurrences;
  });

  console.log("Part Two: ", totalCount);
}

rl.on("close", async () => {
  await partOne(arrLeft, arrRight);
  await partTwo(arrLeft, arrRight);
});

const fs = require("fs");
const readline = require("readline");

const input = fs.createReadStream("./input.txt", "utf-8");
const rl = readline.createInterface({
  input: input,
});

const dataArray = [];

rl.on("line", (line) => {
  const row = line.trim().split(/\s+/).map(Number);
  dataArray.push(row);
  return;
});

function isSafe(row) {
  let isIncreasing = true;
  let isDecreasing = true;
  for (let i = 1; i < row.length; i++) {
    const diff = row[i] - row[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
    if (diff > 0) {
      isDecreasing = false;
    } else if (diff < 0) {
      isIncreasing = false;
    }
  }
  return isIncreasing || isDecreasing;
}

function partOne() {
  let safeCount = 0;
  dataArray.forEach((row) => {
    if (isSafe(row)) {
      safeCount++;
    }
  });
  console.log(safeCount);
}

function partTwo() {
  let safeCount = 0;
  dataArray.forEach((row) => {
    if (isSafe(row)) {
      safeCount++;
      return;
    }
    for (let i = 0; i < row.length; i++) {
      const modifiedRow = [...row.slice(0, i), ...row.slice(i + 1)];
      if (isSafe(modifiedRow)) {
        safeCount++;
        return;
      }
    }
  });
  console.log(safeCount);
}

rl.on("close", async () => {
  await partOne();
  await partTwo();
});

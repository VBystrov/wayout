const maze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const mazeRows = maze.length;
const mazeColumns = maze[0].length;

function isWay(cell) {
  return cell === "+";
}

function isExit(x, y) {
  return x === 0 || x === mazeColumns - 1 || y === 0 || y === mazeRows - 1;
}

let start;
for (let i = 0; i < maze.length; i++) {
  for (let k = 0; k < maze[i].length; k++) {
    if (maze[i][k] === "0") {
      start = { x: k, y: i };
      break;
    }
  }
}

let currentCells = [start];

let nextCells = [];
let exit;
let stepForward = 1;
do {
  currentCells.forEach(({ x, y }) => {
    [
      { x, y: y - 1 },
      { x: x + 1, y },
      { x, y: y + 1 },
      { x: x - 1, y },
    ].forEach(({ x, y }) => {
      if (isWay(maze[y][x])) {
        maze[y][x] = `${stepForward}`;
        if (isExit(x, y)) {
          exit = { x, y };
        }
        nextCells.push({ x, y });
      }
    });
  });
  currentCells = nextCells;
  nextCells = [];
  stepForward++;
} while (currentCells.length > 0 && !exit);

let { x, y } = exit;
let direction;
if (x === 0) {
  direction = "right";
  x++;
}
if (x === mazeColumns - 1) {
  direction = "left";
  x--;
}
if (y === 0) {
  direction = "top";
  y++;
}
if (y === mazeRows - 1) {
  direction = "bottom";
  y--;
}
const path = [direction];
let stepBack = maze[y][x] - 1;
while (stepBack >= 0) {
  switch (`${stepBack}`) {
    case maze[y - 1][x]:
      direction = "bottom";
      y--;
      break;
    case maze[y][x + 1]:
      x++;
      direction = "right";
      break;
    case maze[y + 1][x]:
      y++;
      direction = "top";
      break;
    case maze[y][x - 1]:
      x--;
      direction = "left";
      break;
    default:
      break;
  }
  stepBack--;
  path.unshift(direction);
}

console.log(path);
document.getElementById("path").innerHTML = path.join(", ");

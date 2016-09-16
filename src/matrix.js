export default class Matrix {
  constructor(n = 0) {
    if (n < 0) {
      return;
    }
    this.bigMatrixSize = n;
    this.smallMatrixSize = Math.floor(n / 10);
    let x = new Array(this.smallMatrixSize);
    let y = [];
    for (let i = 0; i < this.smallMatrixSize; i++) {
      y.push(x.slice());
    }
    this.array = [];
    for (let i = 0; i < 100; i++) {
      this.array.push(y.map(item => item.slice()).slice());
    }
  }

  updateCell(x = -1, y = -1, behavior = 3) {
    if (x < 0 || y < 0 || x > this.bigMatrixSize || y > this.bigMatrixSize) {
      return undefined;
    }
    if (behavior === 3) return;
    let smallX = x % this.smallMatrixSize;
    let smallY = y % this.smallMatrixSize;
    let smallZ = Math.floor(y / this.smallMatrixSize) * 10 + Math.floor(x / this.smallMatrixSize);

    if (behavior === 0) {
      this.array[smallZ][smallY][smallX] = 0;
    }
    if (behavior === 1) {
      this.array[smallZ][smallY][smallX] = 1;
    }
    if (behavior === 2) {
      this.array[smallZ][smallY][smallX] = this.array[smallZ][smallY][smallX] === undefined ?
        1 :
        1 - this.array[smallZ][smallY][smallX];
    }
    // console.log(`Update ${smallZ}:${smallY}:${smallX} to ${this.array[smallZ][smallY][smallX]}`);
  }

  getCell(x = -1, y = -1) {
    if (x < 0 || y < 0 || x > this.bigMatrixSize || y > this.bigMatrixSize) {
      return undefined;
    }
    let smallX = x % this.smallMatrixSize;
    let smallY = y % this.smallMatrixSize;
    let smallZ = Math.floor(y / this.smallMatrixSize) * 10 + Math.floor(x / this.smallMatrixSize);
    return this.array[smallZ][smallY][smallX];
  }

  print() {
    for (let z = 0; z < 100; z++) {
      for (let y = 0; y < this.smallMatrixSize; y++) {
        for (let x = 0; x < this.smallMatrixSize; x++) {
          console.log(`${z}:${y}:${x} - ${this.array[z][y][x]}`);
        }
      }
    }
  }

  getSum() {
    let sum = 0;
    for (let z = 0; z < 100; z++) {
      for (let y = 0; y < this.smallMatrixSize; y++) {
        for (let x = 0; x < this.smallMatrixSize; x++) {
          sum += this.array[z][y][x] ? 1 : 0;
        }
      }
    }
    return sum;
  }

  updateRectangle(corners, behavior = 3) {
    if (behavior === 3) return;
    let topIndex = corners[0].y < corners[1].y ? 0 : 1;
    let bottomIndex = 1 - topIndex;
    let leftIndex = corners[0].x < corners[1].x ? 0 : 1;
    let rightIndex = 1 - leftIndex;
    for (let y = corners[topIndex].y; y <= corners[bottomIndex].y; y++) {
      for (let x = corners[leftIndex].x; x <= corners[rightIndex].x; x++) {
        this.updateCell(x, y, behavior);
      }
    }
  }
}

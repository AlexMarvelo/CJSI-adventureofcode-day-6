
import Matrix from './matrix';

let fs = require('fs');
let path = require('path');
let parser = require('./parser');


fs.readFile(`${path.join(__dirname, '../data')}/data-small.txt`, 'utf8', (err, data) => {
  if (err) {
    return console.error(err);
  }
  let instructions = parser.parseData(data);
  let myMatrix = new Matrix(1000);
  instructions.forEach((instruction) => {
    myMatrix.updateRectangle(instruction.corners, instruction.behavior);
  });
  console.log(`Sum = ${myMatrix.getSum()}`);
});

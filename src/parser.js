function detectBehavior(row = '') {
  row = row.toLowerCase();
  if (row.search('turn on') === 0) return 1;
  if (row.search('turn off') === 0) return 0;
  if (row.search('toggle') === 0) return 2;
}

function detectCorners(row = '') {
  row = row.toLowerCase();
  return row.match(/[0-9]+,[0-9]+/gi).map((coords) => {
    let coordsObj = {
      x: parseInt(coords.split(',')[0], 10),
      y: parseInt(coords.split(',')[1], 10),
    };
    return coordsObj;
  });
}

module.exports = {
  parseData: (data = '') =>
    data.split('\n').map((row) => {
      if (!row.length) return {};
      let instraction = {
        behavior: detectBehavior(row),
        corners: detectCorners(row),
      };
      // console.dir(instraction);
      return instraction;
    }),
};

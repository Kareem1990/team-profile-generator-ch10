const fs = require('fs');

const writeFile = pageContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/index.html', pageContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "Object created"
      });
    });
  });
};


module.exports = { writeFile };
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');
module.exports = (function() {
  const U = {};

  U.getRemovedExtension = p => {
    return p
      .split('.')
      .slice(0, -1)
      .join('.');
  };
  U.downloadFile = async (url, path) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on('error', err => {
        reject(err);
      });
      fileStream.on('finish', function() {
        resolve();
      });
    });
  };
  U.getExtension = p => {
    return p.split('.').pop();
  };
  U.getUploadPath = () => {
    return path.join(__dirname, '../../static/uploads');
  };
  U.getFilePath = f => {
    return path.join(__dirname, '../../static/uploads/' + f);
  };

  U.clone = obj => {
    if (obj === null || typeof obj !== 'object') return obj;

    let copy = obj.constructor();

    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }

    return copy;
  };

  return U;
})();

const multer = require('multer');
const _ = require('lodash');
const { document, presentation, spreadsheet } = require('./formats.json');
module.exports = (function() {
  const M = {};

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'static/uploads');
    },
    filename: function(req, file, cb) {
      cb(
        null,
        file.originalname.split('.').pop() +
          '_' +
          Date.now() +
          '.' +
          file.originalname.split('.').pop(),
      );
    },
  });
  M.upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 50 }, //50mb
    fileFilter: function(req, file, cb) {
      if (_.find(document, { extension: file.originalname.split('.').pop() })) {
           cb(null, true);
      }else{
        console.log("not found")
        cb(null, false);
      }
    },
  });

  return M;
})();

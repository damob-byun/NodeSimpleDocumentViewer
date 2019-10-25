const express = require('express');
const path = require('path');
const multer = require('./multer');
const app = express();
const doc2pdf = require('./doc2pdf');
const fs = require('fs');

const util = require('./util');
app.use(express.static(path.join(__dirname, '../../static')));
app.use(express.static(path.join(__dirname, '../../dist')));

//30분마다 삭제
setInterval(
  () => {
    console.log('start search');
    fs.readdir(util.getUploadPath(), function(err, list) {
      list.forEach(function(element) {
        fs.stat(util.getFilePath(element), function(err, stats) {
          const hour_diff =
            Math.abs(new Date().getTime() - new Date(stats.mtime).getTime()) /
            3600000;
          if (hour_diff > 1) {
            fs.unlink(util.getFilePath(element), function(err) {
              if (err) console.log(err);
              console.log('successfully deleted ', element);
            });
          }
        });
      }, this);
    });
  },
  1000 * 60 * (process.env.TEMPFILE_DELETE_INTERVAL_MINUITE || 30), //30분마다 1시간지난파일 삭제
);
app.post('/api/upload/preview/', multer.upload.any(), async (req, res) => {
  let files = req.files;
  let file = {};
  if (Array.isArray(files)) {
    file = files[0];
  } else {
    file = files;
  }
  const ext = util.getExtension(file.filename);
  const full_path = util.getFilePath(file.filename);
  if (ext === 'hwp') {
    await doc2pdf.hwp2pdf(full_path);
  } else if (ext === 'pdf') {
    //console.log('pdf');
  } else {
    await doc2pdf.convert(full_path);
  }
  const url = '/uploads/' + util.getRemovedExtension(file.filename) + '.pdf';
  res.redirect('/?url=' + url);
});
app.post('/api/upload/preview/file', multer.upload.any(), async (req, res) => {
  let files = req.files;
  let file = {};
  if (Array.isArray(files)) {
    file = files[0];
  } else {
    file = files;
  }
  const ext = util.getExtension(file.filename);
  const full_path = util.getFilePath(file.filename);
  if (ext === 'hwp') {
    await doc2pdf.hwp2pdf(full_path);
  } else if (ext === 'pdf') {
    //console.log('pdf');
  } else {
    await doc2pdf.convert(full_path);
  }
  const url = '/uploads/' + util.getRemovedExtension(file.filename) + '.pdf';
  res.redirect(url);
});
app.get('/api/link/preview', async (req, res) => {
  let { url } = req.query;
  const ext = util.getExtension(url);
  const file_name = ext + '_' + Date.now() + '.' + ext;
  await util.downloadFile(url, 'static/uploads/' + file_name);
  const full_path = util.getFilePath(file_name);
  if (ext === 'hwp') {
    await doc2pdf.hwp2pdf(full_path);
  } else if (ext === 'pdf') {
    //console.log('pdf');
  } else {
    await doc2pdf.convert(full_path);
  }
  res.redirect(
    '/?url=/uploads/' + util.getRemovedExtension(file_name) + '.pdf',
  );
});
app.get('/api/link/preview/file', async (req, res) => {
  let { url } = req.query;
  const ext = util.getExtension(url);
  const file_name = ext + '_' + Date.now() + '.' + ext;
  await util.downloadFile(url, 'static/uploads/' + file_name);
  const full_path = util.getFilePath(file_name);
  if (ext === 'hwp') {
    await doc2pdf.hwp2pdf(full_path);
  } else if (ext === 'pdf') {
    //console.log('pdf');
  } else {
    await doc2pdf.convert(full_path);
  }
  const redirect_url =
    '/uploads/' + util.getRemovedExtension(file_name) + '.pdf';
  res.redirect(redirect_url);
});
app.listen(process.env.SERVER_PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`),
);

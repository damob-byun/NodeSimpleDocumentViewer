const childProcess = require('child_process');
var doc2pdf = (exports = module.exports = {});
const path = require('path');
doc2pdf.convert = function(file, outputFormat = 'pdf') {
  return new Promise((resolve, reject) => {
    //console.log(file);
    let bin = 'unoconv';
    childProcess.execSync(`${bin} -f ${outputFormat} ${file}`, {
      cwd: path.join(__dirname, '../../static/uploads/'),
    });
    resolve(
      file
        .split('.')
        .slice(0, -1)
        .join('.') + '.pdf',
    );
  });
};

doc2pdf.hwp = function(file) {
  return new Promise((resolve, reject) => {
    let bin = 'hwp5odt';
    let script = `${bin} ${file}`;
    childProcess.execSync(script, {
      cwd: path.join(__dirname, '../../static/uploads/'),
    });

    resolve(
      file
        .split('.')
        .slice(0, -1)
        .join('.') + '.odt',
    );
  });
};

doc2pdf.hwp2pdf = function(file) {
  return new Promise((resolve, reject) => {
    doc2pdf.hwp(file).then(result => {
      doc2pdf.convert(result).then(result => {
        resolve(result);
      });
    });
  });
};

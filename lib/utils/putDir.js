const recursive = require('recursive-readdir');
const uniq = require('lodash/uniq');

const dirRegExp = /\/(.*\/|)(.*)$/g;

const putDir = (localDir, remoteDir, sftp) =>
  new Promise((resolve, reject) => {
    recursive(localDir, ['.DS_Store'])
      .then(files => (
        files
          .map(file => file.replace(localDir, ''))
          .map(file => file.replace(dirRegExp, `$1`))
          .filter(Boolean)
      ))
      .then(uniq)
      .then(dirs => Promise.all(
        dirs.map(dir => sftp.mkdir(`${remoteDir}/${dir}`, true))
      ))
      .then(() => recursive(localDir, ['.DS_Store']))
      .then(files => (
        files
          .map(file => file.replace(localDir, ''))
          .map(file => file.replace(dirRegExp, `$1`) + file.replace(dirRegExp, `$2`))
      ))
      .then(files => Promise.all(
        files.map(file => sftp.put(`${localDir}/${file}`, `${remoteDir}/${file}`))
      ))
      .then(resolve)
      .catch(err => reject(Error(err)));
  });

module.exports = putDir;
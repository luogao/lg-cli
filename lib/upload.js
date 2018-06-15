const Client = require('ssh2-sftp-client');
const fs = require('fs')
const path = require('path')
const { configFileName } = require('./config')

let rootPath = process.cwd()
let Config
let localFilePath
try {
  fs.accessSync(path.resolve(process.cwd(), path.join(configFileName)))
  Config = require('../lgconfig')
  localFilePath = path.resolve(process.cwd(), path.join('test'), path.join('upload_test'))
} catch (err) {
  console.error('no access!')
  process.exit(1)
}

function upload() {
  const { host, port, username, password, remote } = Config
  const sftp = new Client();
  sftp.connect({
    host,
    port,
    username,
    password
  }).then(() => {

    // return sftp.list('/home/www/root/');
    // return sftp.mkdir(path.resolve(remote, path.join('test')), false)
    // return sftp.put(localFilePath, '/home/www/root/')
    return sftp.put('/Users/nail/Documents/Personal-GitHub/lg-cli/test/upload_test/', '/home/www/root/test/')
  }).then((data) => {

    console.log(data)
    sftp.end()
    // data.forEach(file => {
    //   console.log(file.name + '\n')
    // })
    // return sftp.list(remote);
    // data.forEach(file => {
    //   console.log(file.name + '\n')
    // })
    process.exit(0)
  }).catch((err) => {
    console.log(err, 'catch error')
    sftp.end()
    process.exit(1)
  });
}

module.exports = () => {
  upload()
}
const Client = require('ssh2-sftp-client');
const fs = require('fs')
const path = require('path')
const { configFileName, defaultLocalDir } = require('./config')

let rootPath = process.cwd()
let Config
let localFilePath
try {
  fs.accessSync(path.resolve(process.cwd(), path.join(configFileName)))
  Config = require('../lgconfig')
  localFilePath = path.resolve(path.join(process.cwd(), '.', defaultLocalDir))
  console.log(localFilePath)
} catch (err) {
  console.error('no access!')
  process.exit(1)
}

function getFileList() {
  return new Promise((resolve, reject) => {
    fs.readdir(localFilePath, (err, files) => {
      if (err) { reject(err) }
      else {
        console.log(files)
        resolve(files)
      }
    })
  })
}

async function upload() {
  const { host, port, username, password, remote } = Config
  const fileList = await getFileList()
  const sftp = new Client();
  sftp.connect({
    host,
    port,
    username,
    password
  }).then(() => {
    return Promise.all(fileList.map(el => {
      return sftp.put(path.resolve(path.join(localFilePath, el)), remote + el)
    }))
  }).then((data) => {
    console.log('Upload Succed!')
    sftp.end()
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
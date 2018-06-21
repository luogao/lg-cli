const spawn = require('cross-spawn');
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

function upload() {
  const { host, port, username, password, remote } = Config
  const child = spawn('npm', ['install'], {
    stdio: 'inherit'
  })
  child.on('close', code => {
    console.log(code)
  })
}

module.exports = () => {
  upload()
}
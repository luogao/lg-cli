const spawn = require('cross-spawn');
const chalk = require('chalk');
const fs = require('fs')
const path = require('path')
const { configFileName, defaultLocalDir } = require('./config')

const userConfigFile = path.resolve(process.cwd(), path.join(configFileName)) // get customize config file path

let Config
let localDir
try {
  fs.accessSync(userConfigFile)
  Config = require(userConfigFile)
  const { local } = Config
  localDir = local || defaultLocalDir
  console.log(localDir)
} catch (err) {
  console.error(chalk.red('Please Set Your Config File !!!'))
  process.exit(1)
}

function upload() {
  const { host, port, username, remote } = Config
  const params = [
    '-azv',
    process.platform === 'win32' ? path.basename(localDir) + '/' : localDir,
    username + '@' + host + ':' + remote
  ];

  if (port && port > 0 && port < 65536) {
    params.splice(params.length - 2, 0, '-e');
    params.splice(params.length - 2, 0, 'ssh -p ' + port);
  }

  const child = spawn('rsync', params, {
    stdio: 'inherit'
  })

  child.on('close', code => {
    if (code !== 0) {
      console.error(chalk.red('Upload Failed! Please check your config file.'))
      process.exit(1)
    }
    console.log()
    console.log(chalk.yellow('Upload Succeed!'))
  })
}

module.exports = () => {
  upload()
}

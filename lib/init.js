const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const inquirer = require('inquirer')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const rm = require('rimraf').sync
const getTempName = require('./utils/getTempName')
const download = require('./utils/download')
const generator = require('./utils/generator')

let templateName = getTempName(program.args[0])
let templateUrl = `https://github.com:lg-templates/${templateName}#master`
let next = undefined
let projectName = program.args[1]

function init() {
  if (projectName.indexOf('test') !== -1) {
    rm(projectName)
  }

  const list = glob.sync('*')
  let rootName = path.basename(process.cwd())

  if (list.length) {  // 如果当前目录不为空
    if (list.filter(name => {
      const fileName = path.resolve(process.cwd(), path.join('.', name))
      const isDir = fs.statSync(fileName).isDirectory()
      return name.indexOf(projectName) !== -1 && isDir
    }).length !== 0) {
      console.log(`项目${projectName}已经存在`)
      return
    }
    next = Promise.resolve(projectName)
  } else if (rootName === projectName) {
    next = inquirer.prompt([
      {
        name: 'buildInCurrent',
        message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
        type: 'confirm',
        default: true
      }
    ]).then(answer => {
      return Promise.resolve(answer.buildInCurrent ? '.' : projectName)
    })
  } else {
    next = Promise.resolve(projectName)
  }

  next && go()

}


function go() {
  next.then(projectRoot => {
    if (projectRoot !== '.') {
      fs.mkdirSync(projectRoot)
    }
    return download(templateUrl, projectRoot).then(target => {
      return {
        name: projectRoot,
        root: projectRoot,
        downloadTemp: target
      }
    })
  }).then(context => {
    return inquirer.prompt([
      {
        name: 'projectName',
        message: '项目的名称',
        default: projectName
      }, {
        name: 'projectVersion',
        message: '项目的版本号',
        default: '1.0.0'
      }, {
        name: 'projectDescription',
        message: '项目的简介',
        default: `A normal project`
      }
    ]).then(answers => {
      return {
        ...context,
        metadata: {
          ...answers
        }
      }
    })
  }).then(context => {
    generator(context.metadata, context.downloadTemp + '/template', context.name).then(() => {
      console.log(logSymbols.success, chalk.magenta('创建成功:)'))
      console.log()
      console.log(chalk.magenta('  cd ' + context.root + '\n  open index.html'))
      console.log()
    })
  }).catch(err => {
    console.log(logSymbols.error, chalk.red(`创建失败：${err}`))
  })
}



module.exports = (name) => {
  init(name)
}

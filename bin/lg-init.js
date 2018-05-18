#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const inquirer = require('inquirer')
const latestVersion = require('latest-version')

const download = require('../lib/download')

program.usage('<project-name>').parse(process.argv)

// 根据输入，获取项目名称
let projectName = program.args[0]

if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help()
  return
}

let next = undefined
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

function go() {
  next.then(projectRoot => {
    if (projectRoot !== '.') {
      fs.mkdirSync(projectRoot)
    }
    return download(projectRoot).then(target => {
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
        default: context.name
      }, {
        name: 'projectVersion',
        message: '项目的版本号',
        default: '1.0.0'
      }, {
        name: 'projectDescription',
        message: '项目的简介',
        default: `A project named ${context.name}`
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
    console.log(context)
  }).catch(err => {
    console.error(err)
  })
}

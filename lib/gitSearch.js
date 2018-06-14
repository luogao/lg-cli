const request = require('request')
const chalk = require('chalk')
const ora = require('ora')
const { successLabel, failLabel, gapLine, emptyLabel } = require('./utils/customLogLabel')

const searchRequest = (url, options, callback) => {
  const spinner = ora(chalk.yellow(`Request ${url}`)).start()
  spinner.color = 'yellow'
  request({
    method: 'GET',
    headers: {
      'User-Agent': 'luogao'
    },
    url
  }, (err, res, body) => {
    if (options.full) {
      console.log(successLabel())
      console.log(body)
      process.exit(0)
    }
    if (err) {
      console.log(failLabel())
      process.exit(1)
    } else if (res.statusCode === 200) {
      const parseBody = JSON.parse(body)
      spinner.succeed('Request succeed!')
      console.log(successLabel())
      setTimeout(() => {
        typeof callback === 'function' && callback(parseBody)
        process.exit(0)
      }, 1000)
    }
  })
}

const handleRequest = (res) => {
  if (res.items.length > 0) {
    res.items.forEach(item => {
      console.log(chalk.cyan.bold.underline('Name: ' + item.name))
      console.log(chalk.magenta.bold('Owner: ' + item.owner.login))
      console.log(chalk.yellow.bold('GitHub Page: ' + item.url))
      console.log(chalk.default.bold('Home Page: ' + item.homepage))
      console.log(chalk.grey('Desc: ' + item.description + '\n'))
      console.log(chalk.grey('Clone url: ' + item.clone_url + '\n'))
      console.log(gapLine())
    })
  } else {
    console.log(emptyLabel())
  }
}


const gitSearch = function(keywords, options){
  let url = `https://api.github.com/search/repositories?sort=stars&order=desc&q=${keywords}`
  if (options.owner) {
    url = `${url}+user:${options.owner}`
  }
  if (options.language) {
    url = `${url}+language:${options.language}`
  }
  searchRequest(url, options, handleRequest)
}

module.exports = (...args) => {
  gitSearch(...args)
}
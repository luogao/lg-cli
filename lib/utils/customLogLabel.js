const chalk = require('chalk')
const ora = require('ora')

exports.successLabel = () => {
  const label = chalk.grey.bold(`
  =====================================================================
|                                                                       |
|                             HERE IS RESULT                            |
|                                                                       |
  =====================================================================`)
  return label
}

exports.failLabel = (message) => {
  const label = chalk.red.bold(`
  =====================================================================
|                                                                       |
|                             BAD REQUEST                               |
|                                                                       |
  =====================================================================
${message}`)
  return label
}

exports.gapLine = () => {
  const label = chalk.grey.bold('=====================================================================\n\n')
  return label
}

exports.emptyLabel = () => {
  const label = chalk.yellow.bold(`
  =====================================================================
|                                                                       |
|                             EMPTY RESULT                              |
|                                                                       |
  =====================================================================`)
  return label
}
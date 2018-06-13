#!/usr/bin/env node
const program = require('commander')
program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('init <app-name>')
  .description('create a new project powered by lg-cli')
  .action((name, cmd) => {
    console.log(name.cmd)
    // require('../lib/init')(name)
  })

program
  .command('test <app-name>')
  .description('this is a test')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .action((name, cmd) => {
    require('../lib/test')(name, cmd)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
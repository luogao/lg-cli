#!/usr/bin/env node
const program = require('commander')
program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('init <template> <app-name>')
  .description('create a new project powered by lg-cli')
  .action(() => {
    require('../lib/init')()
  })

program
  .command('template')
  .description('show all available template')
  .action(() => {
    require('../lib/templateList')()
  })

program
  .command('test <app-name>')
  .description('this is a test')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .action((name, cmd) => {
    require('../lib/test')(name, cmd)
  })

program
  .command('gitsearch <keywords>')
  .option('-o, --owner [name]', 'Filter by the repositories owner')
  .option('-l, --language [language]', 'Filter by the repositories language')
  .option('-f, --full', 'Full output without any styling')
  .action((keywords, cmd) => {
    require('../lib/gitSearch')(keywords, cmd)
  })

program
  .command('upload')
  .action(() => {
    require('../lib/upload')()
  })


program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
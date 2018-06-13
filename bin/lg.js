const program = require('commander')
program
	.version(require('../package').version)
	.usage('<command> [options]')

program
	.command('init <app-name>')
	.description('create a new project powered by lg-cli')
	.action((name, cmd) => {
		console.log(name. cmd)
		// require('../lib/init')(name)
	})
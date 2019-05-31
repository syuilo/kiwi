import * as program from 'commander';
const pkg = require('../package.json');

program
	.version(pkg.version)
	.option('--disable-clustering', 'Disable clustering')
	.option('--quiet', 'Suppress all logs')
	.option('--verbose', 'Enable all logs')
	.option('--with-log-time', 'Include timestamp for each logs')
	.option('--color', 'This option is a dummy for some external program\'s (e.g. forever) issue.')
	.parse(process.argv);

if (process.env.NODE_ENV === 'test') program.disableClustering = true;
if (process.env.NODE_ENV === 'test') program.quiet = true;

export { program };

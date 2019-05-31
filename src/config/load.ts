/**
 * Config loader
 */

import * as fs from 'fs';
import { URL } from 'url';
import * as yaml from 'js-yaml';
import { Source, Mixin } from './types';

/**
 * Path of configuration directory
 */
const dir = `${__dirname}/../../.config`;

/**
 * Path of configuration file
 */
const path = process.env.NODE_ENV == 'test'
	? `${dir}/test.yml`
	: `${dir}/default.yml`;

export default function load() {
	const config = yaml.safeLoad(fs.readFileSync(path, 'utf-8')) as Source;

	const mixin = {} as Mixin;

	const url = tryCreateUrl(config.url);

	config.url = url.origin;

	config.port = config.port || parseInt(process.env.PORT || '', 10);

	mixin.host = url.host;
	mixin.hostname = url.hostname;
	mixin.scheme = url.protocol.replace(/:$/, '');

	return Object.assign(config, mixin);
}

function tryCreateUrl(url: string) {
	try {
		return new URL(url);
	} catch (e) {
		throw `url="${url}" is not a valid URL.`;
	}
}

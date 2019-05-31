import * as cluster from 'cluster';
import { initDb } from '../db';

/**
 * Init worker process
 */
export async function workerMain() {
	await initDb();

	// start server
	await require('../server').default();

	if (cluster.isWorker) {
		// Send a 'ready' message to parent process
		process.send!('ready');
	}
}

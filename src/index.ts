import * as core from '@actions/core';
import * as github from '@actions/github';

import path from 'node:path';
import semver from 'semver';
import { exec } from 'node:child_process';

class Wrangler {
	private workingDirectory: string;

	constructor() {
		this.workingDirectory = this.setupWorkingDirectory(core.getInput('workingDirectory', { trimWhitespace: true }));
		// this.installWrangler(core.getInput('wranglerVersion', { trimWhitespace: true }));
	}

	private execute_commands() {}

	private secret_not_found() {}

	private setupWorkingDirectory(workingDirectory: string = ''): string {
		let normalizedPath: string = '';
		try {
			normalizedPath = path.normalize(workingDirectory);
		} catch (error) {
			console.error(workingDirectory, 'not a valid path', error);
			console.warn('Ignoring `workingDirectory` and using current directory');
			normalizedPath = path.normalize('');
		}
		return normalizedPath;
	}

	private installWrangler(version?: string) {
		let versionToUse = '';

		if (version) {
			if (semver.valid(version)) {
				versionToUse = `@${version}`;
			} else {
				console.error(`Invalid version: ${version}`, 'using currently installed or latest version');
			}
		}

		exec(`npm install --save-dev wrangler${versionToUse}`);
	}
}

new Wrangler();

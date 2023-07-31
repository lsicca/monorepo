/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('../../jest.config.base.js');

module.exports = {
	...baseConfig,
	displayName: 'ui',
	setupFilesAfterEnv: ['./jest.setup.ts'],
};

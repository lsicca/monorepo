/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('../../jest.config.base.js');

module.exports = {
	...baseConfig,
	testEnvironment: 'node',
	displayName: 'backend',
	moduleNameMapper: {
		'^@infra/(.*)$': '<rootDir>/src/infrastructure/$1',
		'^@app/(.*)$': '<rootDir>/src/application/$1',
		'^@domains/(.*)$': '<rootDir>/src/domains/$1',
	},
};

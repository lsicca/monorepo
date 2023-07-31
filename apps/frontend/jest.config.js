import baseConfig from '../../jest.config.base.js';

export default {
	...baseConfig,
	roots: ['<rootDir>/src'],
	displayName: 'frontend',
	setupFilesAfterEnv: ['./jest.setup.ts'],
	moduleNameMapper: {
		'^@infra/(.*)$': '<rootDir>/src/infrastructure/$1',
		'^@app/(.*)$': '<rootDir>/src/application/$1',
		'^@domains/(.*)$': '<rootDir>/src/domains/$1',
		'^@lux/ui$': '<rootDir>/../../packages/ui/src',
	},
};

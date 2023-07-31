import request from 'supertest';
import { initApp } from '@app/app';

let server;

describe('GET /', () => {
	beforeAll(async () => {
		server = await initApp();
	});

	afterAll(async () => {
		server.close();
	});

	it('should respond with the user', async () => {
		const response = await request(server).get('/health-check');

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: 'Api is working' });
	});
});

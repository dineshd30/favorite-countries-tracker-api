import request from 'supertest';
import { app, closeServer } from '../../src/server';

describe('Server', () => {
  afterAll((done) => {
    closeServer(done);
  });

  it('should return test environment', async () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(app).toBeDefined();
  });

  it('should return a 200 status', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.status).toBe(200);
  });

  it('should return a JSON response', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.body).toEqual({ message: 'Server is running' });
  });
});
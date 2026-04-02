const request = require('supertest');
const { app } = require('../../server/index');

describe('Health API', () => {
  test('GET /api/health returns status ok', async () => {
    const response = await request(app).get('/api/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });
});

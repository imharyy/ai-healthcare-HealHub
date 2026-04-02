const request = require('supertest');
const { app } = require('../../server/index');

describe('Auth Integration Skeleton', () => {
  test('GET /api/auth/me without token returns 401', async () => {
    const response = await request(app).get('/api/auth/me');

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test.todo('TC-AUTH-001 Register patient success');
  test.todo('TC-AUTH-002 Register duplicate email fails');
  test.todo('TC-AUTH-003 Login success');
  test.todo('TC-AUTH-004 Login invalid password fails');
  test.todo('TC-AUTH-006 Setup and verify 2FA flow');
  test.todo('TC-AUTH-008 Refresh token renewal');
  test.todo('TC-PROF-002 Profile photo valid upload');
});

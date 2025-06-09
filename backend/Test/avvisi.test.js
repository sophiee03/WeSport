//jest.setTimeout(20000); 
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../application');


let token;

beforeAll(async () => {
  // Login diretto con credenziali esistenti nel DB di test
  const response = await request(app)
    .post('/api/auth/auth')
    .send({ nomeutente: 'tuoNomeUtenteTest', password: 'tuaPasswordTest' });

  token = response.body.token;
});

describe('GET /api/avvisi', () => {
  it('dovrebbe restituire la lista degli avvisi', async () => {
    const res = await request(app)
      .get('/api/avvisi')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const avviso = res.body[0];
      expect(avviso).toHaveProperty('id');
      expect(avviso).toHaveProperty('titolo');
      expect(avviso).toHaveProperty('descrizione');
      expect(avviso).toHaveProperty('data');
    }
  });

  it('dovrebbe restituire 403 senza token', async () => {
    const res = await request(app).get('/api/avvisi');
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message');
  });
});

describe('POST /api/avvisi', () => {
  it('dovrebbe creare un nuovo avviso', async () => {
    const res = await request(app)
      .post('/api/avvisi')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titolo: 'Avviso test importante',
        descrizione: 'Attenzione, questo è un test di avviso',
        data: '2025-06-10'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message');
  });

  it('dovrebbe restituire 400 se dati mancanti', async () => {
    const res = await request(app)
      .post('/api/avvisi')
      .set('Authorization', `Bearer ${token}`)
      .send({
        descrizione: 'Manca il titolo'
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('dovrebbe restituire 403 senza token', async () => {
    const res = await request(app)
      .post('/api/avvisi')
      .send({
        titolo: 'Avviso non autorizzato',
        descrizione: 'Tentativo senza token',
        data: '2025-06-10'
      });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message');
  });
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

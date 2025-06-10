const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../application'); 
let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({nomeutente: 'tuoNomeUtenteTest', password: 'tuaPasswordTest' });
  token = response.body.token;
});

describe('GET /api/utenteregistrato', () => {
  it('dovrebbe restituire il profilo utente con successo', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nomeutente', 'lucaverdi03');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('tipo');
    expect(res.body).toHaveProperty('punti');
  });

  it('dovrebbe restituire errore 401 se token mancante', async () => {
    const res = await request(app).get('/api/utenteregistrato');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'utente non autorizzato');
  });

  
});


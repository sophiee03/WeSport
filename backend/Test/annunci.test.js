const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../application'); // la tua app Express
const { verifyToken } = require('../auth/auth');

beforeAll(async () => {
  // fai login per ottenere il token
  const res = await request(app)
    .post('/v1/auth/login')
    .send({ nomeutente: 'tuoNomeUtenteTest', password: 'tuaPasswordTest' });
  
  token = res.body.token;
});

describe('API /api/annunci', () => {

  test('GET /api/annunci - autorizzato', async () => {
    const res = await request(app)
      .get('/api/annunci')
      .set('Authorization', `Bearer ${verifyToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/annunci - non autorizzato', async () => {
    const res = await request(app)
      .get('/api/annunci')
      .set('Authorization', `Bearer ${verifyToken}`);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('utente non autorizzato');
  });

  test('POST /api/annunci - creazione annuncio', async () => {
    const annuncio = {
      titolo: 'Partita di calcetto',
      descrizione: 'Cerchiamo giocatori per domenica',
      data: '2025-06-10T10:00:00Z',
      luogo: 'Campo sportivo Trento'
    };

    const res = await request(app)
      .post('/api/annunci')
      .set('Authorization', `Bearer ${verifyToken}`)
      .send(annuncio);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.message).toBe('Annuncio creato con successo');
  });

  test('GET /api/annunci/:id/chat - accesso chat', async () => {
    const res = await request(app)
      .get('/api/annunci/123/chat')
      .set('Authorization', `Bearer ${verifyToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
  await mongoose.connection.close();
  });

});
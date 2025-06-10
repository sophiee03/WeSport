const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../application');


let token;
let createdAnnuncioId;

beforeAll(async () => {
  // login per ottenere il token
  const res = await request(app)
    .post('/v1/auth/auth')
    .send({ nomeutente: 'tuoNomeUtenteTest', password: 'tuaPasswordTest' });
  
  token = res.body.token;
});

describe('API /api/annunci', () => {

  test('GET /api/annunci - autorizzato', async () => {
    const res = await request(app)
      .get('/api/annunci')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/annunci - non autorizzato', async () => {
    const res = await request(app)
      .get('/api/annunci');
    
    // dipende da come il middleware gestisce errori, ma spesso è 401
    expect([401, 403]).toContain(res.statusCode);
    expect(res.body.message || res.body.errore).toBeDefined();
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
      .set('Authorization', `Bearer ${token}`)
      .send(annuncio);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.titolo).toBe(annuncio.titolo);

    createdAnnuncioId = res.body._id; // Salva per il test della chat
  });

  test('GET /api/annunci/:id/chat - accesso chat', async () => {
    const res = await request(app)
      .get(`/api/annunci/${createdAnnuncioId}/chat`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});


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

describe('GET /api/segnalazioni', () => {
  it('dovrebbe restituire la lista di segnalazioni', async () => {
    const res = await request(app)
      .get('/api/segnalazioni')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('titolo');
      expect(res.body[0]).toHaveProperty('descrizione');
    }
  });

  it('dovrebbe restituire 401 senza token', async () => {
    const res = await request(app).get('/api/segnalazioni');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'utente non autorizzato');
  });
});

describe('POST /api/segnalazioni', () => {
  it('dovrebbe creare una nuova segnalazione', async () => {
    const res = await request(app)
      .post('/api/segnalazioni')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titolo: 'Panchina rotta nel parco',
        descrizione: 'La panchina vicino all’entrata è rotta.',
        fotoUrl: 'https://example.com/foto.jpg',
        posizione: 'Parco centrale, Trento'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message', 'Segnalazione inviata con successo');
  });

  it('dovrebbe restituire 401 se token mancante', async () => {
    const res = await request(app)
      .post('/api/segnalazioni')
      .send({
        titolo: 'Albero caduto',
        descrizione: 'Un albero è caduto lungo il sentiero.'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'utente non autorizzato');
  });

  it('dovrebbe restituire 400 se dati mancanti', async () => {
    const res = await request(app)
      .post('/api/segnalazioni')
      .set('Authorization', `Bearer ${token}`)
      .send({
        descrizione: 'Manca il titolo'
      });

    // Supponendo che l'API gestisca i 400 in modo corretto
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

});



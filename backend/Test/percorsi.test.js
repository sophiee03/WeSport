const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../application');


let token;
let testAreaId;

beforeAll(async () => {
  // Login per ottenere token
  const res = await request(app)
    .post('/api/auth/auth')
    .send({ nomeutente: 'tuoNomeUtenteTest', password: 'tuaPasswordTest' });
  token = res.body.token;
});


describe('GET /api/sport/:sport/areesportive', () => {
  it('dovrebbe restituire la lista delle aree sportive', async () => {
    const res = await request(app)
      .get('/api/sport/calcio/areesportive')
      .set('Authorization', `Bearer ${token}`); 

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const percorsi = res.body[0];
      expect(percorsi).toHaveProperty('idPercorso');
      expect(percorsi).toHaveProperty('idCreatore');
      expect(percorsi).toHaveProperty('categoria');
    }
  });

  it('dovrebbe filtrare per zona se query presente', async () => {
    const res = await request(app)
      .get('/api/sport/calcio/areesportive?zona=centro')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });
});

describe('GET /api/sport/:sport/areesportive/:id', () => {
  it('dovrebbe restituire i dettagli di una singola area sportiva', async () => {
    const res = await request(app)
      .get(`/api/sport/calcio/areesportive/${testAreaId}`)
      //.set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('idPercorso');
  });

  it('dovrebbe restituire 400 se dati mancanti', async () => {
      const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/sport/calcio/areesportive/${fakeId}`)
      //.set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('errore');
    });
});

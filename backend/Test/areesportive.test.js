const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../application');
const AreaSportiva = require('../models/areasportiva');

let token;
let areaId;

beforeAll(async () => {
  // Login per ottenere il token
  const response = await request(app)
    .post('/api/auth/auth')
    .send({ nomeutente: 'tuoNomeUtenteTest', password: 'tuaPasswordTest' });

  token = response.body.token;

  const area = new AreaSportiva({
    nome: 'AreaTest',
    zona: 'Trento Centro', 
    sport: 'calcio',
    selfDescription: 'Campo di prova',
    categoria: savedSport._id, 
    privata: false,
  });

  const savedArea = await area.save();
  areaId = savedArea._id; 
});


describe('GET /api/sport/:sport/areesportive', () => {
  it('dovrebbe restituire la lista delle aree sportive', async () => {
    const res = await request(app)
      .get('/api/sport/calcio/areesportive')
      .set('Authorization', `Bearer ${token}`); // se la rotta la richiede

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const area = res.body[0];
      expect(area).toHaveProperty('_id');
      expect(area).toHaveProperty('nome');
      expect(area).toHaveProperty('zona');
      expect(area).toHaveProperty('privata');
    
    }
  });

  it('dovrebbe filtrare per zona se query presente', async () => {
    const res = await request(app)
      .get('/api/sport/calcio/areesportive?zona=Trento Nord') 
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach(area => {
      expect(area.zona).toBe('Trento Nord');
    });
  });
});

describe('GET /api/sport/:sport/areesportive/:id', () => {
  it('dovrebbe restituire i dettagli di una singola area sportiva', async () => {
    const testId = areaId.toString(); 

    const res = await request(app)
      .get(`/api/sport/calcio/areesportive/${testId}`)
      .set('Authorization', `Bearer ${token}`);

    if (res.statusCode === 404) {
      expect(res.body).toHaveProperty('errore');
    } else {
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('nome');
      expect(res.body).toHaveProperty('zona');
      expect(res.body).toHaveProperty('privata');
    }
  });

  it('dovrebbe restituire 404 per area non trovata', async () => {
    const fakeId = '64b9e8d8f1eab12345678900'; 

    const res = await request(app)
      .get(`/api/sport/calcio/areesportive/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('errore');
  });
});

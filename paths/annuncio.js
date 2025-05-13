const express = require('express');
const router = express.Router();
const annuncio = require('../models/annuncio');

/** COMMENTI SWAGGER
 * @openapi
 * /annuncio
 *     get:
 *  
 */

router.get('/', async (req, res) => {
  try {
    const annuncio = await annuncio.find();
    res.json(annuncio); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newannuncio = new annuncio(req.body); 
    const savedannuncio = await newannuncio.save(); 
    res.status(201).json(savedannuncio); 
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

module.exports = router;
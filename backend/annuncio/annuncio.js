const express = require('express');
const router = express.Router();

const Annuncio = require("../models/annuncio");

const {isAuthenticated} = require("../auth/verifytoken")

// Endpoint per recuperare tutti gli annunci
router.get('/annuncio', isAuthenticcated, async (req, res) => {
  try {
    const annuncio = await annuncio.find( visibilita = true);
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
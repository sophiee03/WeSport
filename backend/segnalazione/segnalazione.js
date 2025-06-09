const express = require('express');
const router = express.Router();
const Segnalazione = require('../models/segnalazione');
const { verifyToken } = require('../auth/auth');


//GET le mie segnalazioni
router.get('/utenteregistrato/:nomeutente/segnalazione', verifyToken, async (req, res) => {
  try {
    const nomeutente = req.user.nomeutente;
    const segnalazioni = await Segnalazione.find({ nomeutente });
    res.json(segnalazioni);
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

//POST creare nuova segnalazione
router.post('/utenteregistrato/:nomeutente/segnalazione', verifyToken, async (req, res) => {
  try {
     const newSegnalazione = new Segnalazione({
      ...req.body,
      userId: req.user.id,
    });
    const savedSegnalazione = await newSegnalazione.save();
    res.status(201).json(savedSegnalazione);
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

module.exports = router;
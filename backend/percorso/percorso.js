const express = require('express');
const router = express.Router();
const Percorso = require('../models/percorso');
const { verifyToken } = require('../auth/auth');

//GET percorsi per quello sport
router.get('/sport/:sport/percorso', async (req, res) => {
  try {
    const { sport } = req.params;
    const percorsi = await Percorso.find({ sport });
    res.json(percorsi); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

//POST creare nuovo percorso
router.post('/sport/:sport/percorso', verifyToken, async (req, res) => {
  try {
    const { sport } = req.params;
    const newPercorso = new Percorso({ ...req.body, sport });
    const savedPercorso = await newPercorso.save();
    res.status(201).json(savedPercorso);
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

/*
// POST vota percorso
router.post('/sport/:sport/percorso/:idPercorso/voto', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { voto, commento } = req.body;
  if (typeof voto !== 'number' || voto < 0 || voto > 5) {
    return res.status(400).json({
      error: 'Voto non valido. Deve essere un numero tra 0 e 5.',
    });
  }

  try {
    const percorso = await Percorso.findById(id);
    if (!percorso) {
      return res.status(400).json({ error: 'Percorso inesistente' });
    }
    percorso.numero_voti = (percorso.numero_voti || 0) + 1;
    percorso.media_voti = ((percorso.media_voti || 0) * (percorso.numero_voti - 1) + voto) / percorso.numero_voti;

    percorso.commenti = percorso.commenti || [];
    if (commento) {
      percorso.commenti.push({
        userId: req.user.id,
        testo: commento,
        voto,
        data: new Date(),
      });
    }
    await percorso.save();
    res.status(201).json({ message: 'Voto registrato con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});*/

module.exports = router;
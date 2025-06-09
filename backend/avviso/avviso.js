const express = require('express');
const router = express.Router();
const Avviso = require('../models/avviso');
const { verifyToken } = require('../auth/auth');

// GET tutti gli avvisi / avvisi filtrati
router.get('/', verifyToken, async (req, res) => {
  try {
    const { tipo } = req.query;
    const query = tipo ? { tipo } : {};

    const avvisi = await Avviso.find(query);
    res.json(avvisi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

// GET singolo avviso
router.get('/:idAvviso', verifyToken, async (req, res) => {
  const { idAvviso } = req.params;

  try {
    const avviso = await Avviso.findById(idAvviso);
    if (!avviso) {
      return res.status(404).json({ errore: 'Avviso non trovato' });
    }

    res.json(avviso);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dell\'avviso' });
  }
});

// POST nuovo avviso
router.post('/', verifyToken, async (req, res) => {
  try {
    const { titolo, descrizione, data } = req.body;

    if (!titolo || !descrizione || !data) {
      return res.status(400).json({ errore: 'Dati mancanti' });
    }

    const nuovoAvviso = new Avviso({ titolo, descrizione, data });
    await nuovoAvviso.save();

    res.status(201).json({ id: nuovoAvviso._id, message: 'Avviso creato con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nella creazione dell\'avviso' });
  }
});

module.exports = router;

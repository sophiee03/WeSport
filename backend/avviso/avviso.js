const express = require('express');
const router = express.Router();
const avviso = require('../models/avviso');

//GET tutti gli avvisi / avvisi filtrati
router.get('/', async (req, res) => {
  try {
    const { tipo } = req.query;

    // Se viene fornito un tipo, filtra per tipo
    const query = tipo ? { tipo } : {};

    const avvisi = await Avviso.find(query);
    res.json(avvisi); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

// GET singolo avviso
router.get('/avviso/:idAvviso', async (req, res) => {
  const { id } = req.params;

  try {
    const avviso = await Avviso.findById(id);
    if (!avviso) {
      return res.status(404).json({ errore: 'Avviso non trovato' });
    }

    res.json(avviso);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dell\'avviso' });
  }
});

module.exports = router;
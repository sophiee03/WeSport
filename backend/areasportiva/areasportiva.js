const express = require('express');
const router = express.Router();
const areasportiva = require('../models/areasportiva');
const { tokenChecker } = require('../auth/auth')

//GET areesportive
router.get('/:sport/areesportive', async (req, res) => {
  try {
    const { zona } = req.query;
    // Se viene fornita una zona, filtra per zona
    const query = zona ? { zona } : {};
    
    const aree = await AreaSportiva.find(query);
    res.json(aree);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

//GET singola area sportiva
router.get('/:sport/areesportive/:nome', async (req, res) => {
  const { id } = req.params;

  try {
    const area = await AreaSportiva.findById(id);

    if (!area) {
      return res.status(404).json({ errore: 'Area sportiva non trovata' });
    }

    res.json(area);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dei dettagli' });
  }
});


/*router.post('/votoareesportive/:idAS', tokenChecker, async (req, res) => {
  const { id } = req.params;
  const { recensione, commento } = req.body;

  // Validazione voto
  if (typeof recensione !== 'number' || recensione < 0 || recensione > 5) {
    return res.status(400).json({
      error: 'Recensione non valida. Deve essere un numero da 0 a 5.',
    });
  }

  try {
    const area = await AreaSportiva.findById(id);
    if (!area) {
      return res.status(404).json({ error: 'Struttura non trovata' });
    }

    // Calcolo media voti e numero voti
    area.numero_voti = (area.numero_voti || 0) + 1;
    area.media_voti = ((area.media_voti || 0) * (area.numero_voti - 1) + recensione) / area.numero_voti;

    // Aggiunta commento, se presente
    area.commenti = area.commenti || [];
    if (commento) {
      area.commenti.push({
        userId: req.user.id,
        testo: commento,
        voto: recensione,
        data: new Date(),
      });
    }

    await area.save();

    res.status(201).json({ message: 'Recensione aggiunta con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});
*/

module.exports = router;

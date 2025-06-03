const express = require('express');
const router = express.Router();
const utenteregistrato = require('../models/utenteregistrato');
const { verifyToken } = require('../auth/auth');

router.get('/utenteregistrato/:nomeutente', async (req, res) => {
  try {
    const { nomeutente } = req.params;
    const utente = await UtenteRegistrato.findOne({ nomeutente });
    if (!utente) return res.status(404).json({ message: 'Utente non trovato' });
    res.json(utente);
  } catch (err) {
    res.status(500).json({ message: 'Errore server' });
  }
});

//DELETE elimina utente registrato
router.delete('/utenteregistrato/:nomeutente', verifyToken, async (req, res) => {
  try {
    const { nomeutente } = req.params;

    if (req.user.nomeutente !== nomeutente) {
      return res.status(403).json({ message: 'Accesso negato' });
    }

    const result = await UtenteRegistrato.deleteOne({ nomeutente });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'Utente non trovato' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Errore server' });
  }
});

// PUT modifica utente registrato
router.put('/utenteregistrato/:nomeutente', verifyToken, async (req, res) => {
  try {
    const { nomeutente } = req.params;

    if (req.user.nomeutente !== nomeutente) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const updateData = req.body;

    const utente = await UtenteRegistrato.findOneAndUpdate(
      { nomeutente },
      updateData,
      { new: true, runValidators: true }
    );

    if (!utente) return res.status(404).json({ message: 'Utente non trovato' });

    res.json({ message: 'Profilo aggiornato con successo', utente });
  } catch (err) {
    res.status(400).json({ message: 'Dati non validi', error: err.message });
  }
});

module.exports = router;
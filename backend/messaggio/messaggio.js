const express = require('express');
const router = express.Router();
const Messaggio = require('../models/messaggio');
const Chat = require('../models/chat');
const { verifyToken } = require('../auth/auth');

// GET tutti i messaggi di una chat
router.get('/annuncio/:idAnnuncio/chat/:idChat/messaggi', async (req, res) => {
  try {
    const messaggi = await Messaggio.find({ chat: req.params.idChat })
      .populate('mittente', 'username')
      .sort({ inviatoAlle: 1 }); // ordinati cronologicamente
    res.json(messaggi);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dei messaggi' });
  }
});

//POST invia un messaggio in una chat
router.post('/annuncio/:idAnnuncio/chat/:idChat/messaggi', verifyToken, async (req, res) => {
  try {
    const { testo } = req.body;
    const nuovoMessaggio = new Messaggio({
      chat: req.params.idChat,
      mittente: req.user.id,
      testo,
    });

    const salvato = await nuovoMessaggio.save();
    res.status(201).json(salvato);
  } catch (err) {
    res.status(500).json({ error: 'Errore nell\'invio del messaggio' });
  }
});

module.exports = router;

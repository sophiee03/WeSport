const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');
const Annuncio = require('../models/annuncio');

//POST crea la chat per quell'annuncio
router.post('/annuncio/:idAnnuncio/chat/:idChat', async (req, res) => {
  try {
    const existing = await Chat.findOne({ annuncio: req.params.idAnnuncio });
    if (existing) return res.status(200).json(existing);

    const newChat = new Chat({ annuncio: req.params.idAnnuncio });
    const saved = await newChat.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella creazione della chat' });
  }
});

//GET chat per un annuncio
router.get('/annuncio/:idAnnuncio/chat/:idChat', async (req, res) => {
  try {
    const chat = await Chat.findOne({ annuncio: req.params.idAnnuncio });
    if (!chat) return res.status(404).json({ error: 'Chat non trovata' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero della chat' });
  }
});

module.exports = router;

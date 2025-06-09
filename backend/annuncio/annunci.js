const express = require('express');
const router = express.Router();

const Annuncio = require("../models/annuncio");
const UtenteRegistrato = require("../models/utenteregistrato");

const { verifyToken } = require("../auth/auth");

// GET tutti gli annunci
router.get('/', verifyToken, async (req, res) => {
  try {
    const annunci = await Annuncio.find();
    res.json(annunci);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

// POST nuovo annuncio
router.post('/', verifyToken, async (req, res) => {
  try {
    const newAnnuncio = new Annuncio(req.body);
    const savedAnnuncio = await newAnnuncio.save();
    res.status(201).json(savedAnnuncio);
  } catch (err) {
    console.error(err);
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

// GET utenti iscritti a un annuncio
router.get('/:idAnnuncio/iscritti', verifyToken, async (req, res) => {
  try {
    const annuncio = await Annuncio.findById(req.params.idAnnuncio)
      .populate('members', '-password');
    if (!annuncio) {
      return res.status(404).json({ message: 'Annuncio non trovato' });
    }
    res.json(annuncio.members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// POST iscrizione a un annuncio
router.post('/:idAnnuncio/iscritti', verifyToken, async (req, res) => {
  try {
    const utente = await UtenteRegistrato.findOne({ nomeutente: req.user.nomeutente });
    if (!utente) {
      return res.status(401).json({ message: 'Utente non trovato' });
    }

    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) {
      return res.status(404).json({ message: 'Annuncio non trovato' });
    }

    if (annuncio.members.includes(utente._id)) {
      return res.status(400).json({ message: 'Utente già iscritto' });
    }

    annuncio.members.push(utente._id);
    await annuncio.save();

    res.status(200).json({ message: 'Iscrizione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// DELETE disiscrizione da un annuncio
router.delete('/:idAnnuncio/iscritti', verifyToken, async (req, res) => {
  try {
    const utente = await UtenteRegistrato.findOne({ nomeutente: req.user.nomeutente });
    if (!utente) {
      return res.status(401).json({ message: 'Utente non trovato' });
    }

    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) {
      return res.status(404).json({ message: 'Annuncio non trovato' });
    }

    if (!annuncio.members.includes(utente._id)) {
      return res.status(403).json({ message: 'Non sei iscritto a questo annuncio' });
    }

    annuncio.members = annuncio.members.filter(id => id.toString() !== utente._id.toString());
    await annuncio.save();

    res.status(200).json({ message: 'Disiscrizione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// GET chat di un annuncio
router.get('/:idAnnuncio/chat', verifyToken, async (req, res) => {
  try {
    const annuncio = await Annuncio.findById(req.params.idAnnuncio)
      .populate('chat'); // Assicurati che "chat" sia una reference nel modello Annuncio
    if (!annuncio) {
      return res.status(404).json({ message: 'Annuncio non trovato' });
    }
    res.json(annuncio.chat || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const Annuncio = require("../models/annuncio");
const Utente = require("../models/utente");

const { tokenChecker } = require("../auth/auth");

// GET per recuperare tutti gli annunci
router.get('/annuncio', tokenChecker, async (req, res) => {
  try {
    const annuncio = await annuncio.find();
    res.json(annuncio); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

//POST per creare nuovo annuncio
router.post('/annuncio', tokenChecker, async (req, res) => {
  try {
    const newannuncio = new annuncio(req.body); 
    const savedannuncio = await newannuncio.save(); 
    res.status(201).json(savedannuncio); 
  } catch (err) {
    console.error(err);
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

//GET iscritti a un annuncio
router.get('/annuncio/:idAnnuncio/iscritti', tokenChecker, async (req, res) => {
  try {
    const annuncio = await Annuncio.findById(req.params.idAnnuncio).populate('members', '-password');
    if (!annuncio) return res.status(404).json({ message: 'Annuncio non trovato' });
    res.json(annuncio.members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// POST iscrivi utente all'annuncio
router.post('/annuncio/:idAnnuncio/iscritti', tokenChecker, async (req, res) => {
  try {
    const utente = await Utente.findOne({ nomeutente: req.user.nomeutente });
    if (!utente) return res.status(401).json({ message: 'Utente non trovato' });

    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) return res.status(404).json({ message: 'Annuncio non trovato' });

    if (annuncio.members.includes(utente._id))
      return res.status(400).json({ message: 'Utente già iscritto' });

    annuncio.members.push(utente._id);
    await annuncio.save();

    res.status(200).json({ message: 'Iscrizione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// DELETE disiscrivi utente dall'annuncio
router.delete('/annuncio/:idAnnuncio/iscritti', tokenChecker, async (req, res) => {
  try {
    const utente = await Utente.findOne({ nomeutente: req.user.nomeutente });
    if (!utente) return res.status(401).json({ message: 'Utente non trovato' });

    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) return res.status(404).json({ message: 'Annuncio non trovato' });

    if (!annuncio.members.includes(utente._id))
      return res.status(403).json({ message: 'Non sei iscritto a questo annuncio' });

    annuncio.members = annuncio.members.filter(id => id.toString() !== utente._id.toString());
    await annuncio.save();

    res.status(200).json({ message: 'Disiscrizione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

module.exports = router;

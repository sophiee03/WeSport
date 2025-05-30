const express = require('express');
const router = express.Router();

const Annuncio = require("../models/annuncio");

const {isAuthenticated} = require("../auth/verifytoken")


// Endpoint per recuperare tutti gli annunci
router.get('/annuncio', isAuthenticcated, async (req, res) => {
  try {
    const annuncio = await annuncio.find( visibilita = true);
    res.json(annuncio); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newannuncio = new annuncio(req.body); 
    const savedannuncio = await newannuncio.save(); 
    res.status(201).json(savedannuncio); 
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

router.get('/:idAnnuncio/iscritti', authMiddleware, async (req, res) => {
  try {
    const annuncio = await Annuncio.findById(req.params.idAnnuncio).populate('members', '-password');
    if (!annuncio) return res.status(404).json({ message: 'Annuncio non trovato' });
    res.json(annuncio.members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// POST /annuncio/:idAnnuncio/iscritti - iscrivi utente all'annuncio
router.post('/:idAnnuncio/iscritti', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) return res.status(404).json({ message: 'Annuncio non trovato' });

    if (annuncio.members.includes(userId))
      return res.status(400).json({ message: 'Utente già iscritto' });

    annuncio.members.push(userId);
    await annuncio.save();

    res.status(200).json({ message: 'Iscrizione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// DELETE /annuncio/:idAnnuncio/iscritti - disiscrivi utente dall'annuncio
router.delete('/:idAnnuncio/iscritti', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) return res.status(404).json({ message: 'Annuncio non trovato' });

    if (!annuncio.members.includes(userId))
      return res.status(403).json({ message: 'Non sei iscritto a questo annuncio' });

    annuncio.members = annuncio.members.filter(id => id.toString() !== userId);
    await annuncio.save();

    res.status(200).json({ message: 'Disiscrizione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
});

// DELETE /annuncio/:idAnnuncio/iscritti - disiscrivi utente dall'annuncio
router.delete('/:idAnnuncio/iscritti', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // prendi l'ID dell'utente dal token JWT
    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) return res.status(404).json({ message: 'Annuncio non trovato' });

    // Controlla se l'utente è iscritto
    if (!annuncio.members.includes(userId)) {
      return res.status(403).json({ message: 'Non sei iscritto a questo annuncio' });
    }

    // Rimuovi l'utente dalla lista membri
    annuncio.members = annuncio.members.filter(id => id.toString() !== userId);
    await annuncio.save();

    res.status(200).json({ message: 'Disiscrizione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore interno del server' });
  }
});

module.exports = router;

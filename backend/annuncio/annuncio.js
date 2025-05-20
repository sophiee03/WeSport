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
    console.error("Errore nel recuperare gli annunci:", err);
    res.status(500).json({ success: false, message: 'Errore nel recupero dei dati' });
  }
});

// Endpoint per recuperare un singolo annuncio specifico, 
// Non so se questo vada qua o nell'utenteregistrato
  router.get("/annuncio/:idAnnuncio", isAuthenticated, async (req, res) => {
    try {
      const idAnnuncio = req.params.idAnnuncio;
      const annuncio = await annuncio.findById(idAnnuncio).populate('iscritti');
      if (!annuncio) {
        return res.status(404).json({ success: false, message: "Non ci sono annunci" });
      }
      res.json(annuncio);
    } catch (error) {
      console.error("Errore nel recuperare gli annunci:", error);
      res.status(500).json({ success: false, message: "Errore durante il recupero degli annunci" });
    }
  });

//Endpoint per rimozione annuncio da parte del capogruppo
// Non so se questo vada qua o nell'utenteregistrato
  router.delete('/annuncio/:idAnnuncio', async (req, res) => {
  try {
    const idAnnuncio = req.params.idAnnuncio;
    const annuncio = await Annuncio.findById(idAnnuncio);
    if (!annuncio) {
      return res.status(404).json({ errore: 'Annuncio non trovato' });
    }

     // Verifica che l'utente loggato sia il capogruppo
    if (annuncio.idCapogruppo.toString() !== req.utenteregistrato.id) {
      return res.status(403).json({ errore: 'Non sei autorizzato a eliminare questo annuncio' });
    }

    await annuncio.deleteOne();
    res.json({ messaggio: 'Annuncio eliminato con successo' });
  } catch (err) {
    res.status(500).json({ errore: 'Errore durante l\'eliminazione' });
  }
});

//Endpoint per modifica dell'annuncio da parte del capogruppo
router.put('/annuncio/:idAnnuncio', async (req, res) => {
  try {
    const annuncio = await Annuncio.findById(req.params.idAnnuncio);
    if (!annuncio) {
      return res.status(404).json({ errore: 'Annuncio non trovato' });
    }

    if (annuncio.idCapogruppo.toString() !== req.utenteregistrato.id) {
      return res.status(403).json({ errore: 'Non sei autorizzato a modificare questo annuncio' });
    }

    const aggiornato = await Annuncio.findByIdAndUpdate(req.params.idAnnuncio, req.body, {
      new: true, // restituisce l'annuncio aggiornato
      runValidators: true
    });

    res.json(aggiornato);
  } catch (err) {
    res.status(500).json({ errore: 'Errore durante la modifica' });
  }
});

router.post('/annuncio', async (req, res) => {
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

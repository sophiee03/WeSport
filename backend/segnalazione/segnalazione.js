const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const Segnalazione = require('../models/segnalazione');
const { verifyToken } = require('../auth/auth');
=======
const segnalazione = require('../models/segnalazione');
const nodemailer = require('nodemailer');
>>>>>>> 0987a5f47d3cc3d6a384286fd7637e9fa7463b9f

//GET le mie segnalazioni
router.get('/utenteregistrato/:nomeutente/segnalazione', verifyToken, async (req, res) => {
  try {
    const nomeutente = req.user.nomeutente;
    const segnalazioni = await Segnalazione.find({ nomeutente });
    res.json(segnalazioni);
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

//POST creare nuova segnalazione
router.post('/utenteregistrato/:nomeutente/segnalazione', verifyToken, async (req, res) => {
  try {
<<<<<<< HEAD
     const newSegnalazione = new Segnalazione({
      ...req.body,
      userId: req.user.id,
    });
    const savedSegnalazione = await newSegnalazione.save();
    res.status(201).json(savedSegnalazione);
=======
    const newsegnalazione = new segnalazione(req.body); 
    const savedsegnalazione = await newsegnalazione.save(); 
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      utente: {
        user: 'giacomorossi@gmail.com',
        pass: 'password123' 
      }
    });

    const mailOptions = {
      from: 'giacomorossi@gmail.com',
      to: 'evelin.begher@gmail.com.com',
      subject: 'Nuova Segnalazione ricevuta',
      text: `Nuova segnalazione:
        Data: ${req.body.data}
        Luogo: ${req.body.luogo}
        Descrizione: ${req.body.descrizione}
        Stato: ${req.body.stato}
        ID Utente: ${req.body.idUtente}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Errore invio email:', error);
      } else {
        console.log('Email inviata:', info.response);
      }
    });

    res.status(201).json(savedsegnalazione); 
    
>>>>>>> 0987a5f47d3cc3d6a384286fd7637e9fa7463b9f
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

module.exports = router;
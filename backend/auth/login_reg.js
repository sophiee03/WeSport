const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UtenteRegistrato = require('../models/utenteregistrato');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto';

// Endpoint di registrazione
router.post('/v1/auth/register', async (req, res) => {
  const { nomeutente, password, email, tipo, fotoprofilo, selfdescription } = req.body;

  if (!nomeutente || !password || !email || !tipo) {
    return res.status(400).json({ message: 'Campi richiesti mancanti' });
  }

  try {
    const utenteEsistente = await Utente.findOne({ nomeutente });
    if (utenteEsistente) {
      return res.status(400).json({ message: 'Utente già esistente' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuovoUtente = new Utente({
      nomeutente,
      password: hashedPassword,
      email,
      tipo,
      fotoprofilo: fotoprofilo || null,
      selfdescription: selfdescription || null,
    });

    await nuovoUtente.save();

    const token = jwt.sign({ nomeutente }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, nomeutente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

// Endpoint di login
router.post('/v1/auth/login', async (req, res) => {
  const { nomeutente, password } = req.body;

  try {
    const utente = await UtenteRegistrato.findOne({ nomeutente });
    if (!utente) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    const passwordOk = await bcrypt.compare(password, utente.password);
    if (!passwordOk) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    const token = jwt.sign({ nomeutente }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, nomeutente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

module.exports = router;
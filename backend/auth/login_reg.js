// Backend Node.js con Express + MongoDB (Mongoose) per login e registrazione

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto';

// Middleware
app.use(cors());
app.use(express.json());

// Connessione al database MongoDB
mongoose.connect('mongodb://localhost:27017/wesport', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema Utente
const utenteSchema = new mongoose.Schema({
  nomeutente: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  tipo: { type: String, required: true },
  fotoprofilo: { type: String, required: false },
  selfdescription: { type: String, required: false },
});

const Utente = mongoose.model('Utente', utenteSchema);

// Endpoint di registrazione
app.post('/v1/auth/register', async (req, res) => {
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
app.post('/v1/auth/login', async (req, res) => {
  const { nomeutente, password } = req.body;

  try {
    const utente = await Utente.findOne({ nomeutente });
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

// Avvio server
app.listen(PORT, () => {
  console.log(`API auth avviata su http://localhost:${PORT}`);
});

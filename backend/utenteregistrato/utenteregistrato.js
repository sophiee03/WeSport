const express = require('express');
const router = express.Router();
const utenteregistrato = require('../models/utenteregistrato');

/** COMMENTI SWAGGER
 * @openapi
 * /utenteregistrato/profiloUtente:
 *       get:
 *           summary: Ottiene il profilo utente
 *           tags:
 *             - Utente Registrato
 *           security:
 *             - bearerAuth: []
 *           responses:
 *             '200':
 *               description: Info del profilo
 *               content:
 *                 application/json:
 *                   schema:
 *                     $ref: '../components/schemas/utenteregistrato.yaml'
 *             '401':
 *               description: Utente non autorizzato
 */

router.get('/profiloutente', async (req, res) => {
  try {
    // Recupera un utente qualsiasi per esempio (da sostituire con utente autenticato)
    const utente = await utenteregistrato.findOne();
    if (!utente) return res.status(404).json({ message: 'Utente non trovato' });

    res.status(200).json(utente);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server' });
  }
});

/**
 * @openapi
 * /utenteregistrato/profiloutente/punti:
 *   get:
 *     summary: Ottiene i punti dell'utente
 *     tags:
 *       - Utente Registrato
 *     responses:
 *       '200':
 *         description: Numero di punti
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 punti:
 *                   type: integer
 *                   default: 0
 */

router.get('/profiloutente/punti', async (req, res) => {
  try {
    const utente = await utenteregistrato.findOne();
    if (!utente) return res.status(404).json({ message: 'Utente non trovato' });

    res.status(200).json({ punti: utente.punti });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/annunciController');

/**
 * @openapi
 * /api/annunci:
 *   get:
 *     tags:
 *       - Annunci
 *     summary: Ottieni tutti gli annunci
 *     responses:
 *       200:
 *         description: Lista di annunci
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Annuncio'
 *       500:
 *         description: Errore interno
 */
router.get('/', controller.getAllAnnunci);

/**
 * @openapi
 * /api/annunci:
 *   post:
 *     tags:
 *       - Annunci
 *     summary: Crea un nuovo annuncio (solo utenti registrati)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annuncio'
 *     responses:
 *       201:
 *         description: Annuncio creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annuncio'
 *       400:
 *         description: Campi obbligatori mancanti
 *       401:
 *         description: Non autorizzato
 */
router.post('/', controller.createAnnuncio);

module.exports = router;
router.get('/', async (req, res) => {
  try {
    const annuncio = await annuncio.find();
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

module.exports = router;
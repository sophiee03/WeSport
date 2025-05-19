const express = require('express');
const router = express.Router();
// Endpoint per iscriversi a un annuncio
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

module.exports = router;
const express = require('express');
const router = express.Router();
const areasportiva = require('../models/areasportiva');

/** COMMENTI SWAGGER
 * @openapi
 * /areasportiva
 *     get:
 *           description: Ottieni tutte le strutture sportive
 *           responses:
 *               '200':
 *               description: Successo
 *               '500':
 *               description: Errore interno
 */

router.get('/', async (req, res) => {
  try {
    const areasportiva = await areasportiva.find();
    res.json(areasportiva); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newareasportiva = new areasportiva(req.body); 
    const savedareasportiva = await newareasportiva.save(); 
    res.status(201).json(savedareasportiva); 
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});



/**
 * @swagger
 * areasportiva/votoareasportiva:
 *   post:
 *     summary: Invia una recensione a un’area sportiva
 *     description: Permette a un utente registrato di lasciare una recensione a un’area sportiva.
 *     tags:
 *       - Strutture
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID dell’area sportiva da recensire
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recensione:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 2
 *               commento:
 *                 type: string
 *                 example: "campo pieno di foglie"
 *             required:
 *               - recensione
 *     responses:
 *       '201':
 *         description: Recensione salvata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recensione aggiunta con successo
 *       '400':
 *         description: Dati mancanti o errati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Recensione non valida o struttura non trovata
 */

router.post('/votoareesportive/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { recensione, commento } = req.body;

  // Validazione del voto
  if (typeof recensione !== 'number' || recensione < 0 || recensione > 5) {
    return res.status(400).json({
      error: 'Recensione non valida. Deve essere un numero da 0 a 5.',
    });
  }

  try {
    const area = await AreaSportiva.findById(id);

    if (!area) {
      return res.status(400).json({
        error: 'Struttura non trovata',
      });
    }

    // Calcolo media e aggiornamento voti
    area.numero_voti = (area.numero_voti || 0) + 1;
    area.media_voti = ((area.media_voti || 0) * (area.numero_voti - 1) + recensione) / area.numero_voti;

    // Salva anche il commento
    area.commenti = area.commenti || [];
    if (commento) {
      area.commenti.push({
        userId: req.user.id,
        testo: commento,
        voto: recensione,
        data: new Date(),
      });
    }

    await area.save();

    res.status(201).json({ message: 'Recensione aggiunta con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

/** COMMENTI SWAGGER
 * @openapi
 * /areasportiva/searchAS
 *       description: Ottieni le aree sportive filtrate per categoria
 *       parameters:
 *       - name: type
 *           in: query
 *           description: Categoria dell'area sportiva (ad esempio: calcio, tennis, basket)
 *           required: true
 *           schema:
 *           type: string
 *       responses:
 *       '200':
 *           description: Successo - aree sportive filtrate per categoria
 *       '400':
 *           description: Parametro 'type' mancante
 *       '500':
 *           description: Errore interno
 */

router.get('/search', async (req, res) => {
  try {
    const searchAS = await areasportiva.find();
    res.json(searchAS); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

module.exports = router;

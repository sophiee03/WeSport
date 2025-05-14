const express = require('express');
const router = express.Router();
const Percorso = require('../models/Percorso'); // Modello MongoDB del percorso

/** COMMENTI SWAGGER
 * @openapi
 * /percorso
 *     get:
 *           description: Ottieni tutti i percorsi
 *           responses:
 *               '200':
 *               description: Successo
 *               '500':
 *               description: Errore interno
 */

router.get('/', async (req, res) => {
  try {
    const percorso = await percorso.find();
    res.json(percorso); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

/** COMMENTI SWAGGER
 * @openapi
 * /percorso/new
 *     post:
 *           summary: Crea un nuovo percorso
 *           requestBody:
 *             required: true
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/percorso'
 *           responses:
 *             '201':
 *               description: percorso creato con successo
 *               content:
 *                 application/json:
 *                   schema:
 *                     $ref: '#/components/schemas/percorso'
 *             '400':
 *               description: Errore nella creazione
 *               content:
 *                 application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       errore:
 *                         type: string
 *                         example: Errore nella creazione
  */

router.post('/new', async (req, res) => {
  try {
    const newpercorso = new percorso(req.body); 
    const savedpercorso = await newpercorso.save(); 
    res.status(201).json(savedpercorso); 
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

module.exports = router;

/** COMMENTI SWAGGER
 * @openapi
 * /percorso/votopercorso:
 * post:
 *   summary: Invia un voto a un percorso
 *   description: Permette a un utente registrato di dare un voto e un feedback a un percorso pubblicato da un altro utente.
 *  tags:
  *    - Feedback
  *  security:
  *    - bearerAuth: []
  *  parameters:
  *    - name: id
  *      in: path
  *      required: true
  *      description: ID del percorso da votare
  *      schema:
  *        type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            type: object
 *           properties:
 *             voto:
 *               type: integer
 *               minimum: 0
 *               maximum: 5
 *               example: 4
 *             commento:
 *               type: string
 *               example: "Percorso molto bello e ben segnalato!"
 *           required:
 *             - voto
 *   responses:
 *     '201':
 *       description: Voto registrato con successo
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Voto registrato con successo
 *     '400':
 *       description: Dati mancanti o non validi
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Voto non valido o percorso inesistente 
 *        
 */



// POST /percorso/votopercorso
router.post('/percorso/votopercorso/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { voto, commento } = req.body;

  if (typeof voto !== 'number' || voto < 0 || voto > 5) {
    return res.status(400).json({
      error: 'Voto non valido. Deve essere un numero tra 0 e 5.',
    });
  }

  try {
    const percorso = await Percorso.findById(id);

    if (!percorso) {
      return res.status(400).json({ error: 'Percorso inesistente' });
    }

    // Aggiunge il voto
    percorso.numero_voti += 1;
    percorso.media_voti = ((percorso.media_voti * (percorso.numero_voti - 1)) + voto) / percorso.numero_voti;

    // (opzionale) salva anche il commento
    percorso.commenti = percorso.commenti || [];
    if (commento) {
      percorso.commenti.push({
        userId: req.user.id, // preso dal token
        testo: commento,
        voto: voto,
        data: new Date(),
      });
    }

    await percorso.save();

    res.status(201).json({ message: 'Voto registrato con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

module.exports = router;

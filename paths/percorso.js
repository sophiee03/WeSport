const express = require('express');
const router = express.Router();
const Percorso = require('../models/Percorso'); // Modello MongoDB del percorso

/** COMMENTI SWAGGER
 * @openapi
 * /percorso
 *     
 *        
 */

router.get('/', async (req, res) => {
  
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

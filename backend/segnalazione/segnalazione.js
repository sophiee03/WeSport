const express = require('express');
const router = express.Router();
const segnalazione = require('../models/segnalazione');

/** COMMENTI SWAGGER
 * @openapi
 * /segnalazione
 *     get:
 *           description: Ottieni tutte le segnalazioni
 *           responses:
 *               '200':
 *               description: Successo
 *               '500':
 *               description: Errore interno
 */

router.get('/', async (req, res) => {
  try {
    const segnalazione = await segnalazione.find();
    res.json(segnalazione); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

/** COMMENTI SWAGGER
 * @openapi
 * /segnalazione/new
 *     post:
 *           summary: Crea una nuova segnalazione
 *           requestBody:
 *             required: true
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/segnalazione'
 *           responses:
 *             '201':
 *               description: segnalazione creata con successo
 *               content:
 *                 application/json:
 *                   schema:
 *                     $ref: '#/components/schemas/segnalazione'
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
    const newsegnalazione = new segnalazione(req.body); 
    const savedsegnalazione = await newsegnalazione.save(); 
    res.status(201).json(savedsegnalazione); 
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

module.exports = router;
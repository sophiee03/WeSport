const express = require('express');
const router = express.Router();
const percorso = require('../models/percorso');

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
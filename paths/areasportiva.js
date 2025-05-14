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

/** COMMENTI SWAGGER
 * @openapi
 * /areasportiva
 *     post:
 *           summary: Crea una nuova area sportiva
 *           requestBody:
 *             required: true
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/AreaSportiva'
 *           responses:
 *             '201':
 *               description: Area sportiva creata con successo
 *               content:
 *                 application/json:
 *                   schema:
 *                     $ref: '#/components/schemas/AreaSportiva'
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

router.post('/', async (req, res) => {
  try {
    const newareasportiva = new areasportiva(req.body); 
    const savedareasportiva = await newareasportiva.save(); 
    res.status(201).json(savedareasportiva); 
  } catch (err) {
    res.status(400).json({ errore: 'Errore nella creazione' });
  }
});

module.exports = router;
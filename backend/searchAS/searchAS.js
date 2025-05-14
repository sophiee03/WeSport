const express = require('express');
const router = express.Router();
const areasportiva = require('../models/areasportiva');

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

router.get('/', async (req, res) => {
  try {
    const searchAS = await areasportiva.find();
    res.json(searchAS); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});



module.exports = router;
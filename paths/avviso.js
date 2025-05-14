const express = require('express');
const router = express.Router();
const avviso = require('../models/avviso');

/** COMMENTI SWAGGER
 * @openapi
 * /avviso
 *      get:
 *           description: Ottieni tutti gli avvisi
 *           responses:
 *               '200':
 *               description: Successo
 *               '500':
 *               description: Errore interno
 */

router.get('/', async (req, res) => {
  try {
    const avviso = await avviso.find();
    res.json(avviso); 
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel recupero dei dati' });
  }
});

module.exports = router;
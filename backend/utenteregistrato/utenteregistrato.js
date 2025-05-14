const express = require('express');
const router = express.Router();
const utenteregistrato = require('../models/utenteregistrato');

/** COMMENTI SWAGGER
 * @openapi
 * /utenteregistrato/profiloUtente:
 *       get:
 *           summary: Ottiene il profilo utente
 *           tags:
 *             - Utente Registrato
 *           security:
 *             - bearerAuth: []
 *           responses:
 *             '200':
 *               description: Info del profilo
 *               content:
 *                 application/json:
 *                   schema:
 *                     $ref: '../components/schemas/utenteregistrato.yaml'
 *             '401':
 *               description: Utente non autorizzato
 */

router.get('/', async (req, res) => {
  //  ??????????????????????????
});

module.exports = router;
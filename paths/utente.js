const express = require('express');
const router = express.Router();
const utente = require('../models/utente');

/** COMMENTI SWAGGER
 * @openapi
 * /utente
 *      get:
 *          
 */

router.get('/', async (req, res) => {
  
});

module.exports = router;

/**
 * @swagger
 * /profiloUtente:
 *   get:
 *     summary: Ottiene il profilo utente
 *     tags:
 *       - Utente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Info profilo (utente registrato o utente non registrato)
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: ../components/schemas/utenteregistrato.yaml
 *                 - $ref: ../components/schemas/utente.yaml
 *       '401':
 *         description: Token mancante o non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Accesso negato. Utente non registrato o token non valido
 */

/**
 * @swagger
 * /registrazioneUtente:
 *   get:
 *     summary: registrazione profilo utente
 *     tags:
 *       - Utente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Info profilo (utente registrato o utente non registrato)
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: ../components/schemas/utenteregistrato.yaml
 *                 - $ref: ../components/schemas/utente.yaml
 *       '401':
 *         description: Token mancante o non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Accesso negato. Utente non registrato o token non valido
 *
 *   post:
 *     summary: Registra un nuovo utente
 *     tags:
 *       - Utente Non Registrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: ../components/schemas/utenteregistrato.yaml
 *     responses:
 *       '201':
 *         description: Registrazione avvenuta con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ../components/schemas/utenteregistrato.yaml
 *       '400':
 *         description: Dati mancanti o errati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email già in uso o dati non validi
 */

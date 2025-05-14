const express = require('express');
const router = express.Router();
//const auth = require('../models/auth');   ???????????????

/** COMMENTI SWAGGER
 * @openapi
 * /auth/login:
 *       post:
 *           summary: Login utente tramite ID provider
 *           tags:
 *           - Auth
 *           requestBody:
 *           required: true
 *           content:
 *               application/json:
 *               schema:
 *                   $ref: '../components/schemas/Login/LoginRequest.yaml'
 *           responses:
 *           '200':
 *               description: Login riuscito
 *               content:
 *               application/json:
 *                   schema:
 *                   $ref: '../components/schemas/Login/AuthToken.yaml'
 *           '401':
 *               description: Credenziali non valide
 *
 *  /auth/logout:
 *       post:
 *           summary: Logout dell'utente
 *           tags:
 *           - Auth
 *           security:
 *           - bearerAuth: []
 *           responses:
 *           '200':
 *               description: Logout effettuato con successo
 *           '401':
 *               description: Utente non autorizzato
 *
 */


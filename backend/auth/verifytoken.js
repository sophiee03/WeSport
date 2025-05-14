//importa il modulo per JWT jsonwebtoken
const jwt = require('jsonwebtoken');

//definisce un middleware per proteggere le rotte
const tokenChecker = (req, res, next) => {
  //legge l'header della richiesta  
  const authHeader = req.headers.authorization;
    //verifica che ci sia l'header e che cominci con Bearer
    if (authHeader && authHeader.startsWith('Bearer ')) {
      //estrae il token togliendo Bearer  
      const token = authHeader.substring(7);
        //verifica il token usando la chiave segreta
        jwt.verify(token, process.env.SUPER_SECRET, (err, user) => {
          //se è scaduto o falso invia risposta negativa
          if (err) {
            return res.status(403).json({ message: "Accesso negato: token non valido" });
          }
          //se valido salva info decodificate in req.user
          req.user = user;
          next();
        });
    //se l'header non è presente o malformato invia risposta negativa
    } else {
        res.status(403).json({ message: "Accesso negato: token non fornito" });
    }
};

//middleware per rotte che richiedono che l'utente abbia fatto login tramite sessione
function isAuthenticated(req, res, next) {
    //se esiste req.session.user l'utente è autenticato => continua
    if (req.session.user) {
      next();
    //sennò invia errore 'non autorizzato'
    } else {
      res.status(401).send({ success: false, message: "Non autenticato" });
    }
  }

//controlla se l'utente ha un certo ruolo, restituisce un middleware personalizzato per il ruolo dell'utente
function checkUserRole(role) {
    return (req, res, next) => {
      //prende il ruolo type dell'utente salvato nella sessione
      const userRole = req.session.user && req.session.user.tipo || 'guest';
      // se è admin o il ruolo è compreso tra quelli richiesti continua
      if (userRole === 'registrato' || role.includes(userRole)) {
        next();
      //altrimenti invia errore
      } else {
        res.status(403).send("Accesso negato: non hai i permessi per accedere a questa pagina");
      }
    };
  }
  
  //esporta per poterli usare nei router
  module.exports = { tokenChecker, isAuthenticated, checkUserRole };
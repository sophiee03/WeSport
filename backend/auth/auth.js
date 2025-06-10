const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  console.log('Authorization header:', req.headers.authorization);

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    jwt.verify(token, process.env.JWT_SECRET || 'supersegreto', (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Accesso negato: token non valido" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(403).json({ message: "Accesso negato: token non fornito" });
  }

  if (!authHeader) {
    return res.status(401).json({ message: 'Token non fornito' });
  }

  if (!token) {
    return res.status(401).json({ message: 'Token non fornito' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Errore nel token:', err.message);
      return res.status(401).json({ message: 'Token non valido' }); 
    }

    req.user = user; 
    next();
  });

};

module.exports = { verifyToken };

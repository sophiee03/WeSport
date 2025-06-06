const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
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
};

module.exports = { verifyToken };

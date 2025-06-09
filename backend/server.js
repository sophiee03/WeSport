const app = require('./application');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

module.exports = server;

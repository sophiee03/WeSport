const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// middleware per leggere JSON nel body delle richieste
app.use(express.json());

// esempio di route base
app.get('/', (req, res) => {
  res.send('Server WeSport attivo!');
});

// qui puoi aggiungere il router annunci, ad esempio:
// const annunciRouter = require('./routes/annunci');
// app.use('/api', annunciRouter);

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});

require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(async () => {
  try {
    const uri = process.env.MONGO_URI_TEST;
    if (!uri) {
      throw new Error('MONGO_URI_TEST non definita nel file .env');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Errore nella connessione a MongoDB:', err);
    process.exit(1);  // Esci se la connessione fallisce (opzionale)
  }
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error('Errore nella disconnessione da MongoDB:', err);
  }
});

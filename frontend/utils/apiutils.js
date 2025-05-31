import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Restituisce le intestazioni per le chiamate API,
 * includendo il token Bearer se presente in AsyncStorage.
 */
export async function getHeaders() {
  try {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  } catch (error) {
    console.error('Errore nel recupero del token', error);
    return {
      'Content-Type': 'application/json',
    };
  }
}
/**
 * Verifica se l'utente è loggato (token valido)
 * Restituisce `true` se loggato, `false` altrimenti
 */
export async function isLoggedIn() {
  try {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  } catch (error) {
    console.error('Errore nel verificare login', error);
    return false;
  }
}
/**
 * Restituisce l'ID utente memorizzato localmente.
 * Assumi che sia salvato con chiave 'userId'.
 */
export async function getnomeutente() {
  try {
    const nomeutente = await AsyncStorage.getItem('nomeutente');
    return nomeutente;
  } catch (error) {
    console.error('Errore nel recupero del nomeutente', error);
    return null;
  }
}

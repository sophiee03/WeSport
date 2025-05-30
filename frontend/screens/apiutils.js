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

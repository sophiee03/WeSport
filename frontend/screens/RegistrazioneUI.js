import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { BASE_URL } from '../utils/path';

export default function UsernameScreen({ route, navigation }) {
  const { token } = route.params;
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    if (!username.trim()) return Alert.alert('Errore', 'Inserisci un nome utente');

    try {
      const res = await fetch(`${BASE_URL}/register-username`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, username }),
      });

      const result = await res.json();
      if (result.success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Errore', result.message || 'Nome utente già usato');
      }
    } catch (error) {
      Alert.alert('Errore', 'Registrazione fallita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Scegli il tuo nome utente</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="es. sportivo123"
      />
      <Button title="Conferma" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});

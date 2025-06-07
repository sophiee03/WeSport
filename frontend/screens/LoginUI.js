import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../utils/path';

export default function LoginRegisterScreen() {
  const [nomeutente, setNomeutente] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');


  const handleSubmit = async () => {
  if (!nomeutente || !password || (!isLogin && (!email || !tipo))) {
    Alert.alert('Errore', 'Compila tutti i campi obbligatori');
    return;
  }

  const endpoint = isLogin ? 'login' : 'register';

  const body = isLogin
    ? { nomeutente, password }
    : { nomeutente, password, email, tipo };

  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Errore');

    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('nomeutente', data.nomeutente);

    navigation.navigate('Home');
  } catch (error) {
    Alert.alert('Errore', error.message || 'Errore inatteso');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? 'Login' : 'Registrazione'}
      </Text>

      <TextInput
        placeholder="Nome utente"
        value={nomeutente}
        onChangeText={setNomeutente}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {!isLogin && (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Tipo (es. atleta, coach)"
            value={tipo}
            onChangeText={setTipo}
            style={styles.input}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? 'Accedi' : 'Registrati'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin
            ? "Non hai un account? Registrati"
            : "Hai già un account? Accedi"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1D4ED8',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#555',
  },
});

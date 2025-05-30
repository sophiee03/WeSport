import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const CLIENT_ID = 'TUO_CLIENT_ID_GOOGLE'; // Sostituisci con il tuo Client ID da fare da console.cloud.google.com
const REDIRECT_URI = AuthSession.makeRedirectUri();

export default function LoginScreen() {
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
      responseType: 'token',
    },
    discovery
  );

useEffect(() => {
  if (response?.type === 'success') {
    const { access_token } = response.params;

    // Chiedi al backend se è già registrato
    fetch(`${BASE_URL}/check-google-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: access_token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          navigation.navigate('Home'); // o Profile
        } else {
          navigation.navigate('UsernameScreen', { token: access_token });
        }
      });
  }
}, [response]);


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Accedi a WeSport</Text>
        <TouchableOpacity
          style={styles.button}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Text style={styles.buttonText}>Accedi con Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

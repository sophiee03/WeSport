import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';

export default function ProfiloUtente() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const percorsi = [
    { id: '1', nome: 'Bondone', descrizione: 'Percorso con la bici' },
    { id: '2', nome: 'Trento sud', descrizione: 'Alla scoperta di Trento Sud' },
  ];

  const segnalazioni = [
    { id: '1', luogo: 'Parchetto P.Dante', descrizione: 'Spaccini vendono droga', stato: 'Refused' },
  ];

  const punti = 4;

  const getImageByPoints = (p) => {
    if (p >= 85) {
      return 'https://img.freepik.com/premium-vector/oak-icon-green-forest-tree-nature-symbol_53562-20987.jpg'; // albero grande
    } else if (p >= 45) {
      return 'https://cdn-icons-png.flaticon.com/512/4147/4147953.png'; // piantina media
    } else {
      return 'https://cdn-icons-png.flaticon.com/512/2227/2227504.png'; // seme piccolo
    }
  };

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      Alert.alert('Errore', 'Credenziali errate');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    // pagina login
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Accedi a WeSport</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  // pagina principale con logout
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WeSport</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>marikarossi02</Text>
        <Text style={styles.interests}>#calcio #corsa #trekking</Text>
      </View>

      <View style={styles.pointsContainer}>
        <Image
          source={{ uri: getImageByPoints(punti) }}
          style={styles.plant}
        />
        <Text style={styles.points}>{punti} punti</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I miei Percorsi</Text>
        {percorsi.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardDescription}>{item.descrizione}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Le mie Segnalazioni</Text>
        {segnalazioni.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.luogo}</Text>
            <Text style={styles.cardDescription}>{item.descrizione}</Text>
            <Text style={styles.refused}>Refused</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  interests: {
    color: '#888',
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  plant: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardDescription: {
    color: '#666',
  },
  refused: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

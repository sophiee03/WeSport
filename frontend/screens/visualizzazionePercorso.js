import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Alert, Button } from 'react-native';
import { BASE_URL } from '../utils/path';

export default function VisualizzaPercorso({ route, navigation }) {
  const { idPercorso } = route.params;
  const [percorso, setPercorso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/${idPercorso}`)
      .then(res => {
        if (!res.ok) throw new Error('Errore nel caricamento percorso');
        return res.json();
      })
      .then(data => {
        setPercorso(data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert('Errore', err.message);
        setLoading(false);
      });
  }, [idPercorso]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!percorso) {
    return <Text style={styles.error}>Percorso non trovato</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categoria: {percorso.categoria}</Text>
      <Text style={styles.text}>Difficoltà: {percorso.difficolta}</Text>
      <Text style={styles.text}>Durata: {percorso.durata} minuti</Text>
      <Text style={styles.text}>Descrizione:</Text>
      <Text style={styles.description}>{percorso.descrizione}</Text>

      {percorso.foto ? (
        <Image source={{ uri: percorso.foto }} style={styles.image} />
      ) : (
        <Text style={{ fontStyle: 'italic', marginTop: 10 }}>Nessuna immagine disponibile</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    marginTop: 5,
    fontSize: 16,
  },
  image: {
    marginTop: 15,
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  error: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 18,
    color: 'red',
  },
});

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
  FlatList, TouchableOpacity
} from 'react-native';

const BASE_URL = 'http://api.weSport.it/v1/sport/{sport}/percorso';

export default function ListaPercorsi({ route, navigation }) {
  const { categoria } = route.params; // ricevi categoria come parametro
  const [percorsi, setPercorsi] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPercorsi();
  }, []);

  const fetchPercorsi = () => {
    setLoading(true);
    fetch(`${BASE_URL}`)
      .then(res => {
        if (!res.ok) throw new Error('Errore nel caricamento dei percorsi');
        return res.json();
      })
      .then(data => {
        setPercorsi(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.message);
        setLoading(false);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('VisualizzazionePercorso', { idPercorso: item.id })}
    >
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardText}>Difficoltà: {item.difficolta}</Text>
      <Text style={styles.cardText}>Durata: {item.durata} min</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Percorsi per: {categoria.toUpperCase()}</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={percorsi}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f1f2f6',
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardText: {
    fontSize: 14,
    marginTop: 4,
  },
});

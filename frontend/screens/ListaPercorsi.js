import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Alert } from 'react-native';
import { isLoggedIn } from '../utils/apiutils';
import { BASE_URL } from '../utils/path';

export default function ListaPercorsi({ route, navigation }) {
  const { categoria } = route.params;
  const [percorsi, setPercorsi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    fetchPercorsi();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const result = await isLoggedIn();
    setLogged(result);
  };

  const handleAddPress = () => {
    if (!logged) {
      Alert.alert('Accesso richiesto', 'Devi essere loggato per creare un percorso.');
    } else {
      navigation.navigate('creazionePercorso', { categoria });
    }
  };

  const fetchPercorsi = () => {
    setLoading(true);
    fetch(`${BASE_URL}/${categoria.toLowerCase()}/percorsi`)
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
      <View style={styles.headerRow}>
        <Text style={styles.header}>Percorsi per: {categoria.toUpperCase()}</Text>
        <TouchableOpacity
          style={[styles.addButton, !logged && styles.disabledButton]}
          onPress={handleAddPress}
        >
          <Ionicons name="add-circle" size={36} color={logged ? '#2196F3' : '#aaa'} />
        </TouchableOpacity>
      </View>

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

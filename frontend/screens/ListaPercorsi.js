// modifica per visualizzare filtrato solo quelli
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';

const CATEGORIES = ['corsa', 'trekking', 'ciclismo'];
const BASE_URL = 'http://api.weSport.it/v1/sport/{sport}/percorso';

export default function ListaPercorsi({ navigation }) {
  const [percorsi, setPercorsi] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setPercorsi(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Errore:', err);
        setLoading(false);
      });
  }, []);

  const percorsiFiltrati = filtro
    ? percorsi.filter(p => p.categoria === filtro)
    : percorsi;

  const renderPercorso = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('VisualizzaPercorso', { idPercorso: item.id })}
    >
      <Text style={styles.cardTitle}>{item.titolo}</Text>
      <Text style={styles.cardCategory}>{item.categoria}</Text>
      <Text style={styles.cardText}>Difficoltà: {item.difficolta}</Text>
      <Text style={styles.cardText}>Durata: {item.durata} min</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      {/* Filtro categoria */}
      <View style={styles.filtroContainer}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filtroBtn,
              filtro === cat && styles.filtroBtnAttivo
            ]}
            onPress={() => setFiltro(filtro === cat ? null : cat)}
          >
            <Text style={styles.filtroText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista percorsi */}
      <FlatList
        data={percorsiFiltrati}
        renderItem={renderPercorso}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

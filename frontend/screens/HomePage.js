import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { isLoggedIn } from '../utils/apiutils'; 
import BarraSezioni from '../components/barraSezioni'

const sportData = [
  { nome: 'Calcio', colore: '#4CAF50' },
  { nome: 'Basket', colore: '#FF9800' },
  { nome: 'Corsa', colore: '#2196F3' },
  { nome: 'Padel', colore: '#F44336' },
  { nome: 'Tennis', colore: '#212121' },
  { nome: 'Trekking', colore: '#6D3E3E' },
  { nome: 'Pallavolo/Beach Volley', colore: '#BDBDBD' },
  { nome: 'Nuoto', colore: '#3F51B5' },
  { nome: 'Arrampicata', colore: '#FF5722' },
];

const sportPercorsi = ['corsa', 'ciclismo', 'trekking'];

export default function Home() {
  const navigation = useNavigation();

  const vaiAlleAree = (sport) => {
    const sportLower = sport.toLowerCase();

    if (sportPercorsi.includes(sportLower)) {
      navigation.navigate('ListaPercorsi', { categoria: sport });
    } else {
      navigation.navigate('visualizzaAS', { sport });
    }  
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <Text style={{ color: '#888' }}>Search</Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            const logged = await isLoggedIn();
            if (logged) {
              navigation.navigate('ProfiloUtente');
            } else {
              navigation.navigate('LoginUI');
            }
          }}
        >
          <Ionicons name="person-circle" size={32} color="black" />
        </TouchableOpacity>

      </View>

      <Text style={styles.sectionTitle}>Sport recenti</Text>
      <View style={styles.row}>
        {sportData.slice(0, 3).map((sport) => (
          <TouchableOpacity key={sport.nome} style={[styles.circle, { backgroundColor: sport.colore }]} onPress={() => vaiAlleAree(sport.nome)}>
            <Text style={styles.sportLabel}>{sport.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Altre categorie</Text>
      <View style={styles.grid}>
        {sportData.slice(3).map((sport) => (
          <TouchableOpacity key={sport.nome} style={[styles.circle, { backgroundColor: sport.colore }]} onPress={() => vaiAlleAree(sport.nome)}>
            <Text style={styles.sportLabel}>{sport.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <BarraSezioni />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 10,
    flex: 1,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sportLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

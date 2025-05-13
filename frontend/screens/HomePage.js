import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const sportData = [
  { nome: 'Calcio', colore: '#4CAF50' },
  { nome: 'Basket', colore: '#FF9800' },
  { nome: 'Corsa', colore: '#2196F3' },
  { nome: 'Padel', colore: '#F44336' },
  { nome: 'Tennis', colore: '#212121' },
  { nome: 'Trekking', colore: '#6D3E3E' },
  { nome: 'Pallavolo', colore: '#BDBDBD' },
  { nome: 'Beach Volley', colore: '#FF5722' },
  { nome: 'Nuoto', colore: '#3F51B5' },
];

export default function Home() {
  const navigation = useNavigation();

  const vaiAlleAree = (sport) => {
    navigation.navigate('AreeSportive', { sport });
  };

  const FooterIcon = ({ icon, screen }) => (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <Ionicons name={icon} size={28} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <Text style={{ color: '#888' }}>Search</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfiloUtente')}>
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

      <View style={styles.footerNav}>
        <FooterIcon icon="home-outline" screen="Home" />
        <FooterIcon icon="chatbubble-ellipses-outline" screen="Annunci" />
        <FooterIcon icon="notifications-outline" screen="Avvisi" />
      </View>
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
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

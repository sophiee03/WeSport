import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Avvisi() {
  const [filtro, setFiltro] = useState('Tutti');
  const [datiDB, setDatiDB] = useState([]);

  useEffect(() => {
    fetch('https://private-44d07-wesport2.apiary-mock.com/avvisi')
      .then((res) => res.json())
      .then((data) => {
        if (filtro === 'Tutti') {
          setDatiDB(data);
        } else {
          const filtrati = data.filter((item) => item.tipo === filtro);
          setDatiDB(filtrati);
        }
      })
      .catch((err) => {
        console.error('Errore durante la fetch:', err);
        setDatiDB([]);
      });
  }, [filtro]);

  const FiltroButton = ({ tipo }) => (
    <TouchableOpacity
      style={[styles.filtro, filtro === tipo && styles.filtroAttivo]}
      onPress={() => setFiltro(tipo)}
    >
      <Text style={styles.filtroTesto}>{tipo}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titolo}>{item.titolo}</Text>
      <Text style={styles.tipo}>{item.tipo} • {item.data}</Text>
      <Text>{item.descrizione}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventi, Avvisi e Novità </Text>
      <ScrollView horizontal style={styles.filtriContainer}>
        <FiltroButton tipo="Tutti" />
        <FiltroButton tipo="Evento" />
        <FiltroButton tipo="Avviso" />
        <FiltroButton tipo="Novità" />
      </ScrollView>
      <FlatList
        data={datiDB}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Nessun contenuto disponibile.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  filtriContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filtro: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filtroAttivo: {
    backgroundColor: '#007bff',
  },
  filtroTesto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  titolo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipo: {
    color: '#555',
    fontSize: 12,
    marginBottom: 8,
  },
});

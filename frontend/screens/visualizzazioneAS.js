import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import BarraSezioni from '../components/barraSezioni';

const BASE_URL = 'http://api.weSport.it/v1/sport/';

export default function CercaAreeSportive( route ) {
  const { sport } = route.params || {};
  const [datiDB, setDatiDB] = useState([]);
  const [query, setQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('Tutti');
  const [risultati, setRisultati] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!sport) return;
    
    fetch(`${BASE_URL}/${sport}`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella risposta");
        return res.json();
      })
      .then((data) => {
        setDatiDB(data);
        setRisultati(data);
        suggerisciCategoria();
      })
      .catch((error) => console.error('Errore nella fetch:', error));
  }, []);

  useEffect(() => {
    const filtra = () => {
      if (query) salvaRicerca(query);

      let filtrati = datiDB.filter((a) =>
        a.nome.toLowerCase().includes(query.toLowerCase()) ||
        a.sport.toLowerCase().includes(query.toLowerCase())
      );

      if (tipoFiltro !== 'Tutti') {
        filtrati = filtrati.filter((a) => a.tipo === tipoFiltro);
      }

      setRisultati(filtrati);
    };
    filtra();
  }, [query, tipoFiltro, datiDB]);


  const salvaRicerca = async (termine) => {
    if (!termine || termine.trim() === '') return;

    try {
      const storico = await AsyncStorage.getItem('ricerche');
      const ricerche = storico ? JSON.parse(storico) : {};

      ricerche[termine] = (ricerche[termine] || 0) + 1;

      await AsyncStorage.setItem('ricerche', JSON.stringify(ricerche));
    } catch (error) {
      console.error('Errore nel salvataggio ricerche:', error);
    }
  };

  const suggerisciCategoria = async () => {
    try {
      const storico = await AsyncStorage.getItem('ricerche');
      const ricerche = storico ? JSON.parse(storico) : {};

      const piuVisto = Object.entries(ricerche).sort((a, b) => b[1] - a[1])[0];

      if (piuVisto && piuVisto[0]) {
        setQuery(piuVisto[0]);
      }
    } catch (error) {
      console.error('Errore nel suggerimento categoria:', error);
    }
  };

  const FiltroButton = ({ tipo }) => (
    <TouchableOpacity
      style={[
        styles.filtro,
        tipoFiltro === tipo && styles.filtroAttivo,
      ]}
      onPress={() => setTipoFiltro(tipo)}
    >
      <Text style={[styles.filtroTesto, tipoFiltro !== tipo && {color: '#000'}]}>{tipo}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('visuaAreaSportiva', { areaSportiva: item })}
    >
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <Text>Sport: {item.sport}</Text>
      <Text>Indirizzo: {item.indirizzo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titolo}>Cerca Aree Sportive</Text>
      <TextInput
        placeholder="Cerca per nome o sport..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />
      <ScrollView horizontal style={styles.filtriContainer}>
        <FiltroButton tipo="Tutti" />
        <FiltroButton tipo="Pubblico" />
        <FiltroButton tipo="Privato" />
      </ScrollView>
      <FlatList
        data={risultati}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            Nessuna area trovata.
          </Text>
        }
      />
      <BarraSezioni/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  titolo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  filtriContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  filtro: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  filtroAttivo: {
    backgroundColor: '#007bff',
  },
  filtroTesto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

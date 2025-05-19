import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

useEffect(() => {
  fetch(' https://private-44d07-wesport2.apiary-mock.com')
    .then((res) => res.json()) // Converte la risposta in JSON
    .then((data) =>{
        setDatiDB(data);
        setRisultati(data);
    }) // Salva i dati nello stato e nel DB
    .catch((error) => console.error('Errore nella fetch:', error));
}, []);


export default function CercaAreeSportive() {
  const [datiDB, setDatiDB] = useState([]);
  const [query, setQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('Tutti');
  const [risultati, setRisultati] = useState([]);

  useEffect(() => {
    filtra();
  }, [query, tipoFiltro, datiDB]);

  const filtra = () => {
    let filtrati = datiDB.filter((a) =>
      a.nome.toLowerCase().includes(query.toLowerCase()) ||
      a.sport.toLowerCase().includes(query.toLowerCase())
    );

    if (tipoFiltro !== 'Tutti') {
      filtrati = filtrati.filter((a) => a.tipo === tipoFiltro);
    }

    setRisultati(filtrati);
  };

  const FiltroButton = ({ tipo }) => (
    <TouchableOpacity
      style={[
        styles.filtro,
        tipoFiltro === tipo && styles.filtroAttivo,
      ]}
      onPress={() => setTipoFiltro(tipo)}
    >
      <Text style={styles.filtroTesto}>{tipo}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <Text>Sport: {item.sport}</Text>
      <Text>Indirizzo: {item.indirizzo}</Text>
      {item.servizi.length > 0 && (
        <Text>Servizi: {item.servizi.join(', ')}</Text>
      )}
    </View>
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
    marginBottom: 16,
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

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import BarraSezioni from '../components/barraSezioni';

const BASE_URL = 'http://api.weSport.it/v1/Avvisi';

const categorie = ['Tutti', 'Evento', 'Chiusura/Manutenzione', 'Festival'];

export default function ListaAvvisi() {
  const [avvisi, setAvvisi] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    categorie.map(cat => ({ label: cat, value: cat }))
  );
  const [categoria, setCategoria] = useState('Tutti');
  const navigation = useNavigation();

  useEffect(() => {
    caricaAvvisi();
  }, []);

  const caricaAvvisi = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error('Errore nel caricamento degli avvisi');
      const data = await res.json();
      setAvvisi(data.items);
    } catch (err) {
      Alert.alert('Errore', 'Errore nel caricamento degli avvisi');
    }
  };

  const filtrati = categoria === 'Tutti'
    ? avvisi
    : avvisi.filter(a => a.categoria === categoria);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('visualizzaAvviso', { idAvviso: item.idAvviso })}
    >
      <View style={styles.rowTop}>
        <Text style={styles.categoria}>{item.categoria}</Text>
        <Text style={styles.data}>{new Date(item.data).toLocaleDateString()}</Text>
      </View>
      <View style={styles.rowBottom}>
        <Text style={styles.stato}>{item.stato}</Text>
        <Text numberOfLines={2} style={styles.testo}>{item.testo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avvisi</Text>

      <View style={{ zIndex: 1000, marginBottom: 12 }}>
      <DropDownPicker
        open={open}
        value={categoria}
        items={items}
        setOpen={setOpen}
        setValue={setCategoria}
        setItems={setItems}
        placeholder="Seleziona categoria"
        style={styles.dropdown}
        dropDownContainerStyle={{ borderColor: '#ccc' }}
      />
    </View>

      <FlatList
        data={filtrati}
        keyExtractor={(item) => item.idAvviso.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <BarraSezioni />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  filtroContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dropdown: {
    borderColor: '#ccc',
    height: 40,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  data: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  categoria: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  stato: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#007bff',
  },
});

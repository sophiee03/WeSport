import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'http://localhost:3000';
const token = 'INSERISCI_IL_TUO_TOKEN'; // Sostituisci con login reale

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export default function AnnunciScreen() {
  const [annunci, setAnnunci] = useState([]);
  const [titolo, setTitolo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const navigation = useNavigation();

  const caricaAnnunci = async () => {
    try {
      const res = await fetch(`${BASE_URL}/annuncio`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Errore caricamento annunci');
      const data = await res.json();
      setAnnunci(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Errore', 'Errore nel caricamento degli annunci');
    }
  };

  const iscrivitiAnnuncio = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/iscritti`, {
        method: 'POST',
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Iscrizione fallita');
      Alert.alert('Successo', 'Iscrizione effettuata');
      caricaAnnunci();
    } catch (err) {
      console.error(err);
      Alert.alert('Errore', "Errore nell'iscrizione");
    }
  };

  const disiscrivitiAnnuncio = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/iscritti`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Disiscrizione fallita');
      Alert.alert('Successo', 'Disiscrizione effettuata');
      caricaAnnunci();
    } catch (err) {
      console.error(err);
      Alert.alert('Errore', 'Errore nella disiscrizione');
    }
  };

  const creaAnnuncio = async () => {
    if (!titolo.trim() || !descrizione.trim()) {
      Alert.alert('Campi obbligatori', 'Inserisci titolo e descrizione');
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/annuncio`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ titolo, descrizione }),
      });
      if (!res.ok) throw new Error('Errore creazione');
      Alert.alert('Successo', 'Annuncio creato');
      setTitolo('');
      setDescrizione('');
      caricaAnnunci();
    } catch (err) {
      console.error(err);
      Alert.alert('Errore', 'Errore nella creazione annuncio');
    }
  };

  const vaiAllaChat = (idAnnuncio) => {
    navigation.navigate('Chat', { idAnnuncio });
  };

  useEffect(() => {
    caricaAnnunci();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Dettaglio', { id: item._id })}>
        <Text style={styles.titolo}>{item.titolo}</Text>
        <Text>{item.descrizione}</Text>
      </TouchableOpacity>
      <View style={styles.rigaBottoni}>
        <Button title="Iscriviti" onPress={() => iscrivitiAnnuncio(item._id)} />
        <Button title="Disiscriviti" onPress={() => disiscrivitiAnnuncio(item._id)} />
        <Button title="Chat" onPress={() => vaiAllaChat(item._id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crea nuovo annuncio</Text>
      <TextInput
        placeholder="Titolo"
        value={titolo}
        onChangeText={setTitolo}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrizione"
        value={descrizione}
        onChangeText={setDescrizione}
        style={styles.input}
      />
      <Button title="Crea Annuncio" onPress={creaAnnuncio} />
      <FlatList
        data={annunci}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  titolo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  rigaBottoni: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

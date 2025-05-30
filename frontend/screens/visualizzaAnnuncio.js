import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://api.weSport.it/v1/annunci';

export default function DettaglioAnnuncio({ route }) {
  const { idAnnuncio } = route.params;
  const [annuncio, setAnnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nomeutente, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUtente = await AsyncStorage.getItem('nomeutente'); // recupera l'ID dell'utente loggato
        setUserId(idUtente);

        const res = await fetch(`${BASE_URL}/${idAnnuncio}`);
        if (!res.ok) throw new Error('Annuncio non trovato');
        const data = await res.json();
        setAnnuncio(data);
      } catch (err) {
        Alert.alert('Errore', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!annuncio) {
    return (
      <View style={styles.loader}>
        <Text>Annuncio non trovato</Text>
      </View>
    );
  }

  //Nasconde l'annuncio se è pieno
  if (annuncio.iscritti.length >= annuncio.Npersone) {
    return (
      <View style={styles.loader}>
        <Text>Annuncio non più disponibile (posti esauriti)</Text>
      </View>
    );
  }

  const utenteIscritto = annuncio.iscritti.includes(userId);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titolo}>Dettaglio Annuncio</Text>

      <Text style={styles.label}>Categoria:</Text>
      <Text>{annuncio.categoria}</Text>

      <Text style={styles.label}>Numero di Persone:</Text>
      <Text>{annuncio.Npersone}</Text>

      <Text style={styles.label}>Descrizione:</Text>
      <Text>{annuncio.description}</Text>

      <Text style={styles.label}>Data e Orario:</Text>
      <Text>{new Date(annuncio.dataOrario).toLocaleString()}</Text>

      {utenteIscritto ? (
        <>
          <Text style={styles.label}>Iscritti:</Text>
          {annuncio.iscritti.length > 0 ? (
            annuncio.iscritti.map((idUtente, index) => (
              <Text key={index}>• {idUtente}</Text>
            ))
          ) : (
            <Text>Nessun iscritto</Text>
          )}
        </>
      ) : (
        <Text style={styles.note}>Iscritti visibili solo se sei iscritto</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titolo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  note: {
    marginTop: 15,
    fontStyle: 'italic',
    color: '#777',
  },
});

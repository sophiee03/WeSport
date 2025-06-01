import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getHeaders, isLoggedIn, getnomeutente } from '../utils/apiutils';
import BarraSezioni from '../components/barraSezioni';

const BASE_URL = 'http://api.weSport.it/v1/Annunci';

export default function VisualizzaAnnuncio() {
  const [annuncio, setAnnuncio] = useState(null);
  const [isIscritto, setIsIscritto] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const navigation = useNavigation();
  const { idAnnuncio } = route.params;

  const caricaAnnuncio = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${idAnnuncio}`);
      if (!res.ok) throw new Error('Errore caricamento annuncio');
      const data = await res.json();
      setAnnuncio(data);

      // verifica se utente è iscritto
      const iscritti = data.iscritti || [];
      const utente = await getnomeutente();
      const isUserIscritto = iscritti.includes(utente);
      setIsIscritto(isUserIscritto);
      setLoading(false);
    } catch (err) {
      console.error(err);
      Alert.alert('Errore', 'Errore nel caricamento');
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const logged = await isLoggedIn();
      setLoggedIn(logged);
      await caricaAnnuncio();
    };
    init();
  }, []);

  const gestisciIscrizione = async (azione) => {
    if (!isLoggedIn) {
      Alert.alert('Accesso richiesto', 'Devi essere loggato per iscriverti');
      navigation.navigate('LoginUI');
      return;
    }

    // Se annuncio completo blocca iscrizione
    if (
      azione === 'iscriviti' &&
      annuncio.iscritti.length >= annuncio.Npersone
    ) {
      Alert.alert('Annuncio completo', 'Non puoi iscriverti, annuncio pieno');
      return;
    }

    try {
      const metodo = azione === 'iscriviti' ? 'POST' : 'DELETE';
      const res = await fetch(`${BASE_URL}/${idAnnuncio}/iscritti`, {
        method: metodo,
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Errore nell\'iscrizione/disiscrizione');
      setIsIscritto(azione === 'iscriviti');

      // Aggiorna i dati dell'annuncio
      await caricaAnnuncio();

      Alert.alert(
        'Successo',
        azione === 'iscriviti' ? 'Iscrizione avvenuta con successo' : 'Disiscrizione avvenuta con successo!'
      );
    } catch (err) {
      console.error(err);
      Alert.alert('Errore', 'Operazione non riuscita');
    }
  };

  const vaiAllaChat = () => {
    if (!isIscritto) return;
    navigation.navigate('Chat', { idAnnuncio });
  };

  if (loading) return <Text style={styles.caricamento}>Caricamento...</Text>;
  if (!annuncio) return <Text style={styles.caricamento}>Annuncio non trovato</Text>;

  const iscrittiCount = annuncio.iscritti ? annuncio.iscritti.length : 0;
  const annuncioCompleto = iscrittiCount >= annuncio.Npersone;

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Torna agli annunci</Text>
      </TouchableOpacity>

      <Text style={styles.titolo}>Dettagli Annuncio</Text>

      <View style={styles.row}>
        <Text style={styles.capogruppo}>Capogruppo: {annuncio.idCapogruppo}</Text>
        <Text style={styles.categoria}>{annuncio.categoria}</Text>
      </View>

      <Text style={styles.descrizione}>{annuncio.descrizione}</Text>

      <View style={styles.row}>
        <Text style={styles.iscritti}>
          Iscritti: {iscrittiCount} / {annuncio.Npersone}
        </Text>
        <Text style={styles.data}>
          Data e ora: {new Date(annuncio.dataOrario).toLocaleString()}
        </Text>
      </View>

      <View style={styles.bottoni}>
        <Button
          title="Iscriviti"
          onPress={() => gestisciIscrizione('iscriviti')}
          disabled={!isLoggedIn || isIscritto || annuncioCompleto}
        />
        <Button
          title="Disiscriviti"
          onPress={() => gestisciIscrizione('disiscriviti')}
          disabled={!isLoggedIn || !isIscritto}
        />
      </View>

      <Button
        title="Vai alla chat"
        onPress={vaiAllaChat}
        disabled={!isLoggedIn || !isIscritto}
      />

      <BarraSezioni />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  backButton: { marginBottom: 12 },
  backText: { color: '#007bff', fontSize: 16 },
  titolo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  capogruppo: { fontSize: 16, fontWeight: '600' },
  categoria: { fontSize: 16, fontWeight: '600', color: '#007bff' },
  descrizione: { fontSize: 16, marginBottom: 12 },
  iscritti: { fontSize: 14, fontWeight: '500' },
  data: { fontSize: 14, fontWeight: '500', color: '#555' },
  bottoni: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  caricamento: { marginTop: 20, fontSize: 16, textAlign: 'center' },
});

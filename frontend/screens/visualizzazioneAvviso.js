import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import BarraSezioni from '../components/barraSezioni';

const BASE_URL = 'http://api.weSport.it/v1/Avvisi';

export default function VisualizzaAvviso() {
  const [avviso, setAvviso] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { idAvviso } = route.params;

  const caricaAvviso = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${idAvviso}`);
      if (!res.ok) throw new Error('Errore nel caricamento dell\'avviso');
      const data = await res.json();
      setAvviso(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      Alert.alert('Errore', 'Errore nel caricamento dell\'avviso');
      setLoading(false);
    }
  };

  useEffect(() => {
      caricaAvviso();
  }, []);

  if (loading) return <Text style={styles.caricamento}>Caricamento...</Text>;
  if (!avviso) return <Text style={styles.caricamento}>Avviso non trovato</Text>;

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Dettagli avviso</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.value}>{new Date(avviso.data).toLocaleDateString()}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.value}>{avviso.categoria}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Stato:</Text>
        <Text style={[styles.value, styles.stato]}>{avviso.stato}</Text>
      </View>

      <Text style={styles.testoLabel}>Descrizione:</Text>
      <Text style={styles.testo}>{avviso.testo}</Text>

      <BarraSezioni />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    width: 100,
    color: '#444',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  stato: {
    color: '#007bff',
    fontStyle: 'italic',
  },
  testoLabel: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },
  testo: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
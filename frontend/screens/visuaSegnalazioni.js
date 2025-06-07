import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../utils/path';

const StatusBadge = ({ stato }) => {
  let backgroundColor = '#ccc';
  let simbolo = '';
  switch (stato) {
    case 'accettato':
      backgroundColor = '#16A34A'; // verde
      break;
    case 'in attesa':
      backgroundColor = '#CA8A04'; // giallo
      break;
    case 'rifiutato':
      backgroundColor = '#DC2626'; // rosso
      break;
    default:
      backgroundColor = '#6B7280'; // grigio
      simbolo = '?';
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.badgeText}>{simbolo}</Text>
    </View>
  );
};

const ListaSegnalazioni = async () => {
  const [segnalazioni, setSegnalazioni] = useState([]);
  const navigation = useNavigation();
  const res = await fetch(`${BASE_URL}/${segnalazione}`);

  useEffect(() => {
    setSegnalazioni();
  }, []);

  const filtrate = (stato) => segnalazioni.filter(s => s.stato === stato);

  const renderSegnalazione = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <StatusBadge stato={item.stato} />
        <Text style={styles.cardTitle}>{item.luogo}</Text>
      </View>
      <Text>{item.descrizione}</Text>
      <Text style={styles.data}>{item.data}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title=" Nuova Segnalazione"
        onPress={() => navigation.navigate('moduloSegnalazione')}
        color="#1E40AF"
      />

      <Text style={styles.sectionTitle}>In Attesa</Text>
      <FlatList
        data={filtrate('in attesa')}
        keyExtractor={item => item.id}
        renderItem={renderSegnalazione}
        ListEmptyComponent={<Text style={styles.empty}>Nessuna segnalazione in attesa</Text>}
      />

      <Text style={styles.sectionTitle}>Accettate</Text>
      <FlatList
        data={filtrate('accettato')}
        keyExtractor={item => item.id}
        renderItem={renderSegnalazione}
        ListEmptyComponent={<Text style={styles.empty}>Nessuna segnalazione accettata</Text>}
      />

      <Text style={styles.sectionTitle}>Rifiutate</Text>
      <FlatList
        data={filtrate('rifiutato')}
        keyExtractor={item => item.id}
        renderItem={renderSegnalazione}
        ListEmptyComponent={<Text style={styles.empty}>Nessuna segnalazione rifiutata</Text>}
      />
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#1E293B',
  },
  card: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: '#111827',
  },
  data: {
    marginTop: 5,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  empty: {
    fontStyle: 'italic',
    color: '#9CA3AF',
    marginBottom: 10,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ListaSegnalazioni;


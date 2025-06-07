import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BarraSezioni from '../components/barraSezioni';
import { BASE_URL } from '../utils/path';

export default function VisuaAreaSportiva({ areaSportiva }) {
  const navigation = useNavigation();

  const mediaVoti = areaSportiva.numerovoti > 0
    ? (areaSportiva.voti.reduce((a, b) => a + b, 0) / areaSportiva.numerovoti).toFixed(1)
    : "Nessun voto";

  return (
    <View style={styles.container}>
        <View style={{ marginTop: 20 }}>
            <Button
            title="Torna indietro"
            onPress={() => navigation.goBack()}
            />
        </View>
      <Text style={styles.title}>{areaSportiva.nome}</Text>
      <Text style={styles.subtitle}>Zona: {areaSportiva.zona}</Text>

      <Text style={styles.label}>Categorie sportive:</Text>
      <FlatList
        data={areaSportiva.categoria}
        keyExtractor={(item, index) => item.nome + index}
        renderItem={({ item }) => <Text style={styles.item}>- {item.nome}</Text>}
      />

      <Text style={styles.label}>Descrizione:</Text>
      <Text style={styles.description}>{areaSportiva.selfDescription}</Text>

      <Text style={styles.label}>Area privata:</Text>
      <Text>{areaSportiva.privata ? "Sì" : "No"}</Text>

      <Text style={styles.label}>Recensione:</Text>
      <Text>{areaSportiva.mediaVoti}</Text>

      <BarraSezioni />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
  },
  item: {
    fontSize: 16,
    marginLeft: 10,
  },
  description: {
    fontStyle: 'italic',
  },
});

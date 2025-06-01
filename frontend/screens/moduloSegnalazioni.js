import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Segnalazione = () => {
  const [formData, setFormData] = useState({
    data: '2025-05-25',
    luogo: 'Canova',
    descrizione: 'Ramo in mezzo al campo',
    stato: 'in attesa',
    idUtente: 'utente123',
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://api.weSport.it/segnalazione/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Successo', 'Segnalazione inviata con successo!');
        setFormData({ data: '', luogo: '', descrizione: '', stato: 'in attesa', idUtente: '12345' });
      } else {
        Alert.alert('Errore', 'Errore durante l\'invio della segnalazione, riprovare.');
      }
    } catch (error) {
      console.error('Errore:', error);
      Alert.alert('Errore', 'Errore durante l\'invio della segnalazione, riprovare.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invia una Segnalazione</Text>

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        value={formData.data}
        onChangeText={value => handleChange('data', value)}
        placeholder="AAAA-MM-GG"
      />

      <Text style={styles.label}>Luogo</Text>
      <TextInput
        style={styles.input}
        value={formData.luogo}
        onChangeText={value => handleChange('luogo', value)}
        placeholder="Inserisci il luogo"
      />

      <Text style={styles.label}>Descrizione</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={formData.descrizione}
        onChangeText={value => handleChange('descrizione', value)}
        placeholder="Descrivi il problema"
        multiline
      />

      <Button title="Invia" onPress={handleSubmit} color="#1E40AF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E40AF',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
});

export default Segnalazione;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getnomeutente } from '../utils/apiutils'; 
import BarraSezioni from '../components/barraSezioni';
import * as ImagePicker from 'expo-image-picker';

const Segnalazione = async () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    data: '',
    luogo: '',
    descrizione: '',
    stato: 'in attesa',
    nomeutente: await getnomeutente(),
    immagine: '',
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permesso necessario', 'Permesso per accedere alla galleria è richiesto!');
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        base64: true,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://api.weSport.it/segnalazione', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        if (image) {
        // Invio immagine con nome, tipo e uri
        formData.append('foto', {
          uri: image.uri,
          name: 'foto.jpg',
          type: 'image/jpeg',
        });
      }
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

      <Button title="Scegli foto" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

      <Button title="Invia" onPress={handleSubmit} color="#1E40AF" />

      <BarraSezioni />

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
  imagePreview: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default Segnalazione;

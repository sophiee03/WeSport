import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Slider, TouchableOpacity, Image, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const BASE_URL = 'http://api.weSport.it/v1/sport/{sport}/percorso'; 

export default function CreazionePercorso({ navigation, route }) {
  const categoriaParam = route.params?.categoria || '';

  const [open, setOpen] = useState(false);
  const [categoria, setCategoria] = useState(categoriaParam);
  const [items, setItems] = useState([
    { label: 'Corsa', value: 'corsa' },
    { label: 'Trekking', value: 'trekking' },
    { label: 'Ciclismo', value: 'ciclismo' },
  ]);
  const [difficolta, setDifficolta] = useState(3);
  const [durata, setDurata] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      Alert.alert('Accesso negato', 'Devi effettuare il login per creare un percorso.');
      navigation.navigate('LoginUI'); // o altra schermata di login
    }
  }, [navigation]);

  // Funzione per scegliere immagine dal dispositivo
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

  const submitPercorso = async () => {
    if (!categoria || descrizione.length < 20 || descrizione.length > 500) {
      Alert.alert('Errore', 'Categoria obbligatoria e descrizione deve essere tra 20 e 500 caratteri.');
      return;
    }

    try {
      // Creiamo FormData per inviare anche immagine (multipart/form-data)
      const formData = new FormData();
      formData.append('categoria', categoria);
      formData.append('difficolta', difficolta.toString());
      formData.append('durata', durata);
      formData.append('descrizione', descrizione);
      if (image) {
        // Invio immagine con nome, tipo e uri
        formData.append('foto', {
          uri: image.uri,
          name: 'foto.jpg',
          type: 'image/jpeg',
        });
      }

      const res = await fetch(`${BASE_URL}/percorsi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Errore nel salvataggio del percorso');

      Alert.alert('Successo', 'Percorso creato!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Errore', err.message);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Categoria (obbligatoria):</Text>
      <DropDownPicker
        open={open}
        value={categoria}
        items={items}
        setOpen={setOpen}
        setValue={setCategoria}
        setItems={setItems}
        containerStyle={{ marginTop: 5, marginBottom: 10 }}
        zIndex={1000}
      />

      <Text style={styles.label}>Difficoltà: {difficolta}</Text>
      <Slider
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={difficolta}
        onValueChange={setDifficolta}
        style={{ width: '100%', height: 40 }}
      />

      <Text style={styles.label}>Durata (minuti):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={durata}
        onChangeText={setDurata}
        placeholder="Durata in minuti"
      />

      <Text style={styles.label}>Descrizione (obbligatoria):</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={descrizione}
        onChangeText={setDescrizione}
        maxLength={500}
        placeholder="Descrivi il percorso (min 20 caratteri)"
      />
      <Text>{descrizione.length} / 500</Text>

      <Button title="Scegli foto" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

      <View style={{ marginTop: 20 }}>
        <Button title="Crea Percorso" onPress={submitPercorso} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    marginTop: 5,
  },
  imagePreview: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});

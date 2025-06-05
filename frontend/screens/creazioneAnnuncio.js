import React, { useState } from 'react';
import { View, Text, Picker, Slider, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isLoggedIn, getnomeutente } from '../utils/apiutils'; 
import BarraSezioni from '../components/barraSezioni';

const BASE_URL = 'http://api.weSport.it/v1/Annunci';
const categorie = ['Tutti', 'calcio', 'basket', 'corsa', 'padel', 'tennis', 'trekking', 'pallavolo/beachvolley', 'nuoto'];

const MAX_PERSONE = 15;

export default function CreaAnnuncio() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();

  const [categoria, setCategoria] = useState(null);
  const [Npersone, setNpersone] = useState(1);
  const [descrizione, setDescrizione] = useState('');
  const [data, setData] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Gestione selezione data
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const newDate = data ? new Date(data) : new Date();
      newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setData(newDate);
    }
  };

  // Gestione selezione ora
  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const newDate = data ? new Date(data) : new Date();
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setData(newDate);
    }
  };

  const validaCampi = () => {
    if (!categoria) {
      Alert.alert('Errore', 'Seleziona una categoria');
      return false;
    }
    if (Npersone < 1 || Npersone > MAX_PERSONE) {
      Alert.alert('Errore', `Numero persone deve essere tra 1 e ${MAX_PERSONE}`);
      return false;
    }
    if (descrizione.length < 20 || descrizione.length > 500) {
      Alert.alert('Errore', 'Descrizione deve essere tra 20 e 500 caratteri');
      return false;
    }
    return true;
  };

  const creaAnnuncio = async () => {
    if (!loggedIn) {
    Alert.alert('Errore', 'Devi essere loggato per creare un annuncio');
    navigation.navigate('LoginUI');
    return;
  }
  if (!validaCampi()) return;
  
  const nuovoAnnuncio = {
      idCapogruppo: await getnomeutente(),
      categoria,
      Npersone,
      descrizione,
      dataOrario: data ? data.toISOString() : null,
      visibilita: true,
    };

    try {
      const headers = await getHeaders();
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(nuovoAnnuncio),
      });

      if (!res.ok) throw new Error('Errore nella creazione dell\'annuncio');
      const annuncioCreato = await res.json();

      Alert.alert('Successo', 'Annuncio creato con successo');
      navigation.navigate('VisualizzaAnnuncio', { idAnnuncio: annuncioCreato.idAnnuncio });
    } catch (error) {
      console.error(error);
      Alert.alert('Errore', 'Errore durante la creazione dell\'annuncio');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18 }}>← Indietro</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Crea Annuncio</Text>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Seleziona una categoria" value={null} />
          {categorie.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>


      <Text style={styles.label}>Numero persone: {Npersone}</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={MAX_PERSONE}
        step={1}
        value={Npersone}
        onValueChange={(value) => setNpersone(value)}
        minimumTrackTintColor="#3498db"
        maximumTrackTintColor="#ccc"
      />


      <Text style={styles.label}>Descrizione</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={descrizione}
        onChangeText={setDescrizione}
        maxLength={500}
      />

      <Text style={styles.label}>Data (opzionale)</Text>
      <Button
        title={data ? data.toLocaleDateString() : 'Seleziona una data (opzionale)'}
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={data || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Ora (opzionale)</Text>
      <Button
        title={data ? data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Seleziona un orario (opzionale)'}
        onPress={() => setShowTimePicker(true)}
      />
      {showTimePicker && (
        <DateTimePicker
          value={data || new Date()}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      <View style={styles.creaButton}>
        <Button title="CREA" onPress={creaAnnuncio} />
      </View>

      <BarraSezioni />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: 'white' },
  backButton: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 8,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginBottom: 10,
  },
  creaButton: { marginTop: 20 },
});

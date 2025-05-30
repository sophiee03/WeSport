import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ChatScreen() {
  const route = useRoute();
  const { idAnnuncio } = route.params;
  const [messaggi, setMessaggi] = useState([]);
  const [testo, setTesto] = useState('');
  const flatListRef = useRef();

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

 useEffect(() => {
    const caricaMessaggi = async () => {
      try {
        const res = await fetch(`/chat/${idAnnuncio}/messaggi`, {
          headers: getHeaders(),
        });
        const data = await res.json();
        setMessaggi(data.reverse());
      } catch (err) {
        console.error('Errore caricamento messaggi:', err);
      }
    };

    const caricaAnnuncio = async () => {
      try {
        const res = await fetch(`/annuncio/${idAnnuncio}`, {
          headers: getHeaders(),
        });
        const data = await res.json();
        setAnnuncioInfo(data);
      } catch (err) {
        console.error('Errore caricamento annuncio:', err);
      }
    };

    caricaMessaggi();
    caricaAnnuncio();
  }, [idAnnuncio]);

  const inviaMessaggio = async () => {
    if (!testo.trim()) return;
    try {
      await fetch(`/chat/${idAnnuncio}/messaggi`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ testo }),
      });
      setTesto('');

      const res = await fetch(`/chat/${idAnnuncio}/messaggi`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      setMessaggi(data.reverse());
    } catch (err) {
      console.error('Errore invio messaggio:', err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messaggio}>
      <Text>{item.testo}</Text>
      <Text style={styles.orario}>{
        new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
       {annuncioInfo && (
        <View style={styles.banner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View>
            <Text style={styles.titoloAnnuncio}>{annuncioInfo.titolo}</Text>
            <Text>Partecipanti: {annuncioInfo.iscritti?.length || 0}</Text>
            <Text>Orario: {new Date(annuncioInfo.dataOrario).toLocaleString()}</Text>
          </View>
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={messaggi}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listaMessaggi}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.boxInput}>
        <TextInput
          style={styles.input}
          placeholder="Scrivi un messaggio..."
          value={testo}
          onChangeText={setTesto}
        />
        <TouchableOpacity onPress={inviaMessaggio} style={styles.bottoneInvia}>
          <Text style={{ color: 'white' }}>Invia</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listaMessaggi: {
    padding: 12,
  },
  messaggio: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  orario: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  boxInput: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  bottoneInvia: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  banner: {
  padding: 12,
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderColor: '#ccc',
},
titoloAnnuncio: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 4,
},
backButton: {
  paddingRight: 10,
  justifyContent: 'center',
}


});
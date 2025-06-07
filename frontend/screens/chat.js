import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getHeaders, getnomeutente } from '../utils/apiutils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BarraSezioni from '../components/barraSezioni';
import Messaggio from '../components/messaggio.js';
import { BASE_URL } from '../utils/path';

export default function ChatScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { idAnnuncio } = route.params;

  const [messaggi, setMessaggi] = useState([]);
  const [testo, setTesto] = useState('');
  const [idChat, setIdChat] = useState(null);
  const [nomeUtente, setNomeUtente] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    const inizializzaChat = async () => {
      try {
        const headers = await getHeaders();
        const resChat = await fetch(`${BASE_URL}/${idAnnuncio}/chat`, { headers });

        if (!resChat.ok) throw new Error('Errore nel recupero della chat');
        const chatData = await resChat.json();
        setIdChat(chatData.idChat);

        const resMessaggi = await fetch(`${BASE_URL}/${idAnnuncio}/chat/${chatData.idChat}/messaggi`, { headers });
        const dataMessaggi = await resMessaggi.json();

        //ordina i messaggi
        setMessaggi(
          [...dataMessaggi].sort((a, b) => new Date(a.data) - new Date(b.data))
        );

        const nome = await getnomeutente();
        setNomeUtente(nome || '');
      } catch (err) {
        console.error('Errore caricamento chat o messaggi:', err);
      }
    };
      inizializzaChat();
  }, [idAnnuncio]);

  const inviaMessaggio = async () => {
    if (!testo.trim() || !idChat) return;

    try {
      const nuovoMessaggio = {
        testo,
        mittente: nomeUtente,
        data: new Date().toISOString()
      };

      const headers = await getHeaders();

      await fetch(`${BASE_URL}/${idAnnuncio}/chat/${idChat}/messaggi`, {
        method: 'POST',
        headers,
        body: JSON.stringify(nuovoMessaggio),
      });

      setMessaggi((prev) => [...prev, nuovoMessaggio]);
      setTesto('');
      Keyboard.dismiss();

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.error('Errore invio messaggio:', err);
    }
  };

  const renderItem = ({ item }) => (
    <Messaggio
      testo={item.testo}
      mittente={item.mittente}
      èUtente={item.mittente === nomeUtente}
      data={item.data}
    />
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messaggi}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listaMessaggi}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
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

      <BarraSezioni />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    paddingRight: 12,
    paddingLeft: 4,
  },
  listaMessaggi: {
    padding: 12,
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
});
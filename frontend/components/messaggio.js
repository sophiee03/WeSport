import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Messaggio({ testo, mittente, èUtente, data }) {
  return (
    <View
      style={[
        styles.messaggio,
        èUtente ? styles.messaggioUtente : styles.messaggioAltro,
      ]}
    >
    {!èUtente && <Text style={styles.nomeMittente}>{mittente}</Text>}
      <Text style={styles.testoMessaggio}>{testo}</Text>
      <Text style={styles.orario}>
        {new Date(data).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messaggio: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  messaggioUtente: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-end',
  },
  messaggioAltro: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  nomeMittente: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  testoMessaggio: {
    fontSize: 16,
  },
  orario: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
});

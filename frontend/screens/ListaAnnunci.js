import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, Button, Provider } from 'react-native-paper';
import BarraSezioni from '../components/barraSezioni';
import { isLoggedIn } from '../utils/apiutils'; 

const BASE_URL = 'http://api.weSport.it/v1/Annunci';

const categorie = ['Tutti', 'calcio', 'basket', 'corsa', 'padel', 'tennis', 'trekking', 'pallavolo/beachvolley', 'nuoto'];

export default function AnnunciScreen() {
  const [annunci, setAnnunci] = useState([]);
  const [categoria, setCategoriaFiltro] = useState('Tutti');
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const init = async () => {
      const logged = await isLoggedIn();
      setLoggedIn(logged);
      caricaAnnunci();
    };
    init();
  }, []);


  const caricaAnnunci = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error('Errore caricamento annunci');
      const data = await res.json();
      setAnnunci(data);
    } catch (err) {
      Alert.alert('Errore', 'Errore nel caricamento degli annunci');
    }
  };

  const filtrati = categoria === 'Tutti'
    ? annunci
    : annunci.filter(a => a.categoria === categoria);

  const renderItem = ({ item }) => {
    const numIscritti = item.iscritti?.length || 0;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('visualizzaAnnuncio', { idAnnuncio: item.idAnnuncio })
        }
      >
        <View style={styles.rigaTop}>
          <Text style={styles.creatore}>{item.idCapogruppo}</Text>
          <Text style={styles.categoria}>{item.categoria}</Text>
        </View>
        <View style={styles.rigaBottom}>
          <Text numberOfLines={2} style={styles.descrizione}>
            {item.descrizione}
          </Text>
          <Text style={styles.nPersone}>
            {numIscritti}/{item.Npersone}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <View>
      <View style={styles.container}>
        <Text style={styles.title}>Annunci</Text>

        <TouchableOpacity
          style={[styles.addButton, !loggedIn && styles.addButtonDisabled]}
          onPress={() => {
            if (!loggedIn) {
              Alert.alert('Accesso richiesto', 'Devi essere loggato per creare un annuncio');
              navigation.navigate('LoginUI');
              return;
            }
            navigation.navigate('CreaAnnuncio');
          }}
          disabled={!loggedIn}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, !loggedIn && styles.addButtonDisabled]}
          onPress={async () => {
            const nomeutente = await getnomeutente();
            if (!nomeutente) {
              Alert.alert('Errore', 'Impossibile recuperare il nome utente');
              return;
            }
            const miei = annunci.filter(a => a.idCapogruppo === nomeutente);
            setCategoriaFiltro('Tutti'); // resetta eventuali altri filtri
            setAnnunci(miei);
          }}
        >
          <Text style={styles.myAdsButtonText}>I miei annunci</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtroContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                Categoria: {categoria}
              </Button>
            }
          >
            {categorie.map(cat => (
              <Menu.Item key={cat} onPress={() => { setCategoria(cat); setMenuVisible(false); }} title={cat} />
            ))}
          </Menu>
        </View>

        <FlatList
          data={filtrati}
          keyExtractor={(item) => item.idAvviso.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        <BarraSezioni />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: 'white', fontSize: 24, lineHeight: 24 },
  filtroContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  rigaTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  creatore: {
    fontWeight: '600',
    fontSize: 16,
  },
  data: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  categoria: {
    fontWeight: '600',
    fontSize: 14,
    color: '#666',
  },
  rigaBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  descrizione: {
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
  nPersone: {
    fontWeight: '600',
    fontSize: 14,
    color: '#444',
  },
});

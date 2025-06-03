import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BarraSezioni from '../components/barraSezioni'
import { getnomeutente } from '../utils/apiutils'

const BASE_URL = 'http://api.weSport.it/v1/';

export default function ProfiloUtente() {
  const navigation = useNavigation();
  const [utente, setUtente] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageByPoints = (p) => {
    if (p >= 85) {
      return 'https://img.freepik.com/premium-vector/oak-icon-green-forest-tree-nature-symbol_53562-20987.jpg'; // albero grande
    } else if (p >= 45) {
      return 'https://cdn-icons-png.flaticon.com/512/4147/4147953.png'; // piantina media
    } else {
      return 'https://cdn-icons-png.flaticon.com/512/2227/2227504.png'; // seme piccolo
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const nomeutente = await getnomeutente();
        if (!nomeutente) {
          Alert.alert('Errore', 'Nome utente non disponibile');
          setLoading(false);
          return;
        }
        const response = await fetch(`${BASE_URL}/utenteregistrato/${nomeutente}`);
        if (!response.ok) throw new Error('Errore nella risposta');
        const data = await response.json();
        setUtente(data);
      } catch (error) {
        Alert.alert('Errore', 'Impossibile caricare i dati utente');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const formatDate = (iso) => new Date(iso).toLocaleDateString('it-IT');

  // Funzione logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler fare logout?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Esci',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['token', 'nomeutente']);
              navigation.replace('HomePage');
            } catch (error) {
              Alert.alert('Errore', 'Impossibile effettuare logout');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Caricamento in corso...</Text>
      </View>
    );
  }

  if (!utente) {
    return (
      <View style={styles.centered}>
        <Text>Nessun dato disponibile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>WeSport</Text>


        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* PROFILO */}
      <View style={styles.profileRow}>
        <Image source={{ uri: utente.fotoprofilo || 'https://via.placeholder.com/90' }} style={styles.foto} />
        <View style={styles.profileInfo}>
          <Text style={styles.usernameLarge}>{utente.username}</Text>
        <Text style={styles.interestsDescription}>
          {Array.isArray(utente.interessi) ? utente.interessi.join(', ') : 'Nessun interesse specificato'}
        </Text>
        </View>
      </View>

      {/* BARRA CIRCOLARE */}
      <View style={styles.pointsCircleContainer}>
        <AnimatedCircularProgress
          size={140}
          width={12}
          fill={utente.punti} // % di completamento (max 100)
          tintColor="#4CAF50"
          backgroundColor="#ddd"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.centerImageWrapper}>
              <Image source={{ uri: getImageByPoints(utente.punti) }} style={styles.plantCenterImage} />
              <Text style={styles.pointsText}>{utente.punti} punti</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* SEGNALAZIONI */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('moduloSegnalazioni')} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>CREA SEGNALAZIONE</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Le mie Segnalazioni</Text>
        {utente.segnalazioni?.length > 0 ? (
          utente.segnalazioni.map((item) => (
            <TouchableOpacity
              key={item.idSegnalazione}
              style={styles.card}
              onPress={() => navigation.navigate('visualizzaSegnalazione', { segnalazione: item.idSegnalazione })}
            >
              <Text style={styles.cardTitle}>{formatDate(item.data)}</Text>
              <Text numberOfLines={2} style={styles.cardDescription}>{item.descrizione}</Text>
              <Text style={[styles.stato, item.stato === 'Refused' && styles.refused]}>{item.stato}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>Nessuna segnalazione effettuata</Text>
        )}
      </View>

      {/* PERCORSI CONSIGLIATI */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Percorsi Consigliati</Text>
        {utente.percorsi?.length > 0 ? (
          utente.percorsi.map((item) => (
            <TouchableOpacity
              key={item.idPercorso}
              style={styles.card}
              onPress={() => navigation.navigate('visualizzaPercorso', { percorso: item.idPercorso })}
            >
              <Text style={styles.cardTitle}>{item.categoria}</Text>
              <Text numberOfLines={2} style={styles.cardDescription}>{item.selfDescrizione}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>Nessun percorso consigliato</Text>
        )}
      </View>

      <BarraSezioni />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  usernameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  interestsDescription: {
    fontSize: 14,
    color: '#666',
  },
  pointsCircleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pointsCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plantCenterImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  pointsText: {
    position: 'absolute',
    bottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#999',
  },
  stato: {
    marginTop: 6,
    fontWeight: 'bold',
  },
  refused: {
    color: 'red',
  },
});
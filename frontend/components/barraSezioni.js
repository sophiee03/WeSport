import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BarraSezioni = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const buttons = [
    { icon: 'home-outline', screen: 'HomePage' },
    { icon: 'chatbubble-ellipses-outline', screen: 'ListaAnnunci' },
    { icon: 'notifications-outline', screen: 'ListaAvvisi' },
  ];

  return (
    <View style={styles.footerNav}>
      {buttons.map(({ icon, screen }) => (
        <TouchableOpacity
          key={screen}
          style={styles.button}
          onPress={() => navigation.navigate(screen)}
        >
          <Ionicons
            name={icon}
            size={28}
            color={route.name === screen ? '#007bff' : '#666'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footerNav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
});

export default BarraSezioni;

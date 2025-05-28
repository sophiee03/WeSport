//file principale dell'app

import React from 'react';
import { View, Text } from 'react-native';
import CercaAreeSportive from './components/AreaSportiva'; // o screens/CercaAree

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <CercaAreeSportive />
    </View>
  );
}

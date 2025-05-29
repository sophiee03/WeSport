//per il routing
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import visualizzazioneAS from '../screens/visualizzazioneAS'; // importa i file JS
import HomePage from '../screens/HomePage';
import ProfiloUtente from '../screens/ProfiloUtente';
import Annunci from '../screens/Annunci';
import Avvisi from '../screens/Avvisi';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="AreeSportive" component={visualizzazioneAS} />
      <Stack.Screen name="ProfiloUtente" component={ProfiloUtente} />
      <Stack.Screen name="Annunci" component={Annunci} />
      <Stack.Screen name="Avvisi" component={Avvisi} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

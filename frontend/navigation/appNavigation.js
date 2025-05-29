//per il routing
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginUI from '../screens/LoginUI';
import VisualizzazioneAS from '../components/visualizzazioneAS'; // importa il file JS

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="visualizzazioneAS">
      <Stack.Screen name="Login" component={LoginUI} />
      <Stack.Screen name="VisualizzazioneAS" component={VisualizzazioneAS} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

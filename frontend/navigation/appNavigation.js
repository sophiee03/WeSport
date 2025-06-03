//per il routing
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// importa i file JS
import visualizzazioneAS from '../screens/visualizzazioneAS'; 
import LoginUI from '../screens/LoginUI';
import HomePage from '../screens/HomePage';
import ProfiloUtente from '../screens/ProfiloUtente';
import ListaAnnunci from '../screens/ListaAnnunci';
import visualizzazioneAnnuncio from '../screens/visualizzazioneAnnuncio';
import creazioneAnnuncio from '../screens/creazioneAnnuncio';
import chat from '../screens/chat';
import ListaAvvisi from '../screens/ListaAvvisi';
import ListaPercorsi from '../screens/ListaPercorsi';
import VisualizzazionePercorso from '../screens/visualizzazionePercorso';
import CreazionePercorso from '../screens/creazionePercorso';
import visualizzazioneAvviso from '../screens/visualizzazioneAvviso';
import visuaSegnalazioni from '../screens/visuaSeganalazioni';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="LoginUI" component={LoginUI} />
      <Stack.Screen name="AreeSportive" component={visualizzazioneAS} />
      <Stack.Screen name="ProfiloUtente" component={ProfiloUtente} />
      <Stack.Screen name="ListaAnnunci" component={ListaAnnunci} />
      <Stack.Screen name="visualizzazioneAnnuncio" component={visualizzazioneAnnuncio} />
      <Stack.Screen name="creazioneAnnuncio" component={creazioneAnnuncio} />
      <Stack.Screen name="chat" component={chat} />
      <Stack.Screen name="ListaAvvisi" component={ListaAvvisi} />
      <Stack.Screen name="visualizzazioneAvviso" component={visualizzazioneAvviso} />
      <Stack.Screen name="ListaPercorsi" component={ListaPercorsi} />
      <Stack.Screen name="VisualizzazionePercorso" component={VisualizzazionePercorso} /> 
      <Stack.Screen name="visuaSegnalazioni" component={visuaSegnalazioni} />
      <Stack.Screen name="creazionePercorso" component={CreazionePercorso} /> 
      
    </Stack.Navigator>
  );
};

export default AppNavigation;

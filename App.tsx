import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PokemonListScreen from './PokemonListScreen';
import PokemonDetailsScreen from './PokemonDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PokemonList" component={PokemonListScreen} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

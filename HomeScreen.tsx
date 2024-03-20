import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./imagenes/poke.jpg')}
        style={styles.imageTop}
      />
      <Button
        title="Iniciar Pokedex"
        onPress={() => navigation.navigate('PokemonList')}
        color="#0CBF2A" 
      />
      <Image
        source={require('./imagenes/Pokemon_fav.png')}
        style={styles.imageBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageTop: {
    marginVertical: 25,
    width: 275,
    height: 100,
  },
  imageBottom: {
    marginVertical: 20,
    width: 200,
    height: 200,
  },
});

export default HomeScreen;

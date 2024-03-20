import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';

const PokemonDetailsScreen = ({ route, navigation }) => {
  const { url } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderPokemonDetails = () => {
    if (!pokemonDetails) return null;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png` }}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{pokemonDetails.name}</Text>
          <View style={styles.attributesContainer}>
            <Text style={styles.info}>Pokédex #{pokemonDetails.id}</Text>
            <Text style={styles.info}>Altura: {pokemonDetails.height / 10} m</Text>
            <Text style={styles.info}>Peso: {pokemonDetails.weight / 10} kg</Text>
          </View>
          <View style={styles.abilitiesContainer}>
            <Text style={styles.title}>Habilidades</Text>
            <FlatList
              data={pokemonDetails.abilities}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.abilityContainer}>
                  <Text style={styles.ability}>{item.ability.name}</Text>
                </View>
              )}
            />
          </View>
        </View>
        <Button title="Poke-Regreso" onPress={handleGoBack} color="#0CBF2A" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPokemonDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  attributesContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  abilitiesContainer: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  abilityContainer: {
    marginBottom: 5,
  },
  ability: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PokemonDetailsScreen;

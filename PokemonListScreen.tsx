
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';

const PokemonListScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(nextPageUrl);
      const data = await response.json();
      setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
      setNextPageUrl(data.next);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer} 
      onPress={() => navigation.navigate('PokemonDetails', { url: item.url })}
    >
      <View style={styles.item}>
        <Image
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>Código: #{item.url.split('/')[6]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={fetchPokemons} 
        onEndReachedThreshold={0.1} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    borderRadius: 1000, 
    overflow: 'hidden', 
    margin: 2, 
    backgroundColor: '#67D8B6', 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 70,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', 
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', 
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center', 
  },
});

export default PokemonListScreen;

// screens/SearchPage.js
import MovieCard from "@/components/MovieCard";
import { searchMovies } from "@/services/tmdbApi";
import { Movie } from "@/types/Movies";
import React, { useState } from "react";
import { router } from "expo-router";

import { View, TextInput, FlatList, StyleSheet } from "react-native";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim()) {
      const searchResults = await searchMovies(query);
      setResults(searchResults);
    }
  };

  const handleOnPress = (movie: Movie) => {
    // navigate to movie details page
    return router.push(`/movie/${movie.id}`);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for movies..."
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => handleOnPress(item)} />
        )}
        keyExtractor={(item: Movie) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

import MovieCard from "@/components/MovieCard";
import { getPopularMovies } from "@/services/tmdbApi";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const popularMovies = await getPopularMovies();
    console.log(popularMovies);
    setMovies(popularMovies);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Movies</Text>
      {/* <AIRecommendation /> */}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

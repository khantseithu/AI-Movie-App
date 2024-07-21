import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRelatedMovies } from "@/services/tmdbApi";
import TopNavigation from "@/components/TopNavigation";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/Movies";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RelatedMoviesPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    fetchRelatedMovies();
  }, [id]);

  const fetchRelatedMovies = async () => {
    const movies = await getRelatedMovies(id);
    setRelatedMovies(movies);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TopNavigation
          title="Related Movies"
          onBackPress={() => router.back()}
        />
        <FlatList
          data={relatedMovies}
          renderItem={({ item }: { item: Movie }) => (
            <MovieCard
              movie={item}
              onPress={() => router.push(`/movie/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.movieList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  movieList: {
    padding: 10,
  },
});

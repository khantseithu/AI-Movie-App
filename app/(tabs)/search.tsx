// screens/SearchPage.js
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies, searchMovies } from "@/services/tmdbApi";
import { Movie } from "@/types/Movies";
import React, { useState } from "react";
import { router } from "expo-router";

import { View, TextInput, FlatList, StyleSheet, Text } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

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

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["popular", "movies"],
    queryFn: ({ pageParam = 1 }) => getTrendingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  if (isLoading && !isFetching) {
    return (
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Loading...
      </Text>
    );
  }

  if (isError) {
    return (
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        {error.message}
      </Text>
    );
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
        // if the user hasn't search, show trending movies, otherwise show search results
        data={
          query.trim() ? results : data?.pages.flatMap((page) => page) || []
        }
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            key={item.id}
            onPress={() => handleOnPress(item)}
          />
        )}
        keyExtractor={(item: Movie) => item.id.toString()}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <Text>Loading more...</Text> : null
        }
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

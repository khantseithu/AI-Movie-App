import MovieCard from "@/components/MovieCard";
import { getPopularMovies } from "@/services/tmdbApi";
import { Movie } from "@/types/Movies";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Home() {
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
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
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

  const handleOnPress = (movie: Movie) => {
    return router.push(`/movie/${movie.id}`);
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const movies = data?.pages.flatMap((page) => page) || [];
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => handleOnPress(item)} />
        )}
        keyExtractor={(item: any) => item?.id?.toString()}
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
    gap: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

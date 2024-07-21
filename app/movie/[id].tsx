// app/movie/[id].js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopNavigation from "@/components/TopNavigation";
import { getMovieCredits, getMovieDetails } from "@/services/tmdbApi";
import { MovieCredits, MovieDetails } from "@/types/Movies";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function MovieDetailsPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails>();
  const [credits, setCredits] = useState<MovieCredits>();
  const [watchStatus, setWatchStatus] = useState("Not Watched");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log(id);
    fetchMovieDetails();
    fetchMovieCredits();
    loadWatchStatus();
    loadFavoriteStatus();
  }, [id]);

  const fetchMovieDetails = async () => {
    const details = await getMovieDetails(id);
    setMovie(details);
  };

  const fetchMovieCredits = async () => {
    const movieCredits = await getMovieCredits(id);
    setCredits(movieCredits);
  };

  const loadWatchStatus = async () => {
    try {
      const status = await AsyncStorage.getItem(`watchStatus_${id}`);
      if (status !== null) {
        setWatchStatus(status);
      }
    } catch (error) {
      console.error("Error loading watch status:", error);
    }
  };

  const loadFavoriteStatus = async () => {
    try {
      const status = await AsyncStorage.getItem(`favorite_${id}`);
      setIsFavorite(status === "true");
    } catch (error) {
      console.error("Error loading favorite status:", error);
    }
  };

  const handleSetWatchStatus = async (status: any) => {
    setWatchStatus(status);
    try {
      await AsyncStorage.setItem(`watchStatus_${id}`, status);
    } catch (error) {
      console.error("Error saving watch status:", error);
    }
  };

  const handleToggleFavorite = async () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    try {
      await AsyncStorage.setItem(`favorite_${id}`, newStatus.toString());
    } catch (error) {
      console.error("Error saving favorite status:", error);
    }
  };

  const handleRelatedMovies = () => {
    // Navigate to a new page with related movies
    router.push(`/related-movies/${id}`);
  };

  if (!movie || !credits) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TopNavigation
        title={movie.title}
        onBackPress={() => router.back()}
        onFavoritePress={handleToggleFavorite}
        isFavorite={isFavorite}
        onMenuPress={handleRelatedMovies}
      />
      <ScrollView>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <Text style={styles.info}>Release Date: {movie.release_date}</Text>
          <Text style={styles.info}>Runtime: {movie.runtime} minutes</Text>
          <Text style={styles.info}>Rating: {movie.vote_average}/10</Text>
          <Text style={styles.sectionTitle}>Cast</Text>
          <ScrollView horizontal>
            {credits.cast.slice(0, 10).map((actor) => (
              <View key={actor.id} style={styles.actorContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}`,
                  }}
                  style={styles.actorImage}
                />
                <Text style={styles.actorName}>{actor.name}</Text>
                <Text style={styles.characterName}>{actor.character}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <FloatingActionButton
        onPress={() =>
          handleSetWatchStatus(
            watchStatus === "Watched" ? "Not Watched" : "Watched"
          )
        }
        icon={watchStatus === "Watched" ? "eye" : "eye-off"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  poster: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    marginBottom: 15,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  actorContainer: {
    marginRight: 15,
    alignItems: "center",
    width: 100,
  },
  actorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  actorName: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  characterName: {
    fontSize: 10,
    textAlign: "center",
    color: "gray",
  },
});

// components/TopNavigation.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TopNavigationProps {
  title: string;
  onBackPress: () => void;
  onFavoritePress: () => void;
  isFavorite: boolean;
  onMenuPress: () => void;
}

export default function TopNavigation({
  title,
  onBackPress,
  onFavoritePress,
  isFavorite,
  onMenuPress,
}: TopNavigationProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onFavoritePress} style={styles.iconButton}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  rightIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
});

import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { pb } from "@/services/pocketbase";
import { SessionProvider } from "@/context/ctx";

export default function AppLayout() {
  const isLoggedIn = false;
  console.log(pb.authStore.isValid);
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/sign-in"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/register"
            options={{ headerTitle: "Register" }}
          />
          <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="related-movies/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaProvider>
    </SessionProvider>
  );
}

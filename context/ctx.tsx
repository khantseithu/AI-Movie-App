import { useStorageState } from "@/hooks/useStorageState";
import { pb, signInUser } from "@/services/pocketbase";
import { useRouter } from "expo-router";
import { useContext, createContext, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          // Call the auth service to sign in the user
          // Set the session in the state
          const user = await signInUser({ email, password });
          setSession(JSON.stringify(user));
          if (pb.authStore.isValid) {
            router.push("/");
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

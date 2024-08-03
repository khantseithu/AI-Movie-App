import { FILEURI } from "@/constants/URI";
import { useSession } from "@/context/ctx";
import { getProfile } from "@/services/pocketbase";
import { UserInfo } from "@/types/Profile";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";

export default function UserProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/150",
  };

  const { session, signOut } = useSession();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!session) {
        return;
      }
      const userInfo = JSON.parse(session);
      // const userProfile = await getProfile(userInfo?.record?.id);
      // console.log("userProfile", userProfile);
      setUserInfo(userInfo?.record);
    };

    fetchUserProfile();
  }, [session]);

  return (
    <View style={styles.container}>
      {/* http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME */}
      <Image
        source={{
          uri:
            `${FILEURI}/${userInfo?.collectionId}/${userInfo?.id}/${userInfo?.avatar}` ||
            user.avatar,
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{userInfo?.name}</Text>
      <Text style={styles.email}>{userInfo?.email}</Text>

      {/* SIGN OUT */}
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          backgroundColor: "#f0f0f0",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});

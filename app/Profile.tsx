import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile: React.FC = () => {
  const router = useRouter();

  // 🔒 Block Android back button & gesture
  useFocusEffect(
  useCallback(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true // 🔒 block back button
    );

    return () => subscription.remove(); // ✅ correct cleanup
  }, [])
);


  // ✅ Read params passed from Login
  const { email, name } = useLocalSearchParams<{
    email?: string;
    name?: string;
  }>();

  const userName = name || "Demo User";
  const userEmail = email || "demo@user.com";

  const uid = "6774292257";
  const funFact = "Share a fun fact about yourself";
  const stats = [
    { label: "Subscribers", value: "5.7k" },
    { label: "Followers", value: "2.3k" },
    { label: "Connected", value: "4.9k" },
  ];

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.profileTitle}>Profile</Text>

        {/* Logout button */}
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.logoutIcon}>⎋</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userName[0]}</Text>
            </View>
            <TouchableOpacity style={styles.avatarAddBtn}>
              <Text style={styles.avatarAddText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.uid}>UID: {uid}</Text>
            <Text style={styles.email}>{userEmail}</Text>
          </View>
        </View>

        <Text style={styles.funFact}>{funFact}</Text>

        <View style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <View
              key={stat.label}
              style={[styles.statBox, idx === 1 && styles.statBoxMiddle]}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        {[1, 2, 3, 4].map((_, idx) => (
          <View key={idx} style={styles.bottomIcon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 48,
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  profileTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    color: "#fff",
    fontSize: 20,
  },
  profileCard: {
    backgroundColor: "#18181b",
    borderRadius: 24,
    padding: 24,
    width: "92%",
    shadowColor: "#b91c1c",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarOuter: {
    position: "relative",
    marginRight: 18,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#b91c1c",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  avatarAddBtn: {
    position: "absolute",
    right: -4,
    bottom: 2,
    backgroundColor: "#b91c1c",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#18181b",
  },
  avatarAddText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  uid: {
    color: "#b91c1c",
    fontSize: 13,
    fontWeight: "600",
  },
  email: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 2,
  },
  funFact: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 18,
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#232323",
    borderRadius: 14,
    marginHorizontal: 2,
  },
  statBoxMiddle: {
    marginHorizontal: 8,
  },
  statValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  statLabel: {
    color: "#b91c1c",
    fontSize: 13,
    fontWeight: "600",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 18,
    backgroundColor: "rgba(20,20,20,0.95)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    bottom: 0,
  },
  bottomIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#232323",
  },
});

export default Profile;

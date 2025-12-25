import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Animated, Dimensions, Pressable, ScrollView, Text, TextInput, View } from "react-native";


function LoginForm() {
  const { width } = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Demo credentials (use email)
  const demoAccounts = [
    { email: "goku@demo.com", password: "kamehameha", name: "Goku" },
    { email: "naruto@demo.com", password: "ramen", name: "Naruto" },
    { email: "luffy@demo.com", password: "onepiece", name: "Luffy" },
    { email: "eren@demo.com", password: "titan", name: "Eren" },
  ];


  const handleLogin = () => {
  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  const found = demoAccounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!found) {
    setError("Invalid credentials. Try a demo email and password below.");
    return;
  }

  setError("");

  router.replace({
    pathname: "/Profile",
    params: {
      email: found.email,
      name: found.name, // ✅ PASS NAME
    },
  });
};


  // For tap animation on demo cards
  // Removed unused pressedIdx state
  const [animVals] = useState(() => demoAccounts.map(() => new Animated.Value(1)));

  const handleDemoPress = (acc: { email: any; password: any; }, idx: number) => {
    // Removed setPressedIdx(idx);
    Animated.sequence([
      Animated.timing(animVals[idx], {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(animVals[idx], {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setEmail(acc.email);
      setPassword(acc.password);
      // Removed setPressedIdx(-1);
    });
  };

  return (
    <LinearGradient
      colors={["#141414", "#b91c1c"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
        <View
          style={{
            width: width > 500 ? 400 : width * 0.92,
            backgroundColor: "#141414",
            borderRadius: 24,
            paddingHorizontal: 32,
            paddingTop: 18,
            paddingBottom: 18,
            elevation: 12,
            shadowColor: '#b91c1c',
            shadowOpacity: 0.18,
            shadowRadius: 12,
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#b91c1c", textAlign: "center", marginBottom: 12, letterSpacing: 1 }}>
            Welcome back!
          </Text>
          <Text style={{ fontSize: 18, color: "#fff", textAlign: "center", marginBottom: 28 }}>
            Log in to manage your anime collection.
          </Text>
          <Text style={{ color: "#fff", marginBottom: 6, fontWeight: "600" }}>Email Address</Text>
          <TextInput
            style={{
              backgroundColor: "#232323",
              color: "#fff",
              borderRadius: 14,
              padding: 16,
              marginBottom: 18,
              fontSize: 16,
              borderWidth: 1.5,
              borderColor: "#b91c1c",
            }}
            placeholder="your@email.com"
            placeholderTextColor="#b91c1c"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={{ color: "#fff", marginBottom: 6, fontWeight: "600" }}>Password</Text>
          <View style={{ position: 'relative', marginBottom: 18 }}>
            <TextInput
              style={{
                backgroundColor: "#232323",
                color: "#fff",
                borderRadius: 14,
                padding: 16,
                fontSize: 16,
                borderWidth: 1.5,
                borderColor: "#b91c1c",
                paddingLeft: 44,
              }}
              placeholder="Password"
              placeholderTextColor="#b91c1c"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <MaterialIcons name="lock" size={22} color="#b91c1c" style={{ position: 'absolute', left: 14, top: 18 }} />
          </View>
          {error ? (
            <Text style={{ color: "#dc2626", textAlign: "center", marginBottom: 12, fontSize: 15 }}>{error}</Text>
          ) : null}
          <Pressable
            onPress={handleLogin}
            style={{
              backgroundColor: "#b91c1c",
              borderRadius: 14,
              paddingVertical: 14,
              alignItems: "center",
              marginBottom: 12,
              shadowColor: '#b91c1c',
              shadowOpacity: 0.18,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18, letterSpacing: 1 }}>Sign In <MaterialIcons name="arrow-forward" size={18} color="#fff" /></Text>
          </Pressable>
          {/* Demo accounts section */}
          <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 8, fontSize: 15, letterSpacing: 0.5 }}>DEMO ACCOUNTS</Text>
          <View style={{ gap: 8, marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <Animated.View
                style={{
                  backgroundColor: '#141414',
                  borderRadius: 8,
                  padding: 10,
                  flex: 1,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: '#b91c1c',
                  // shadow removed
                  transform: [{ scale: animVals[0] }],
                }}
              >
                <Pressable
                  onPress={() => handleDemoPress(demoAccounts[0], 0)}
                  android_ripple={{ color: '#b91c1c' }}
                  style={{ alignItems: 'flex-start' }}
                >
                  <Text style={{ color: '#b91c1c', fontWeight: 'bold' }}>{demoAccounts[0].email}</Text>
                  <Text style={{ color: '#d1d5db', fontSize: 12 }}>Dragon Ball Admin</Text>
                </Pressable>
              </Animated.View>
              <Animated.View
                style={{
                  backgroundColor: '#141414',
                  borderRadius: 8,
                  padding: 10,
                  flex: 1,
                  marginLeft: 8,
                  borderWidth: 1,
                  borderColor: '#b91c1c',
                  // shadow removed
                  transform: [{ scale: animVals[1] }],
                }}
              >
                <Pressable
                  onPress={() => handleDemoPress(demoAccounts[1], 1)}
                  android_ripple={{ color: '#b91c1c' }}
                  style={{ alignItems: 'flex-start' }}
                >
                  <Text style={{ color: '#b91c1c', fontWeight: 'bold' }}>{demoAccounts[1].email}</Text>
                  <Text style={{ color: '#d1d5db', fontSize: 12 }}>Konoha Admin</Text>
                </Pressable>
              </Animated.View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Animated.View
                style={{
                  backgroundColor: '#141414',
                  borderRadius: 8,
                  padding: 10,
                  flex: 1,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: '#b91c1c',
                  // shadow removed
                  transform: [{ scale: animVals[2] }],
                }}
              >
                <Pressable
                  onPress={() => handleDemoPress(demoAccounts[2], 2)}
                  android_ripple={{ color: '#b91c1c' }}
                  style={{ alignItems: 'flex-start' }}
                >
                  <Text style={{ color: '#b91c1c', fontWeight: 'bold' }}>{demoAccounts[2].email}</Text>
                  <Text style={{ color: '#d1d5db', fontSize: 12 }}>Straw Hat Admin</Text>
                </Pressable>
              </Animated.View>
              <Animated.View
                style={{
                  backgroundColor: '#141414',
                  borderRadius: 8,
                  padding: 10,
                  flex: 1,
                  marginLeft: 8,
                  borderWidth: 1,
                  borderColor: '#b91c1c',
                  // shadow removed
                  transform: [{ scale: animVals[3] }],
                }}
              >
                <Pressable
                  onPress={() => handleDemoPress(demoAccounts[3], 3)}
                  android_ripple={{ color: '#b91c1c' }}
                  style={{ alignItems: 'flex-start' }}
                >
                  <Text style={{ color: '#b91c1c', fontWeight: 'bold' }}>{demoAccounts[3].email}</Text>
                  <Text style={{ color: '#d1d5db', fontSize: 12 }}>Survey Corps Admin</Text>
                </Pressable>
              </Animated.View>
            </View>
          </View>
          <Pressable onPress={() => router.back()} style={{ alignItems: "center", marginTop: 12, marginBottom: 6 }}>
            <Text style={{ color: "#b91c1c", fontWeight: "bold", fontSize: 15 }}>Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default LoginForm;

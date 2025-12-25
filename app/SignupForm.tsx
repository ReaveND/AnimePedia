import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Floating label animation values
  const usernameLabelAnim = useRef(new Animated.Value(username ? 1 : 0)).current;
  const emailLabelAnim = useRef(new Animated.Value(email ? 1 : 0)).current;
  const passwordLabelAnim = useRef(new Animated.Value(password ? 1 : 0)).current;
  const confirmLabelAnim = useRef(new Animated.Value(confirmPassword ? 1 : 0)).current;

  const animateLabel = (anim, toValue) => {
    Animated.timing(anim, {
      toValue,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };
  const router = useRouter();

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // Add signup logic here
    router.replace("/Landing/home");
  };

  return (
    <LinearGradient
      colors={["#141414", "#b91c1c"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}
    >
      <View style={{ width: "100%", maxWidth: 400, backgroundColor: "#141414", borderRadius: 24, paddingHorizontal: 32, paddingTop: 18, paddingBottom: 18, elevation: 12, shadowColor: '#b91c1c', shadowOpacity: 0.18, shadowRadius: 12 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#b91c1c", textAlign: "center", marginBottom: 12, letterSpacing: 1 }}>
          Welcome!
        </Text>
        <Text style={{ fontSize: 18, color: "#fff", textAlign: "center", marginBottom: 28 }}>
          Create your account to join the anime community.
        </Text>
        <View style={{ marginBottom: 18 }}>
          <View style={{ position: 'relative' }}>
            <Animated.Text
              style={{
                position: 'absolute',
                left: 16,
                top: usernameLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [18, -8] }),
                fontSize: usernameLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 13] }),
                color: '#b91c1c',
                backgroundColor: usernameLabelAnim.interpolate({ inputRange: [0, 1], outputRange: ['transparent', '#18181b'] }),
                paddingHorizontal: usernameLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
                zIndex: 2,
              }}
            >
              Username
            </Animated.Text>
            <TextInput
              style={{
                backgroundColor: "#232323",
                color: "#fff",
                borderRadius: 14,
                padding: 16,
                paddingTop: 18,
                fontSize: 16,
                borderWidth: 1.5,
                borderColor: "#b91c1c",
              }}
              value={username}
              onChangeText={val => {
                setUsername(val);
                animateLabel(usernameLabelAnim, val ? 1 : 0);
              }}
              onFocus={() => animateLabel(usernameLabelAnim, 1)}
              onBlur={() => animateLabel(usernameLabelAnim, username ? 1 : 0)}
            />
          </View>
        </View>
        <View style={{ marginBottom: 18 }}>
          <View style={{ position: 'relative' }}>
            <Animated.Text
              style={{
                position: 'absolute',
                left: 16,
                top: emailLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [18, -8] }),
                fontSize: emailLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 13] }),
                color: '#b91c1c',
                backgroundColor: emailLabelAnim.interpolate({ inputRange: [0, 1], outputRange: ['transparent', '#18181b'] }),
                paddingHorizontal: emailLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
                zIndex: 2,
              }}
            >
              Email Address
            </Animated.Text>
            <TextInput
              style={{
                backgroundColor: "#232323",
                color: "#fff",
                borderRadius: 14,
                padding: 16,
                paddingTop: 18,
                fontSize: 16,
                borderWidth: 1.5,
                borderColor: "#b91c1c",
              }}
              value={email}
              onChangeText={val => {
                setEmail(val);
                animateLabel(emailLabelAnim, val ? 1 : 0);
              }}
              onFocus={() => animateLabel(emailLabelAnim, 1)}
              onBlur={() => animateLabel(emailLabelAnim, email ? 1 : 0)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{ marginBottom: 18 }}>
          <View style={{ position: 'relative' }}>
            <Animated.Text
              style={{
                position: 'absolute',
                left: 16,
                top: passwordLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [18, -8] }),
                fontSize: passwordLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 13] }),
                color: '#b91c1c',
                backgroundColor: passwordLabelAnim.interpolate({ inputRange: [0, 1], outputRange: ['transparent', '#18181b'] }),
                paddingHorizontal: passwordLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
                zIndex: 2,
              }}
            >
              Password
            </Animated.Text>
            <TextInput
              style={{
                backgroundColor: "#232323",
                color: "#fff",
                borderRadius: 14,
                padding: 16,
                paddingTop: 18,
                fontSize: 16,
                borderWidth: 1.5,
                borderColor: "#b91c1c",
              }}
              value={password}
              onChangeText={val => {
                setPassword(val);
                animateLabel(passwordLabelAnim, val ? 1 : 0);
              }}
              onFocus={() => animateLabel(passwordLabelAnim, 1)}
              onBlur={() => animateLabel(passwordLabelAnim, password ? 1 : 0)}
              secureTextEntry
            />
          </View>
        </View>
        <View style={{ marginBottom: 18 }}>
          <View style={{ position: 'relative' }}>
            <Animated.Text
              style={{
                position: 'absolute',
                left: 16,
                top: confirmLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [18, -8] }),
                fontSize: confirmLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 13] }),
                color: '#b91c1c',
                backgroundColor: confirmLabelAnim.interpolate({ inputRange: [0, 1], outputRange: ['transparent', '#18181b'] }),
                paddingHorizontal: confirmLabelAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
                zIndex: 2,
              }}
            >
              Confirm Password
            </Animated.Text>
            <TextInput
              style={{
                backgroundColor: "#232323",
                color: "#fff",
                borderRadius: 14,
                padding: 16,
                paddingTop: 18,
                fontSize: 16,
                borderWidth: 1.5,
                borderColor: "#b91c1c",
              }}
              value={confirmPassword}
              onChangeText={val => {
                setConfirmPassword(val);
                animateLabel(confirmLabelAnim, val ? 1 : 0);
              }}
              onFocus={() => animateLabel(confirmLabelAnim, 1)}
              onBlur={() => animateLabel(confirmLabelAnim, confirmPassword ? 1 : 0)}
              secureTextEntry
            />
          </View>
        </View>
        {error ? (
          <Text style={{ color: "#dc2626", textAlign: "center", marginBottom: 12, fontSize: 15 }}>{error}</Text>
        ) : null}
        <Pressable
          onPress={handleSignup}
          style={{ backgroundColor: "#b91c1c", borderRadius: 14, paddingVertical: 14, alignItems: "center", marginBottom: 12, shadowColor: '#b91c1c', shadowOpacity: 0.18, shadowRadius: 8, elevation: 4 }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18, letterSpacing: 1 }}>Sign Up</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} style={{ alignItems: "center", marginTop: 12 }}>
          <Text style={{ color: "#b91c1c", fontWeight: "bold", fontSize: 15 }}>Back</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default SignupForm;

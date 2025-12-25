import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChartSection from "./ChartSection";

const animeCards = [
  { name: "Naruto", poster: require("../../assets/images/icon.png") },
  { name: "One Piece", poster: require("../../assets/images/react-logo.png") },
  { name: "Attack on Titan", poster: require("../../assets/images/partial-react-logo.png") },
  { name: "Demon Slayer", poster: require("../../assets/images/android-icon-background.png") },
  { name: "My Hero Academia", poster: require("../../assets/images/android-icon-foreground.png") },
  { name: "Jujutsu Kaisen", poster: require("../../assets/images/android-icon-monochrome.png") },
];

const carouselImages = [
  require("../../assets/images/react-logo.png"),
  require("../../assets/images/partial-react-logo.png"),
  require("../../assets/images/splash-icon.png"),
  require("../../assets/images/favicon.png"),
];

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;

export default function Home() {
  const router = useRouter();
  const carouselRef = useRef<ScrollView>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const loginAnim = useRef(new Animated.Value(1)).current;
  const signupAnim = useRef(new Animated.Value(1)).current;

  const animateButton = (animRef: Animated.Value, cb: () => void) => {
    Animated.sequence([
      Animated.timing(animRef, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(animRef, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(cb);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const next = (prev + 1) % carouselImages.length;
        carouselRef.current?.scrollTo({
          x: next * ITEM_WIDTH,
          animated: true,
        });
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const renderCard = (
    card: { name: string; poster: number },
    idx: number
  ) => (
    <View
      key={idx}
      style={{
        backgroundColor: '#141414',
        borderRadius: 16,
        margin: 8,
        alignItems: 'center',
        padding: 8,
        width: 128,
        elevation: 4,
      }}
    >
      <Image
        source={card.poster}
        style={{ width: 80, height: 80, borderRadius: 8 }}
      />
      <Text style={{ marginTop: 8, textAlign: 'center', fontWeight: '600', fontSize: 13, color: '#fff' }}>
        {card.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#141414' }}>
      {/* Header */}
      <View style={{
        paddingHorizontal: 24,
        paddingVertical: 24,
        marginBottom: 8,
        backgroundColor: '#141414',
        elevation: 12,
        shadowColor: '#b91c1c',
        shadowOpacity: 0.25,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Animated.View style={{ transform: [{ scale: loginAnim }] }}>
            <Pressable
              onPress={() => animateButton(loginAnim, () => router.push("/LoginForm"))}
              style={{ backgroundColor: '#b91c1c', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 999, marginRight: 12, elevation: 4 }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: signupAnim }] }}>
            <Pressable
              onPress={() => animateButton(signupAnim, () => router.push("/SignupForm"))}
              style={{ backgroundColor: '#b91c1c', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 999, elevation: 4 }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: '#141414' }}>
        <View style={{ marginTop: 16, marginBottom: 16, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#b91c1c', marginBottom: 16, textAlign: 'center' }}>
            AnimePedia Home
          </Text>

          {/* Cards */}
          <View className="flex-row justify-center">
            {animeCards.slice(0, 3).map(renderCard)}
          </View>
          <View className="flex-row justify-center mb-4">
            {animeCards.slice(3, 6).map(renderCard)}
          </View>

          {/* Carousel */}
          <ScrollView
            ref={carouselRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ height: 180 }}
            onMomentumScrollEnd={(e) => {
              const idx = Math.round(
                e.nativeEvent.contentOffset.x / ITEM_WIDTH
              );
              setCarouselIndex(idx);
            }}
          >
            {carouselImages.map((img, idx) => (
              <View key={idx} style={{ width: ITEM_WIDTH }}>
                <Image
                  source={img}
                  style={{
                    width: ITEM_WIDTH,
                    height: 160,
                    borderRadius: 12,
                  }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>

          {/* Chart */}
          <ChartSection />

          {/* About */}
          <View style={{
            backgroundColor: '#141414',
            borderRadius: 18,
            padding: 24,
            marginTop: 24,
            elevation: 12,
            shadowColor: '#b91c1c',
            shadowOpacity: 0.25,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#b91c1c', marginBottom: 8 }}>
              About AnimePedia
            </Text>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              AnimePedia helps you track, discover, and manage your favorite anime with ease.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

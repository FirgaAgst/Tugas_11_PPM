import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

// Ambil ukuran layar (static)
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ComponentDemo() {
  // Ambil ukuran layar realtime
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animasi fade in dan slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.title}>Demo Komponen Responsive</Text>
        </Animated.View>

        {/* 1. Flexbox */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.sectionTitle}>1. Flexbox</Text>
          <View style={styles.flexBoxExample}>
            <Animated.View style={[styles.box, { backgroundColor: "#0288D1", transform: [{ scale: scaleAnim }] }]} />
            <Animated.View style={[styles.box, { backgroundColor: "#03A9F4", transform: [{ scale: scaleAnim }] }]} />
            <Animated.View style={[styles.box, { backgroundColor: "#4FC3F7", transform: [{ scale: scaleAnim }] }]} />
          </View>
        </Animated.View>

        {/* 2. Dimensions */}
        <Text style={styles.sectionTitle}>2. Dimensions</Text>
        <Text style={styles.text}>
          Static Width: {SCREEN_WIDTH.toFixed(0)} px | Static Height: {SCREEN_HEIGHT.toFixed(0)} px
        </Text>
        <Text style={styles.text}>
          Realtime Width: {width.toFixed(0)} px | Height: {height.toFixed(0)} px
        </Text>

        {/* 3. Breakpoint */}
        <Text style={styles.sectionTitle}>3. Breakpoint (Tablet vs Mobile)</Text>
        <Text style={styles.text}>Mode: {isTablet ? "Tablet" : "Mobile"}</Text>

        {/* 4. Input Responsif */}
        <Text style={styles.sectionTitle}>4. Input Responsif</Text>
        <TextInput placeholder="Contoh Input" style={[styles.input, { fontSize: width * 0.04 }]} />

        {/* 5. Image Responsif */}
        <Text style={styles.sectionTitle}>5. Gambar Responsif</Text>
        <Image
          source={{ uri: "https://picsum.photos/500" }}
          style={{ width: "100%", height: width * 0.5, borderRadius: 10 }}
        />

        {/* 6. flexWrap (Grid Responsif) */}
        <Text style={styles.sectionTitle}>6. Grid Responsif (flexWrap)</Text>
        <View style={styles.gridWrap}>
          {[1, 2, 3, 4].map((item) => (
            <View
              key={item}
              style={[
                styles.gridItem,
                { width: isTablet ? "48%" : "100%" },
              ]}
            >
              <Text style={{ color: "#fff" }}>Card {item}</Text>
            </View>
          ))}
        </View>

        {/* 7. Button Responsif */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <Text style={styles.sectionTitle}>7. Tombol Responsif</Text>
          <TouchableOpacity style={[styles.button, { height: width * 0.14 }]}>
            <Text style={[styles.buttonText, { fontSize: width * 0.045 }]}>Klik Saya</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },

  /* 1. Flexbox */
  flexBoxExample: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  /* 4. Input Responsif */
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },

  /* 6. Grid Responsif */
  gridWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    height: 100,
    backgroundColor: "#0288D1",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  /* 7. Button */
  button: {
    width: "100%",
    backgroundColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
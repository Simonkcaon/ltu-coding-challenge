import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { ltuBlue, ltuRose } from "../../constants/colors";
import { LtuIcon } from "../Icon";
import { LtuText } from "../typography/Text";

export const ArchiveHintAnimation = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(1500),
        Animated.timing(translateX, {
          toValue: -100, // Swipe left
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(500), // Pause before click
        // Click animation
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.delay(1000), // Pause after click
        Animated.timing(translateX, {
          toValue: 0, // Swipe back
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [translateX, scale]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.backgroundAction, { transform: [{ scale }] }]}
      >
        <LtuIcon name="archive-outline" size={20} color="white" />
        <Text style={styles.actionText}>Archive</Text>
      </Animated.View>
      <Animated.View style={[styles.note, { transform: [{ translateX }] }]}>
        <View style={styles.noteContent}>
          <LtuText bold>Deine Notiz</LtuText>
          <LtuText size="sm">Wische & klicke um zu archivieren</LtuText>
        </View>
        <LtuIcon name="chevron-back" size={16} color="#aaa" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: 280,
    height: 70,
    backgroundColor: ltuBlue,
    borderRadius: 20,
    justifyContent: "center",
  },
  backgroundAction: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  actionText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 10,
  },
  note: {
    height: "100%",
    width: "100%",
    backgroundColor: ltuRose,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  noteContent: {
    flex: 1,
  },
}); 
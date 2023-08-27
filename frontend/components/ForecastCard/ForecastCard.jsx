import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export const ForecastCard = ({ day }) => {
  useEffect(() => {
    console.log(day);
  }, []);

  return (
    <View style={styles.mainBlock}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              marginRight: 10,
            }}
            source={{ uri: `https:${day.day.condition.icon}` }}
          />
          <View>
            <Text style={{ fontSize: 20, color: "#5c529a", fontWeight: "600" }}>
              {day.date}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 6, color: "#5c529a" }}>
              {day.day.condition.text}
            </Text>
          </View>
        </View>
        <Text style={styles.tempText}>{day.day.avgtemp_c}℃</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    backgroundColor: "#fff",
    width: "100%",
    borderColor: "#5c529a",
    borderStyle: "solid",
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  tempText: {
    fontSize: 24,
    color: "#5c529a",
    fontWeight: "600",
  },
});

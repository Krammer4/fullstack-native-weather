import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useHttp } from "../../hooks/useHttp";

export const PlaceCard = ({ cityName }) => {
  const { request, error, loading } = useHttp();
  const [weather, setWeather] = useState(null);

  const fetchCurrentWeather = async () => {
    try {
      const weatherData = await request(
        `https://api.weatherapi.com/v1/current.json?key=ccb1784bc0454be99c7114034232508&q=${cityName}&aqi=no`
      );
      console.log(weatherData);
      setWeather(weatherData);
    } catch (error) {
      console.log(`Error while sending forecast request ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
  }, []);

  return (
    weather && (
      <TouchableOpacity
        onPress={() => {
          console.log(cityName);
        }}
      >
        <View style={styles.mainBlock}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.cityName}>{cityName}</Text>
              <Text style={styles.countryName}>{weather.location.country}</Text>
            </View>
            <Text style={styles.tempText}>{weather.current.temp_c}℃</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    width: "100%",
    backgroundColor: "#5c529a",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
  },
  cityName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  countryName: {
    color: "#FFF",
    fontSize: 16,
    paddingTop: 4,
    color: "#e7e5f0",
  },
  tempText: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "600",
  },
});

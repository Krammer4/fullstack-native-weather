import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useHttp } from "../../hooks/useHttp";
import { ForecastCard } from "../../components/ForecastCard/ForecastCard";

export const City = () => {
  const route = useRoute();
  const cityName = route.params.cityName;
  const { request, loading, error } = useHttp();

  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const weatherData = await request(
        `http://api.weatherapi.com/v1/forecast.json?key=ccb1784bc0454be99c7114034232508&q=${cityName}&days=7&aqi=no&alerts=no&lang=ru`
      );
      setWeather(weatherData);
    } catch (error) {
      console.log(`Error while fetching city forecast: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    weather && (
      <ScrollView style={styles.mainBlock}>
        <View style={styles.todayForecast}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.cityName}>{cityName}</Text>
              <Text style={styles.countryName}>{weather.location.country}</Text>
            </View>
            <Text style={styles.tempText}>{weather.current.temp_c}℃</Text>
          </View>
          <Text style={styles.conditionText}>
            {weather.current.condition.text}
          </Text>
          <Image
            style={{
              width: 140,
              height: 140,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
            }}
            source={{ uri: `https:${weather.current.condition.icon}` }}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={styles.forecastPoint}>Ошушается как:</Text>
            <Text style={styles.forecastPointValue}>
              {weather.current.feelslike_c}℃
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={styles.forecastPoint}>Скорость ветра:</Text>
            <Text style={styles.forecastPointValue}>
              {weather.current.wind_mph} м/с
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={styles.forecastPoint}>Влажность:</Text>
            <Text style={styles.forecastPointValue}>
              {weather.current.humidity}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={styles.forecastPoint}>Облачность:</Text>
            <Text style={styles.forecastPointValue}>
              {weather.current.cloud}%
            </Text>
          </View>
        </View>
        <View style={{ height: "100%", marginBottom: 60 }}>
          <Text style={styles.h2}>Прогноз на неделю:</Text>
          {weather.forecast.forecastday.slice(1).map((day) => {
            return <ForecastCard key={day.date} day={day} />;
          })}
        </View>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e7e5f0",
  },
  todayForecast: {
    backgroundColor: "#5c529a",
    padding: 20,
    borderRadius: 20,
  },
  cityName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
    maxWidth: 200,
  },
  countryName: {
    color: "#FFF",
    fontSize: 18,
    paddingTop: 4,
    color: "#e7e5f0",
    maxWidth: 180,
  },
  conditionText: {
    color: "#fff",
    fontSize: 22,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  tempText: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "600",
  },
  forecastPoint: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  forecastPointValue: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  h2: {
    fontWeight: "600",
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
  },
});

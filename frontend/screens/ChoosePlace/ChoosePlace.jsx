import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHttp } from "../../hooks/useHttp";
import { backend_url } from "../../consts";

export const ChoosePlace = ({ navigation, route }) => {
  const { request, loading, error } = useHttp();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData) {
          setUserId(parsedData.userId);
        }
      }
    };

    fetchData();
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [region, setRegion] = useState({
    latitude: 53.9045,
    longitude: 27.5615,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cityName, setCityName] = useState("");

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  useEffect(() => {
    if (selectedLocation) {
      (async () => {
        try {
          const locationInfo = await Location.reverseGeocodeAsync({
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          });

          if (locationInfo.length > 0) {
            const city = locationInfo[0].city || locationInfo[0].subregion;
            setCityName(city);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [selectedLocation]);

  const saveChoosenPlace = async () => {
    try {
      const saveData = await request(
        `${backend_url}/api/user/add-place`,
        "POST",
        {
          place: cityName,
          userId: userId,
        }
      );

      setErrorMessage("");
      navigation.navigate("AllPlaces");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.mainBlock}>
      {cityName && <Text style={styles.cityName}>{cityName}</Text>}

      <MapView style={styles.map} region={region} onPress={handleMapPress}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <TouchableOpacity style={styles.button}>
        <Button onPress={saveChoosenPlace} color={"#fff"} title="Сохранить" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#e7e5f0",
  },
  input: {
    maxWidth: 320,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,

    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5c529a",
    maxWidth: 320,
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
  },
  map: {
    maxWidth: 320,
    width: "100%",
    height: 500,
    borderRadius: 20,
    marginTop: 20,
  },
  cityName: {
    fontSize: 26,

    fontWeight: "600",
  },
  errorMessage: {
    maxWidth: 320,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    color: "#B22222",
    fontWeight: "600",
    textAlign: "center",
  },
  successMessage: {
    maxWidth: 320,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    color: "#25ba7c",
    fontWeight: "600",
    textAlign: "center",
  },
});

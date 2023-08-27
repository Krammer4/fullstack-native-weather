import React, { createContext, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useHttp } from "../../hooks/useHttp";
import { backend_url } from "../../consts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { PlaceCard } from "../../components/PlaceCard/PlaceCard";
import { AuthContext } from "../../context/authContext";

export const Main = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState("");
  const { request, error, loading } = useHttp();
  const [userData, setUserData] = useState(null);
  const auth = useContext(AuthContext);

  const fetchUserData = async (userId) => {
    try {
      const data = await request(`${backend_url}/api/user/${userId}`, "GET");
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(() => {
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

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const data = await request(`${backend_url}/api/user/${userId}`);
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId, isFocused]);

  if (userData && userData.places.length == 0) {
    return (
      <View style={styles.mainBlock}>
        {userData && (
          <Text
            style={styles.helloMessage}
            onPress={() => fetchUserData(userId)}
          >
            Здравствуйте, {userData.username}!
          </Text>
        )}
        <Text style={styles.helpMessage}>
          Чтобы посмотреть погоду,{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Choose")}>
            <Text style={{ color: "#5c529a", fontSize: "20", paddingTop: 6 }}>
              добавьте местоположения
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  } else if (userData && userData.places.length !== 0) {
    return (
      <ScrollView style={styles.mainBlock}>
        <View style={styles.weatherBlocks}>
          <FlatList
            data={userData.places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceCard cityName={item} />}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.h2}>Мои локации</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {userData.places.slice(0, 2).map((place) => {
              return (
                <View style={styles.myTownCard}>
                  <Button
                    style={styles.myTownCard}
                    color={"#fff"}
                    title={place}
                  ></Button>
                </View>
              );
            })}
            <View style={styles.myTownCard}>
              <Button
                style={styles.myTownCard}
                color={"#fff"}
                title={"..."}
              ></Button>
            </View>
            <TouchableOpacity style={styles.myLocationsButton}>
              <Button
                onPress={() => navigation.navigate("AllPlaces")}
                color={"#fff"}
                title="Все локации"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 60 }}>
          <Text style={styles.h2}>Аккаунт:</Text>
          <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 10 }}>
            Username: {userData.username}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 10 }}>
            Email: {userData.email}
          </Text>
          <TouchableOpacity style={styles.exit}>
            <Button
              onPress={() => {
                auth.logout();
              }}
              color={"#FFF"}
              title="Выйти"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ActivityIndicator
        size="large"
        color="#5c529a"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 80,
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e7e5f0",
  },
  helloMessage: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "600",
  },
  helpMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
  },
  weatherBlocks: {
    maxHeight: 500,
    marginBottom: 40,
  },
  h2: {
    fontWeight: "500",
    fontSize: 24,
  },
  myTownCard: {
    fontSize: 16,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    lineHeight: 16,
    backgroundColor: "#5c529a",
  },
  myLocationsButton: {
    backgroundColor: "#25ba7c",
    borderRadius: 10,
  },
  exit: {
    backgroundColor: "#B22222",
    width: 100,
    borderRadius: 10,
    marginTop: 20,
  },
});

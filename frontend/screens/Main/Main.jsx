import React, { createContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useHttp } from "../../hooks/useHttp";
import { backend_url } from "../../consts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Main = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const { request, error, loading } = useHttp();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const data = await request(`${backend_url}/api/user/${userId}`, "GET");
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

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
  }, [userId]);

  if (userData.places == 0) {
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
  } else {
    return (
      <View style={styles.mainBlock}>
        <FlatList />
      </View>
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
});

import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useHttp } from "../../hooks/useHttp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backend_url } from "../../consts";
import cross from "../../img/AllPlaces/cross.png";
import { useIsFocused } from "@react-navigation/native"; // Импортируйте хук useIsFocused

export const AllPlaces = ({ navigation, route }) => {
  const [userId, setUserId] = useState("");
  const { request, error, loading } = useHttp();
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();

  const fetchUserData = async (userId) => {
    try {
      const data = await request(`${backend_url}/api/user/${userId}`);
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePlace = async (place) => {
    try {
      const deleteData = await request(
        `${backend_url}/api/user/delete-place?userId=${userId}&placeToDelete=${place}`,
        "DELETE"
      );
      fetchUserData();
      setUserData((prevUserData) => ({
        ...prevUserData,
        places: prevUserData.places.filter((item) => item !== place),
      }));
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
          fetchUserData(parsedData.userId);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [isFocused]);

  const handleDeletePlace = (place) => {
    Alert.alert(
      "Удаление места",
      `Вы уверены, что хотите удалить место "${place}"?`,
      [
        {
          text: "Да",
          onPress: () => deletePlace(place),
        },
        {
          text: "Нет",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.mainBlock}>
      <TouchableOpacity style={styles.addPlaceButton}>
        <Button
          onPress={() => navigation.navigate("Choose")}
          color={"#fff"}
          title="Добавить место"
        />
      </TouchableOpacity>

      {loading ? (
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
      ) : (
        userData &&
        userData.places.length !== 0 && (
          <FlatList
            data={userData.places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.placeCard}>
                <Text style={{ fontSize: 22, color: "#fff" }}>{item}</Text>

                <TouchableOpacity
                  onPress={() => {
                    if (userId) {
                      handleDeletePlace(item);
                    }
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#e7e5f0",
                      borderRadius: "100%",
                    }}
                    source={cross}
                  />
                </TouchableOpacity>
              </View>
            )}
            //   refreshControl={<RefreshControl onRefresh={fetchUserData} />}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#e7e5f0",
    padding: 20,
  },
  addPlaceButton: {
    backgroundColor: "#25ba7c",
    width: "100%",
    borderRadius: 10,
    padding: 8,
  },
  placeCard: {
    backgroundColor: "#5c529a",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    width: 350,
    marginTop: 20,
  },
});

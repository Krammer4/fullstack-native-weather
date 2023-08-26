import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export const AllPlaces = () => {
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

  return (
    <View style={styles.mainBlock}>
      <Text>Мои места</Text>
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
});

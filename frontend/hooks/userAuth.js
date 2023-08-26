import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    AsyncStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    AsyncStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem(storageName);
        if (data) {
          const parsedData = JSON.parse(data);
          if (parsedData.token) {
            login(parsedData.token, parsedData.userId);
          }
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, [login]);

  return { login, logout, token, userId };
};

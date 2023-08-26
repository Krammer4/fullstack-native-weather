import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/userAuth";

export default function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthentificated = !!token;
  const routes = useRoutes(isAuthentificated);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthentificated,
      }}
    >
      <View style={styles.container}>
        {routes}
        <StatusBar style="auto" />
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

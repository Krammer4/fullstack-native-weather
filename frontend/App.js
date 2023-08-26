import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useRoutes } from "./routes";

export default function App() {
  const routes = useRoutes(false);

  return (
    <View style={styles.container}>
      {routes}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

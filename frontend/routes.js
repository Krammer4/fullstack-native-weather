import { useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth } from "./screens/Auth";
import { Reg } from "./screens/Reg";
import { Main } from "./screens/Main/Main";
import { TouchableOpacity, Button, StyleSheet } from "react-native";
import { useAuth } from "./hooks/userAuth";
import { AuthContext } from "./context/authContext";
import { ChoosePlace } from "./screens/ChoosePlace/ChoosePlace";
import { AllPlaces } from "./screens/AllPlaces/AllPlaces";

export const useRoutes = (isAuthentificated) => {
  const Stack = createStackNavigator();

  if (isAuthentificated) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "#5c529a",
            headerTitleStyle: {
              fontWeight: "600",
            },
            headerStyle: {
              backgroundColor: "#fff",
            },
            // headerRight: () => (
            //   <TouchableOpacity style={styles.exitButton}>
            //     <Button onPress={makeLogout} color="#fff" title="Выйти" />
            //   </TouchableOpacity>
            // ),
          }}
          initialRouteName="Main"
        >
          <Stack.Screen
            name="Main"
            options={{ title: "Главная" }}
            component={Main}
          />
          <Stack.Screen
            name="Choose"
            options={{ title: "Выбрать место" }}
            component={ChoosePlace}
          />
          <Stack.Screen
            name="AllPlaces"
            options={{ title: "Мои места" }}
            component={AllPlaces}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "#5c529a",
            headerTitleStyle: {
              fontWeight: "600",
            },
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
          initialRouteName="Auth"
        >
          <Stack.Screen
            options={{ title: "Войти" }}
            name="Auth"
            component={Auth}
          />
          <Stack.Screen
            options={{ title: "Регистрация" }}
            name="Reg"
            component={Reg}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  exitButton: {
    backgroundColor: "#B22222",
    borderRadius: 10,
    marginRight: 10,
    fontSize: 12,
  },
});

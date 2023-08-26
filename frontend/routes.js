import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth } from "./screens/Auth";
import { Reg } from "./screens/Reg";
import { Main } from "./screens/Main/Main";

export const useRoutes = (isAuthentificated) => {
  const Stack = createStackNavigator();

  if (isAuthentificated) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            options={{ title: "Главная" }}
            component={Main}
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
          <Stack.Screen name="Регистрация" component={Reg} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

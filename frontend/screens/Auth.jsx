import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

export const Auth = ({ navigation }) => {
  const passwordRef = useRef(null);

  return (
    <View style={styles.mainBlock}>
      <TextInput
        keyboardType="email-adress"
        placeholder="Email"
        style={styles.input}
        onSubmitEditing={() => passwordRef.current.focus()}
      ></TextInput>
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        style={styles.input}
      ></TextInput>
      <TouchableOpacity style={styles.button}>
        <Button color={"#ffffff"} title="Войти" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Регистрация");
        }}
      >
        <Text style={styles.regText}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7e5f0",
  },
  input: {
    maxWidth: 320,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
  },
  regText: {
    color: "#5c529a",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#5c529a",
    maxWidth: 320,
    width: "100%",
    borderRadius: 10,
  },
});

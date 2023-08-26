import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useHttp } from "../hooks/useHttp";
import { backend_url } from "../consts";

export const Reg = ({ navigation }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { request, error, loading } = useHttp();

  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerHandler = async () => {
    try {
      const data = await request(
        `${backend_url}/api/auth/registration`,
        "POST",
        {
          username: usernameInputValue,
          email: emailInputValue,
          password: passwordInputValue,
        }
      );
      navigation.navigate("Auth");
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <View style={styles.mainBlock}>
      <TextInput
        value={usernameInputValue}
        onChangeText={(text) => setUsernameInputValue(text)}
        placeholder="Имя пользователя"
        style={styles.input}
        onSubmitEditing={() => emailRef.current.focus()}
      ></TextInput>
      <TextInput
        value={emailInputValue}
        onChangeText={(text) => setEmailInputValue(text)}
        ref={emailRef}
        onSubmitEditing={() => passwordRef.current.focus()}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        style={styles.input}
      ></TextInput>
      <TextInput
        value={passwordInputValue}
        onChangeText={(text) => setPasswordInputValue(text)}
        ref={passwordRef}
        secureTextEntry
        autoCapitalize="none"
        placeholder="Password"
        style={styles.input}
      ></TextInput>
      <TouchableOpacity style={styles.button}>
        <Button
          onPress={registerHandler}
          color={"#ffffff"}
          title="Зарегистрироваться"
        />
      </TouchableOpacity>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Auth");
        }}
      >
        <Text style={styles.regText}>Войти</Text>
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
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#5c529a",
    maxWidth: 320,
    width: "100%",
    borderRadius: 10,
  },
  errorMessage: {
    maxWidth: 320,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    color: "#B22222",
    fontWeight: "600",
    textAlign: "center",
  },
});

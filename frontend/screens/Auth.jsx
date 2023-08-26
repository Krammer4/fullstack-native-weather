import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
} from "react-native";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/useHttp";
import { backend_url } from "../consts";

export const Auth = ({ navigation }) => {
  const passwordRef = useRef(null);
  const auth = useContext(AuthContext);

  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { request, loading, error } = useHttp();

  const [form, setForm] = useState({
    email: emailInputValue,
    password: passwordInputValue,
  });

  // const changeFormHandler = async (event) => {
  //   setForm({ ...form, [event.target.name]: event.target.value });
  // };

  const loginHandler = async () => {
    try {
      const data = await request(`${backend_url}/api/auth/login`, "POST", {
        email: emailInputValue,
        password: passwordInputValue,
      });
      setErrorMessage("");
      auth.login(data.token, data.userId);
      console.log("Successful auth");
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.mainBlock}>
      <TextInput
        value={emailInputValue}
        onChangeText={(text) => {
          setEmailInputValue(text);
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        style={styles.input}
        onSubmitEditing={() => passwordRef.current.focus()}
      ></TextInput>
      <TextInput
        value={passwordInputValue}
        onChangeText={(text) => setPasswordInputValue(text)}
        ref={passwordRef}
        autoCapitalize="none"
        placeholder="Password"
        style={styles.input}
      ></TextInput>
      <TouchableOpacity style={styles.button}>
        <Button onPress={loginHandler} color={"#ffffff"} title="Войти" />
      </TouchableOpacity>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Reg");
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

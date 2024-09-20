import TextButton from "@/components/Buttons/TextButton";
import { SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { AuthContext, LoginType } from "@/context/AuthContext";
import { ShopsContext } from "@/context/ShopsContext";
import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Login() {
  const DefaultPayload = {
    email: "",
    password: "",
  };

  const { appColors, appFonts } = useContext(AppDataContext);
  const { shopData } = useContext(ShopsContext);
  const [payload, setPayload] = useState<LoginType>(DefaultPayload);
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("")

  const handleChange = (name: keyof LoginType, value: string) => {
    setPayload({ ...payload, [name]: value.trim() });
  };

  const handleSubmit = () => {
    const { email, password } = payload;
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      setError("Please fill out all fields.");
      return;
    } else if (payload) {
      login(payload)
        .then((response) => {
          Alert.alert("Success", "Account Login Successful.");
          router.replace("/(main)/(tabs)");
        })
        .catch((error) => {
          Alert.alert("Oops", "Email or Password Incorrect.");
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text
            style={{
              ...styles.name,
              color: appColors.gray,
              fontFamily: appFonts.bold,
            }}
          >
            {shopData?.shopDetails?.name}
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <TextInput
            style={{ ...styles.input, fontFamily: appFonts.regular }}
            placeholder="Email"
            placeholderTextColor={appColors.gray2}
            value={payload.email}
            onChangeText={(text) => handleChange("email", text)}
            inputMode="email"
          />

          <TextInput
            style={{ ...styles.input, fontFamily: appFonts.regular }}
            placeholder="Password"
            placeholderTextColor={appColors.gray2}
            value={payload.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
        </View>

        <TextButton
          title="Login"
          ContainerStyling={{
            backgroundColor: appColors.primary,
            width: "100%",
          }}
          styling={{ fontFamily: appFonts.bold, fontSize: SIZES.medium }}
          onPress={handleSubmit}
        />

        <Text
          style={{ ...styles.alreadyRegistered, fontFamily: appFonts.regular }}
        >
          Already have an account?
        </Text>

        <Link style={{ width: "100%" }} href="/modals/register-modal" asChild>
          <TextButton
            title="Register"
            ContainerStyling={{
              borderColor: appColors.primary,
              borderWidth: 1,
              width: "100%",
              marginBottom: SIZES.massive,
            }}
            styling={{ color: appColors.primary, fontFamily: appFonts.regular, fontSize: SIZES.medium }}
          />
        </Link>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  heading: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  name: {
    fontSize: SIZES.medium,
  },
  input: {
    height: SIZES.massive,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
    fontSize: SIZES.medium,
  },
  alreadyRegistered: {
    marginVertical: SIZES.small,
    marginHorizontal: "auto",
    fontSize: SIZES.medium,
  },
});

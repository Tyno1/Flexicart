import TextButton from "@/components/Buttons/TextButton";
import { SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { AuthContext, RegisterType } from "@/context/AuthContext";
import { ShopsContext } from "@/context/ShopsContext";
import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function Register() {
  const DefaultPayload = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    imageUrl: "",
  };

  const { appColors, appFonts } = useContext(AppDataContext);
  const { shopData } = useContext(ShopsContext);
  const [payload, setPayload] = useState<RegisterType>(DefaultPayload);
  const { register } = useContext(AuthContext);
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleChange = (name: keyof RegisterType, value: string) => {
    setPayload({ ...payload, [name]: value.trim() });
  };

  const handleSubmit = () => {
    const { username, firstName, lastName, email, phone, password } = payload;
    if (!username || !firstName || !lastName || !email || !phone || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      setError("Please fill out all fields.");
      return;
    } else if (payload) {
      register(payload)
        .then((response) => {
          Alert.alert("Success", "Account Created successfully. Now Login");
          setMessage("Account Created successfully. Now Login")
          router.replace("/modals/login-modal");
        })
        .catch((error) => {
          Alert.alert("Success", "Account Created successfully. Now Login");
          console.error("Error registering user:", error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.minContainer}
      >
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

        <TextInput
          style={{ ...styles.input, fontFamily: appFonts.regular }}
          placeholder="Username"
          placeholderTextColor={appColors.gray2}
          value={payload.username}
          onChangeText={(text) => handleChange("username", text)}
        />

        <TextInput
          style={{ ...styles.input, fontFamily: appFonts.regular }}
          placeholder="First Name"
          placeholderTextColor={appColors.gray2}
          value={payload.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
        />

        <TextInput
          style={{ ...styles.input, fontFamily: appFonts.regular }}
          placeholder="Last Name"
          placeholderTextColor={appColors.gray2}
          value={payload.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
        />

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
          placeholder="Phone"
          placeholderTextColor={appColors.gray2}
          value={payload.phone}
          onChangeText={(text) => handleChange("phone", text)}
          inputMode="tel"
        />
        <TextInput
          style={{ ...styles.input, fontFamily: appFonts.regular }}
          placeholder="Password"
          placeholderTextColor={appColors.gray2}
          value={payload.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
        />

        <TextButton
          title="Register"
          ContainerStyling={{
            backgroundColor: appColors.primary,
            width: "100%",
          }}
          styling={{ fontFamily: appFonts.bold, fontSize: SIZES.medium }}
          onPress={handleSubmit}
        />

        <Text style={styles.alreadyRegistered}>Already have an account?</Text>

        <Link style={{ width: "100%" }} href="/modals/login-modal" asChild>
          <TextButton
            title="Login"
            ContainerStyling={{
              borderColor: appColors.primary,
              borderWidth: 1,
              width: "100%",
              marginBottom: SIZES.massive,
            }}
            styling={{ color: appColors.primary, fontFamily: appFonts.bold, fontSize: SIZES.medium }}
          />
        </Link>
        {message && <Text>{message}</Text>}
      </ScrollView>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  minContainer: {
    paddingHorizontal: 20,
    marginVertical: SIZES.large,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
  },
  heading: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    fontSize: SIZES.medium,
    marginBottom: 10,
  },
  input: {
    height: SIZES.massive,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
  },
  alreadyRegistered: {
    marginVertical: SIZES.small,
    marginHorizontal: "auto",
  },
});

import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SIZES, COLORS } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";

const ContactUs = () => {
  const { appColors } = useContext(AppDataContext);

  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setPayload({ ...payload, [field]: value });
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, phone, message } = payload;
    if (!firstName || !lastName || !email || !phone || !message) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    // Handle form submission logic here, e.g., send data to the server
    Alert.alert("Success", "Your message has been sent.");
    setPayload({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ ...styles.title, color: appColors.primary }}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={payload.firstName}
        placeholderTextColor={appColors.gray2}
        onChangeText={(value) => handleInputChange("firstName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={payload.lastName}
        placeholderTextColor={appColors.gray2}
        onChangeText={(value) => handleInputChange("lastName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={payload.email}
        placeholderTextColor={appColors.gray2}
        onChangeText={(value) => handleInputChange("email", value)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={payload.phone}
        placeholderTextColor={appColors.gray2}
        onChangeText={(value) => handleInputChange("phone", value)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={payload.message}
        placeholderTextColor={appColors.gray2}
        onChangeText={(value) => handleInputChange("message", value)}
        multiline
      />
      <TouchableOpacity style={{ ...styles.button, backgroundColor: appColors.primary }} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  input: {
    height: SIZES.xxxLarge,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
  },
  button: {
    padding: SIZES.small,
    borderRadius: SIZES.xSmall,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: SIZES.medium,
  },
});

export default ContactUs;

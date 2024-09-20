import TextButton from "@/components/Buttons/TextButton";
import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { UserContext, UserProps } from "@/context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function EditProfile() {
  const { appColors, appFonts } = useContext(AppDataContext);
  const { userDetails, updateUserById, isLoading, error } =
    useContext(UserContext);
  const [payload, setPayload] = useState<UserProps>({
    imageUrl: userDetails?.imageUrl || null,
    firstName: userDetails?.firstName || "",
    email: userDetails?.email || "",
    phone: userDetails?.phone || "",
    lastName: userDetails?.lastName || "",
    username: userDetails?.username || "",
    address: userDetails?.address || "",
  });

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      let base64Img = `data:image/jpg;base64,${result?.assets[0]?.base64}`;

      setPayload({ ...payload, imageUrl: base64Img });
    } else {
      alert("You did not select any image.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPayload({ ...payload, [field]: value });
  };

  const handleSaveChanges = () => {
    if (payload) {
      updateUserById(payload)
        .then((response) => {
          router.replace("/(my_account)");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={{ ...styles.title, fontFamily: appFonts.bold }}>
        Edit Profile
      </Text>

      <TouchableOpacity
        onPress={handleChooseImage}
        style={styles.imageContainer}
      >
        {payload?.imageUrl ? (
          <Image
            source={{ uri: payload.imageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.imageText}>Choose Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={{ ...styles.input, fontFamily: appFonts.regular }}
        placeholder="Username"
        value={payload.username}
        onChangeText={(value) => handleInputChange("username", value)}
      />
      <TextInput
        style={{ ...styles.input, fontFamily: appFonts.regular }}
        placeholder="First Name"
        value={payload.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
      />
      <TextInput
        style={{ ...styles.input, fontFamily: appFonts.regular }}
        placeholder="Last Name"
        value={payload.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
      />
      <TextInput
        style={{ ...styles.input, fontFamily: appFonts.regular }}
        placeholder="Email"
        value={payload.email}
        onChangeText={(value) => handleInputChange("email", value)}
        keyboardType="email-address"
      />
      <TextInput
        style={{ ...styles.input, fontFamily: appFonts.regular }}
        placeholder="Phone Number"
        value={payload.phone}
        onChangeText={(value) => handleInputChange("phone", value)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={{ ...styles.input, fontFamily: appFonts.regular }}
        placeholder="Address"
        value={payload.address}
        onChangeText={(value) => handleInputChange("address", value)}
      />

      <TextButton
        onPress={handleSaveChanges}
        title="Save Changes"
        ContainerStyling={{
          borderColor: appColors.primary,
          borderWidth: 1,
          width: "100%",
          marginBottom: SIZES.massive,
        }}
        styling={{ color: appColors.primary, fontFamily: appFonts.bold }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  imageContainer: {
    marginBottom: SIZES.medium,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageText: {
    color: COLORS.gray,
  },
  input: {
    height: SIZES.xxxLarge + SIZES.medium,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

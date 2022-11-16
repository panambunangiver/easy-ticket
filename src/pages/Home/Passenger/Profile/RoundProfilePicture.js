import { Image, View } from "react-native";
import EmptyProfile from "../../../../assets/EmptyProfile.png";
import React from "react";

export function RoundProfilePicture() {
  return <View style={{
    alignItems: "center",
    marginTop: 50,
  }}>
    <View style={{
      borderRadius: 999,
      backgroundColor: "grey",
      width: 120,
      height: 120,
      overflow: "hidden",
    }}>
      <Image source={EmptyProfile} style={{
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain",
        margin: -15,
      }} />
    </View>
  </View>;
}

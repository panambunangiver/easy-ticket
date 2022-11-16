import { Image, TouchableOpacity, View } from "react-native";
import CameraIcon from "../../../../assets/CameraIcon.png";
import React from "react";

/*
* TouchableProfilePicture {AddFerry} Component
*
* display a profile picture of the ferry
* */
export function TouchableProfilePicture({ onPress, image }) {
  return <TouchableOpacity
    style={{
      flexDirection: "row",
      justifyContent: "center",
    }}
    onPress={onPress}
  >
    <View style={{
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: 999,
      height: 100,
      width: 100,
      overflow: 'hidden',
    }}>
      <Image source={image ? { uri: 'data:image;base64,' + image } : CameraIcon} style={{
        flex: 1,
        width: null,
        height: null,
        resizeMode: image? "cover" : "contain",
        margin: image ? 0 : 30,
      }} />
    </View>
  </TouchableOpacity>;
}

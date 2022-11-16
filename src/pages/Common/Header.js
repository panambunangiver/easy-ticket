import { Image, TouchableOpacity, View } from "react-native";
import ArrowLeft from "../../assets/ArrowLeft.png";
import TextPoppins from "./TextPoppins";
import React from "react";

/*
* Header Common Component
*
* This component shows the page title
*
* Required Props:
* - navigation: `react-navigation` navigation prop
* - title: title of the page
* - noBackButton: specify this to `true` to remove the back button on the leftside*/
export function Header({ navigation, title, noBackButton }) {
  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 25,
  }}>
    <TouchableOpacity
      style={{
        width: 40,
        paddingHorizontal: 5,
        display: noBackButton ? "none" : null,
      }}
      onPress={() => navigation.goBack()}
    >
      <Image source={ArrowLeft} style={{
        flex: 1,
        width: null,
        resizeMode: "contain",
      }} />
    </TouchableOpacity>

    <View style={{ flex: 1 }} />

    <TextPoppins style={{
      color: "white",
      fontType: "extrabolditalic",
      fontSize: 22,
    }}>
      {title}
    </TextPoppins>

    <View style={{
      flex: noBackButton ?
        1 :
        1.5, // to accomodate for the back button not present, this centers the title in the middle
    }} />
  </View>;
}

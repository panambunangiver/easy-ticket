import { Image, View } from "react-native";
import TwoPersonWalking from "../../assets/TwoPersonWalking.png";
import React from "react";

/*
* Hero Common Component
*
* This displays the EasyTicket artwork in the homepage of customer*/
export function Hero() {
  return <View style={{
    height: 180,
  }}>
    <Image
      source={TwoPersonWalking}
      style={{
        resizeMode: "contain",
        width: "100%",
        flex: 1,
      }}
    />
  </View>;
}

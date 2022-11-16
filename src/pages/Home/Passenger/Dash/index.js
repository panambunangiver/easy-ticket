import React from "react";
import { ScrollView, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import { Hero } from "../../../Common/Hero";
import { DestinationCard } from "./DestinationCard";

/*
* Dash Page Component
*
* Page that show up upon user logging in
* */
const Dash = () => {
  return (
    <View style={{
      backgroundColor: "#304875",
      flex: 1,
    }}>
      <ScrollView>
        <Hero />

        <View style={{ height: 50 }} />

        <View style={{
          paddingHorizontal: 25,
        }}>
          <TextPoppins style={{
            color: 'white',
            fontSize: 20,
            fontType: 'bold',
          }}>
            Selamat Datang
          </TextPoppins>

          <TextPoppins style={{
            color: 'white',
            fontSize: 18,
            fontType: 'semibold',
          }}>
            Silahkan pesan tiket anda, Anda mau kemana?
          </TextPoppins>

          <View style={{ height: 20 }} />

          <DestinationCard />

          <View style={{ height: 100 }} />

        </View>
      </ScrollView>
    </View>
  );
};

export default Dash;

import React from "react";

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../../Common/Header";
import { Hero } from "../../../Common/Hero";
import DaftarKapalIcon from "../../../../assets/DaftarKapalIcon.png";
import JadwalIcon from "../../../../assets/JadwalIcon.png";
import DaftarTiketIcon from "../../../../assets/DaftarTiketIcon.png";
import KeluarIcon from "../../../../assets/KeluarIcon.png";
import TextPoppins from "../../../Common/TextPoppins";
import { CommonActions } from "@react-navigation/native";
import GlobalsContext from "../../../../contexts/GlobalsContext";

//DEV WARNING: why is this here instead of on its own file?
/*
* TouchableTitledIcon {Dash} Component
*
* big button with icon and title
* */
function TouchableTitledIcon({ image, title, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        marginHorizontal: 20,
        flex: 1,
      }}
      onPress={onPress}>
      <Image
        source={image}
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: "contain",
          margin: 15,
        }}
      />
      <TextPoppins
        style={{
          color: "black",
          fontType: "semibold",
          fontSize: 16,
          textAlign: "center",
        }}>
        {title}
      </TextPoppins>
    </TouchableOpacity>
  );
}

/*
* Dash Page Component
*
* this component is shown upon logging in as admin
* */
const Dash = ({ navigation }) => {
  const globalsContext = React.useContext(GlobalsContext)

  return (
    <ScrollView
      style={{
        backgroundColor: "#304875",
        flex: 1,
      }}>
      <Hero />

      {[
        [
          [
            "Daftar Kapal",
            DaftarKapalIcon,
            () => navigation.navigate("AdminFerryList"),
          ],
          [
            "Jadwal",
            JadwalIcon,
            () => navigation.navigate("AdminFerrySchedules"),
          ],
        ],
        [
          [
            "Daftar Tiket",
            DaftarTiketIcon,
            () => navigation.navigate("AdminTicketsList"),
          ],
          [
            "Keluar",
            KeluarIcon,
            () => navigation.dispatch(state => {
              globalsContext.setGlobalsData({
                user: null,
                accessToken: null,
              });

              return CommonActions.reset({
                routes: [{ name: "Login" }],
                index: 0,
              });
            }),
          ],
        ],
      ].map((row, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            height: 150,
            marginTop: 20,
          }}>
          {row.map((el, idx) => (
            <TouchableTitledIcon
              key={idx}
              image={el[1]}
              title={el[0]}
              onPress={el[2]}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default Dash;

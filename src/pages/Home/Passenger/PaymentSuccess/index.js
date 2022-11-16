import React from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import GreenCheckmark from "../../../../assets/GreenCheckmark.png";

/*
* PaymentSuccess Page Component
*
* payment has been successful, this page gives user the confirmation
* and the choice to go back home or to the ticket page
* */
const PaymentSuccess = ({ navigation, route }) => {
  // console.log("PAYMENT PARAMS", route.params);
  console.log(JSON.stringify(navigation.getState(), null, 2));

  return (
    <View style={{
      backgroundColor: "#304875", flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <View style={{
        width: 180,
        height: 180,
        marginBottom: 20,
      }}>
        <Image source={GreenCheckmark} style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: "contain",
        }} />
      </View>
      <TextPoppins style={{
        color: "white",
        fontSize: 20,
        fontType: "bolditalic",
        marginBottom: 20,
      }}>Pembayaran Anda Berhasil</TextPoppins>

      {
        [
          ["Kembali Ke Halaman Utama", () => navigation.goBack()],
          ["Lihat Tiket", () => navigation.replace(
            'Home',
            {
              screen: 'HomeTicket',
            }
          )],
        ].map((el, idx) =>
          <TouchableOpacity
            key={idx}
            style={{
              backgroundColor: "#F97C08",
              alignSelf: "center",
              padding: 10,
              width: 215,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={el[1]}
          >
            <TextPoppins style={{
              color: "white",
              fontSize: 16,
              fontType: "extrabolditalic",
              textAlign: "center",
              textAlignVertical: "center",
            }}>
              {el[0]}
            </TextPoppins>
          </TouchableOpacity>,
        )
      }
    </View>
  );
};

export default PaymentSuccess;

import { View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import TextField from "../../../Common/TextField";
import React from "react";

/*
* PassengerInfoCard {BookTicketPassengerInfo} Component
*
* the card that contains the form to fill the passenger info
* */
export function PassengerInfoCard({ fullName, setFullName, ktpNumber, setKtpNumber }) {
  return <View style={{
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 30,
    marginTop: 60,
  }}>
    <TextPoppins style={{
      color: "black",
      fontType: "semibold",
    }}>
      Detail Pemesanan
    </TextPoppins>

    {
      [
        [
          fullName, // value
          setFullName, // setValue
          "Nama Lengkap", // placeholder
          value => value.length > 0, // validator
          null, // keyboardType
          true, // isBlack
          "* Isi sesuai KTP/KK/Paspor/SIM", // text to show below the input field
        ],
        [
          ktpNumber, // value
          setKtpNumber, // setValue
          "Nomor KTP/Paspor", // placeholder

          //checks for empty and non-numeric characters
          value => value.length > 0 && value.match(/^[0-9]+$/) !== null, // validator

          "numeric", // keyboardType
          true, // isBlack
          null, // text to show below the input field
        ],
      ].map((el, idx) =>
        <View key={idx} style={{ marginTop: 8 }}>
          <TextField value={el[0]} setValue={el[1]} placeholder={el[2]}
                     validator={el[3]} keyboardType={el[4]} isBlack={el[5]} />
          <TextPoppins style={{
            display: el[6] ? null : "none",
            color: "grey",
          }}>
            {el[6]}
          </TextPoppins>
        </View>,
      )
    }
  </View>;
}

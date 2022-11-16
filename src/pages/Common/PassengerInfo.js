import { View } from "react-native";
import TextPoppins from "./TextPoppins";
import React from "react";
import { numberWithCommas } from "../../util_meetjam1pagi";

/*
* PassengerInfo {ETicketDetail} Component
*
* this component is used to show passenger information
* */
export function PassengerInfo({ ticketData, isHistory }) {
  return <View style={{
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 15,
  }}>
    {
      [
        ["Nama", ticketData?.passengerName],
        ["Kelas", ticketData?.ticketClass === 0 ? "Ekonomi" : "Bisnis"],
        ["No Tiket", ticketData?.uid?.slice(0, 20) + "..."], //this is potentially lengthy, shows only the first 20 characters
      ].map((el, idx) =>
        <TextPoppins key={idx} style={{
          color:  isHistory ? "grey" : "black",
          marginVertical: 5,
        }}>
          {el[0]}: {el[1]}
        </TextPoppins>,
      )
    }

    <View style={{ height: 1, backgroundColor: "grey", marginHorizontal: -10, marginVertical: 10 }} />

    {
      [
        // DEV WARNING:
        // we dont have this in the backend
        // ["Tanggal Pembayaran Tiket", "Selasa, 10 Mei 2022"],
        ["Harga", "Rp. " + numberWithCommas(ticketData?.price)],
      ].map((el, idx) =>
        <View key={idx} style={{
          flexDirection: "row",
        }}>
          <TextPoppins style={{
            fontType: "semibold",
            fontSize: 12,
            color:  isHistory ? "grey" : "black",
            flex: 1,
          }}>
            {el[0]}
          </TextPoppins>

          <TextPoppins style={{
            fontType: "semibold",
            fontSize: 12,
            color:  isHistory ? "grey" : "black",
          }}>
            {el[1]}
          </TextPoppins>
        </View>,
      )
    }
  </View>;
}

import { Image, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import ETicketAccent from "../../../../assets/ETicketAccent.png";
import React from "react";
import { numberWithCommas } from "../../../../util_meetjam1pagi";

/*
* BookingDetailCard {BookTicketPayment} Component
*
* this component contains the detail of the booking
* */
export function BookingDetailCard({ fullName, ticketClass, ticketNumber, ferry }) {
  return <View style={{
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 30,
  }}>
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 20,
    }}>
      <TextPoppins style={{
        color: "black",
        fontType: "semibold",
        fontSize: 18,
        flex: 1,
      }}>
        Detail Pemesanan
      </TextPoppins>

      <View style={{
        width: 130,
        height: 50,
      }}>
        <Image source={ETicketAccent} style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: "contain",
        }} />
      </View>
    </View>

    <View style={{
      margin: 20,
      marginTop: 0,
    }}>
      {
        [
          ["Nama Pemesan", fullName],
          ["Kelas", ticketClass === 0 ? "Ekonomi" : "Bisnis"],
          ["No Tiket", ticketNumber],
          ["Jumlah", `Rp. ${numberWithCommas(ticketClass === 0 ? ferry.economicPrice : ferry.businessPrice)}`],
        ].map((el, idx) =>
          <View
            key={idx}
            style={{ flexDirection: "row" }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <TextPoppins style={{
                color: "black",
                flex: 1,
              }}>
                {el[0]}
              </TextPoppins>
              <TextPoppins style={{
                color: "black",
              }}>
                :
              </TextPoppins>
            </View>

            <TextPoppins style={{
              color: "black",
              width: 150,
            }}>
              {el[1]}
            </TextPoppins>
          </View>,
        )
      }
    </View>
  </View>;
}

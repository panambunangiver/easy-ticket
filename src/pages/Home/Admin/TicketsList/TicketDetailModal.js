import React from "react";

import { Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import moment from "moment";

/*
* TicketDetailModal {TicketsList} Component
*
* this modals shows up when the user taps on a ticket in the tickets list
* */
const TicketDetailModal = ({ data, onConfirm, onDismiss }) => {
  const tidyKeyed = {
    "Nama Kapal": data.ferryName,
    "Nama Penumpang": data.passengerName,
    "Kelas": data.ticketClass === 0 ? "Ekonomi" : "Bisnis",
    "Nomor Tiket": data.uid,
    "Tanggal Berangkat": moment(data.departureDate).format("DD MMMM YYYY, HH.mm"),
    //DEV WARNING: we dont have this on the backend
    // "Tanggal Pembelian Tiket": data.purchaseDate,
  };

  return (
    <View style={{
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 20,
    }}>
      <TextPoppins style={{
        color: "black",
        fontType: "bolditalic",
        fontSize: 20,
        textAlign: "center",
      }}>
        Detail Tiket
      </TextPoppins>

      {
        Object.keys(tidyKeyed).map((key, index) => {
          return (
            <View key={index} style={{
              flexDirection: "row",
            }}>
              <TextPoppins style={{
                color: "black",
                fontSize: 11,
                width: 130,
              }}>
                {key}
              </TextPoppins>
              <TextPoppins style={{
                color: "black",
                fontSize: 11,
                marginRight: 5,
              }}>
                :
              </TextPoppins>
              <TextPoppins style={{
                color: "black",
                fontType: "bold",
                fontSize: 11,
                flex: 1,
              }}>
                {tidyKeyed[key]}
              </TextPoppins>
            </View>
          );
        })
      }

      <View style={{ flexDirection: "row" }}>
        {
          [
            [
              "Kembali", //label
              onDismiss, //onPress
              "#F97C08", //color
              null //display style
            ],
            //we conditionally set the action button depending on the status of the ticket
            //if the ticket status is 'unpaid', the button would act as a cancel button
            //if the ticket status is 'active', the button would act as a complete voyage button
            [
              data.status === 'active' ? "Tandai Selesai" : "Batalkan Tiket", //label
              () => onConfirm({action: data.status === 'active' ? 'completed' : 'cancelled', data}), //onPress
              data.status === 'active' ? '#68b4e3' : "#F90808", //color
              data.status === 'completed' ? 'none' : null, //display style
            ],
          ].map((el, idx) =>
            <TouchableOpacity
              key={idx}
              style={{
                backgroundColor: el[2],
                borderRadius: 10,
                marginTop: 10,
                flex: 1,
                marginHorizontal: 15,
                paddingVertical: 10,
                display: el[3],
              }}
              onPress={el[1]}
            >
              <TextPoppins style={{ color: "white", textAlign: "center" }}>
                {el[0]}
              </TextPoppins>
            </TouchableOpacity>,
          )
        }
      </View>
    </View>
  );
};

export default TicketDetailModal;

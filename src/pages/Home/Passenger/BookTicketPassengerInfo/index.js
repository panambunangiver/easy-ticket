import React from "react";

import { ScrollView, TouchableOpacity } from "react-native";
import { Header } from "../../../Common/Header";
import { PassengerInfoCard } from "./PassengerInfoCard";
import TextPoppins from "../../../Common/TextPoppins";

/*
* BookTicketPassengerInfo Page Component
*
* This is where passenger enters their full name and their KTP Number
* */
const BookTicketPassengerInfo = ({ navigation, route }) => {
  const [fullName, setFullName] = React.useState("");
  const [ktpNumber, setKtpNumber] = React.useState("");
  const {
    ticketClass,
    schedule,
    ferry,
    source,
    destination,
    date,
    ferryImg,
  } = route.params;

  const lanjutkanBtnHandler = () => {
    //if fullName is empty, only contain spaces, or contain numeric characters
    if (!fullName || !fullName.trim() || /\d/.test(fullName))
      return alert("Nama lengkap tidak boleh kosong atau mengandung angka");

    //if ktpNumber is empty, only contain spaces, or contain non-numeric characters
    if (!ktpNumber || !ktpNumber.trim() || /\D/.test(ktpNumber))
      return alert("Nomor KTP tidak boleh kosong atau mengandung huruf");

    navigation.navigate("BookTicketPayment", {
      fullName,
      ktpNumber,
      ticketClass,
      schedule,
      ferry,
      source,
      destination,
      date,
    });
  };

  return (
    <ScrollView style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <Header {...{ navigation }} title="Data Penumpang" />

      <PassengerInfoCard {...{ fullName, setFullName, ktpNumber, setKtpNumber }} />

      <TouchableOpacity
        style={{
          backgroundColor: "#F97C08",
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 50,
          alignSelf: "center",
          marginTop: 50,
        }}
        onPress={lanjutkanBtnHandler}
      >
        <TextPoppins style={{
          color: "black",
          fontType: "extrabolditalic",
          textAlign: "center",
          textAlignVertical: "center",
        }}>
          Lanjutkan
        </TextPoppins>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookTicketPassengerInfo;

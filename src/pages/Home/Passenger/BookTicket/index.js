import React from "react";

import { ScrollView, TouchableOpacity } from "react-native";
import { Header } from "../../../Common/Header";
import { FerryTicketBookingCard } from "./FerryTicketBookingCard";
import TextPoppins from "../../../Common/TextPoppins";

/*
* BookTicket Page Component
*
* this shows the ferry and schedule information and also gives user option
* to choose the ticket class
* */
const BookTicket = ({ navigation, route }) => {
  const [ticketClass, setTicketClass] = React.useState(0);
  const {
    schedule,
    ferry,
    source,
    destination,
    date,
    ferryImg,
  } = route.params;

  const pesanBtnHandler = () => {
    navigation.navigate("BookTicketPassengerInfo", {
      ticketClass,
      schedule,
      ferry,
      source,
      destination,
      date,
      ferryImg,
    });
  };

  return (
    <ScrollView style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <Header {...{ navigation }} title="Informasi Kapal" />

      <FerryTicketBookingCard {...{ ticketClass, setTicketClass, schedule, ferryImg, source}} />

      <TouchableOpacity
        style={{
          backgroundColor: "#F97C08",
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 60,
          alignSelf: "center",
        }}
        onPress={pesanBtnHandler}
      >
        <TextPoppins style={{
          color: "black",
          fontType: "extrabolditalic",
          fontSize: 16,
          textAlign: "center",
          textAlignVertical: "center",
        }}>
          Pesan
        </TextPoppins>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookTicket;

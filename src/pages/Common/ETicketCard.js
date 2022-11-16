import { View } from "react-native";
import TextPoppins from "./TextPoppins";
import React from "react";
import { CardHeader } from "./CardHeader";
import { TicketInfo } from "./TicketInfo";
import { PassengerInfo } from "./PassengerInfo";

/*
* ETicketCard {ETicketDetail} Component
*
* this houses the card header, ticket info and passenger info
* */
export function ETicketCard({ ticketData, cancelTicket,isHistory }) {
  return <View style={{
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 25,
  }}>
    <CardHeader {...{isHistory}} />

    {
      ticketData?.status === "unpaid" ?
        //only shows the ticket info if the ticket is unpaid
        <>
          <TicketInfo {...{ ticketData, cancelTicket,isHistory }} />
          <View style={{ height: 30 }} />
        </>
        :
        //shows the rest of the info if the ticket is paid
        <>
          <TicketInfo {...{ ticketData,isHistory }} />

          <TextPoppins style={{
            color: isHistory ? "grey" : "black",
            fontType: "italic",
            marginLeft: 15,
            marginTop: 30,
            marginBottom: 5,
          }}>
            Detail Penumpang
          </TextPoppins>

          <PassengerInfo {...{ ticketData, isHistory }} />

          <TextPoppins style={{
            color: isHistory ? "grey" : "black",
            fontType: "italic",
            marginLeft: 15,
            fontSize: 12,
            marginTop: 10,
          }}>
            NOTE:
          </TextPoppins>
          <TextPoppins style={{
            color:  isHistory ? "grey" : "black",
            fontType: "italic",
            marginLeft: 15,
            marginBottom: 15,
            fontSize: 12,
          }}>
            * Mohon datang ke pelabuhan minimal 1 jam sebelum keberangkatan
          </TextPoppins>
        </>
    }
  </View>;
}

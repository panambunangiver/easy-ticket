import React from "react";

import { ScrollView, TouchableOpacity } from "react-native";
import { Header } from "../../../Common/Header";
import TextPoppins from "../../../Common/TextPoppins";
import { BookingDetailCard } from "./BookingDetailCard";
import { CommonActions } from "@react-navigation/native";
import { BACKENDIP, URL_MIDTRANS, KEY_MIDTRANS } from "../../../../constantine";
import uuid from "react-native-uuid";
import { postedologic } from "../../../../util_meetjam1pagi";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* BookTicketPayment Page Component
*
* this is the page where the user is ready to do payment for the ticket.
*
* internally, this is also the page where the orderId (ticketNumber) is created
* */
const BookTicketPayment = ({ navigation, route }) => {
  const [ticketNumber, setTicketNumber] = React.useState("");
  const {
    fullName,
    ktpNumber,
    ticketClass,
    schedule,
    ferry,
    source,
    destination,
    date,
  } = route.params;
  const globalsContext = React.useContext(GlobalsContext);

  //post the ticket data and get ready for MidTrans payment process
  const postTicketData = async paymentToken => {
    if (!paymentToken)
      return alert("Failed to get payment token");

    //holy fuck that's a lot of data to store in the backend
    const response = await fetch(BACKENDIP + "/api/ticket/create", postedologic({
      passengerUid: globalsContext.globalsData.user.uid,
      ferryUid: ferry.uid,
      scheduleUid: schedule.uid,
      passengerName: fullName,
      ferryName: ferry.name,
      departureDate: date,
      ticketClass: ticketClass,
      ticketNumber: ticketNumber,
      ktpNumber: ktpNumber,
      price: ticketClass === 0 ? ferry.economicPrice : ferry.businessPrice,
      source: source,
      destination: destination,
      paymentUrl: paymentToken.redirect_url,
      paymentToken: paymentToken.token,
    }, globalsContext.globalsData.accessToken));

    //something went wrong
    if (!response.ok) {
      const { data } = await response.json();
      console.log(data);
      return alert(data);
    }

    //everything went well, show the message from the backend
    const { data } = await response.json();
    alert(data);

    //navigate to the ticket page and reset the navigation stack
    navigation.dispatch(state => {
      const routes = [
        ...state.routes.slice(0, state.routes.length - 5),
        {
          name: "MidTrans",
          params: {
            ...route.params,
            ticketNumber: ticketNumber,
            paymentUrl: paymentToken.redirect_url,
          },
        },
      ];

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  //tell MidTrans to create a payment token based on our ticketNumber
  //and gives us the redirect_url and token
  const triggerMidtransPayment = async () => {

    //DO. NOT. GO TO MIDTRANS. BEFORE. TICKET NUMBER. IS. GENERATED.
    if (ticketNumber.length < 1) {
      alert("Ticket number hasn't been generated");
      return null
    }

    //request for the payment token
    const response = await fetch(URL_MIDTRANS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + KEY_MIDTRANS,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: ticketNumber,
          gross_amount: ticketClass === 0 ? ferry.economicPrice : ferry.businessPrice,
        },
        credit_card: {
          secure: true,
        },
      }),
    });

    //something went wrong, oh no
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      alert(error);
      return null
    }

    //everything went well, return the payment token
    const paymentToken = await response.json();

    return paymentToken;
  };

  //this button will trigger the chain of events to create the ticket
  const lanjutkanBtnHandler = () =>
    //first get the payment token, then post the ticket data
    triggerMidtransPayment().then(paymentUrl => postTicketData(paymentUrl));

  //ticket number is generated when the page is loaded
  React.useEffect(() => {
    setTicketNumber(uuid.v4());
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "#304875",
        flex: 1,
      }}>
      <Header {...{ navigation }} title="Pembayaran" />

      <BookingDetailCard {...{ fullName, ticketClass, ticketNumber, ferry }} />

      <TouchableOpacity
        style={{
          backgroundColor: "#F97C08",
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 50,
          alignSelf: "center",
          marginTop: 30,
        }}
        onPress={lanjutkanBtnHandler}>
        <TextPoppins
          style={{
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

export default BookTicketPayment;

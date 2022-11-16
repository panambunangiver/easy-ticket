import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../../Common/Header";
import TextPoppins from "../../../Common/TextPoppins";
import ModalContext from "../../../../contexts/ModalContext";
import TicketDetailModal from "./TicketDetailModal";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";
import moment from "moment/moment";

const status = {
  'unpaid': 'Belum dibayar',
  'active': 'Aktif/Sedang berjalan',
  'completed': 'Selesai',
  'cancelled': 'Dibatalkan',
}

/*
* TicketList Page Component
*
* similar to FerryList Page Component, but this one is for tickets
*
* A bit different tho in the way it handles when the user taps on a ticket
* */
const TicketsList = ({ navigation }) => {
  const [tickets, setTickets] = React.useState([]);
  const modalContext = React.useContext(ModalContext);
  const globalsContext = React.useContext(GlobalsContext);

  const getTickets = async () => {
    const response = await fetch(BACKENDIP + '/api/ticket/getAll', postedologic({
      status: ['unpaid', 'active']
    }, globalsContext.globalsData.accessToken))

    if(!response.ok) {
      const { data } = await response.json();
      console.log(data)
      return alert(data)
    }

    const { data } = await response.json();
    setTickets(data);
  }

  //this is the function that will be called when user taps an action button
  //in the ticket detail modal
  const modalActionHandler = async returnedData => {
    const { action, data } = returnedData;

    //must be a correct action, else return
    if(action !== 'completed' && action !== 'cancelled')
      return;

    //request to the backend to update the ticket status based on the action
    const response = await fetch(BACKENDIP + '/api/ticket/changeStatus', postedologic({
      ticketNumber: data.uid,
      status: action,
      userUid: globalsContext.globalsData.user.uid,
    }, globalsContext.globalsData.accessToken))

    //something went wrong
    if(!response.ok) {
      const { data } = await response.json();
      console.log(data)
      return alert(data)
    }

    //everything went well
    const { data: responseData } = await response.json();

    alert(responseData)

    //refresh the ticket list
    getTickets();
  }

  //this shows the ticket detail modal when user taps on a ticket
  const showTicketDetailModal = selectedTicket => {
    modalContext.setPage(
      <TicketDetailModal
        data={selectedTicket}
        onConfirm={returnedData => {
          modalActionHandler(returnedData);

          modalContext.setPage(null);
          modalContext.setVisible(false);
        }}
        onDismiss={() => {
          modalContext.setPage(null);
          modalContext.setVisible(false);
        }}
      />,
    );

    modalContext.setVisible(true);
  };

  //upon mounting, get the tickets list
  React.useEffect(() => navigation.addListener('focus', () => {
    getTickets();
  }), [navigation]);

  return (
    <ScrollView style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <Header {...{ navigation }} title="Daftar Tiket" />

      {
        tickets && tickets.map((el, idx) =>
          <TouchableOpacity
            key={idx}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
            onPress={() => showTicketDetailModal(el)}
          >
            {
              [
                ["Nama Kapal", el.ferryName],
                ["Nama Penumpang", el.passengerName],
                ["Kelas", el.ticketClass === 0 ? "Ekonomi" : "Bisnis"],
                ["No Tiket", el?.uid?.substring(0, 20) + '...'], //potentially lengthy, show only the first 20 characters
                                                                 //we'll show the rest when user taps on the ticket
                ["Tanggal Berangkat", el.departureDate && moment(el.departureDate).format("DD MMMM YYYY, HH.mm")],
                ['Status', el.status ? status[el.status] : ''],
                // ["Tanggal Pembelian Tiket", el.purchaseDate],
              ].map((el, idx2) =>
                <View key={idx2} style={{ flexDirection: "row" }}>
                  <TextPoppins style={{ color: "black", flex: 1 }}>
                    {el[0]}
                  </TextPoppins>
                  <TextPoppins style={{ color: "black", flex: 1, fontType: "medium" }}>
                    {el[1]}
                  </TextPoppins>
                </View>,
              )
            }
          </TouchableOpacity>,
        )
      }
    </ScrollView>
  );
};

export default TicketsList;

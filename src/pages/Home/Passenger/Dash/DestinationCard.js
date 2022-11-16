import { TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import React from "react";
import PolymorphicForm from "../../../Common/PolymorphicForm";
import ArrowDown from "../../../../assets/ArrowDown.svg";
import Calendar from "../../../../assets/Calendar.svg";
import ModalContext from "../../../../contexts/ModalContext";
import DestinationModal from "./DestinationModal";
import BoardingDateModal from "./BoardingDateModal";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* DestinationCard {Dash} Component
*
* Component that shows up card containing form for source, destination, and boarding date
* */
export function DestinationCard() {
  const [source, setSource] = React.useState("Manado");
  const [destination, setDestination] = React.useState("");
  const [date, setDate] = React.useState(null);
  const modalContext = React.useContext(ModalContext);
  const globalsContext = React.useContext(GlobalsContext);
  const navigation = useNavigation();

  //this opens up the destination modal
  const showDestinationModal = () => {
    modalContext.setPage(
      <DestinationModal
        data={{ selectedDestination: destination }}
        onDismiss={() => {
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
        onConfirm={selectedDestination => {
          setDestination(selectedDestination);
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
      />,
    );
    modalContext.setVisible(true);
  };

  //this opens up the boarding date modal
  const showDateModal = () => {
    modalContext.setPage(
      <BoardingDateModal
        data={{ selectedDate: date, selectedDestination: destination }}
        onDismiss={() => {
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
        onConfirm={selectedDate => {
          setDate(selectedDate);
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
      />,
    );
    modalContext.setVisible(true);
  };

  //function to check if user currently have an active or payment pending booking
  const isUserHaveActiveBooking = async () => {
    //request to backend for user's latest active booking
    const response = await fetch(BACKENDIP + "/api/ticket/getLatestActive", postedologic({
      userUid: globalsContext.globalsData.user.uid,
    }, globalsContext.globalsData.accessToken));

    //something went wrong
    if (!response.ok) {
      const { data } = await response.json();
      // DEV WARNING: commenting this out. it's annoying
      // alert("Unable to determine if user currently have active booking\n\nServer Response: ", data);
      return false;
    }

    //get the response
    const { data } = await response.json();

    //if the response only contains the string "No data", then user currently have no active booking
    if (data === "No data")
      return false;

    //if the response contains data, then user currently have an active booking
    return true;
  };

  //this will get called when user press the 'Cari Kapal' button
  const findShipBtnHandler = async () => {
    //make sure the source isn't empty
    if (!source.trim())
      return alert("Silahkan masukkan pelabuhan asal keberangkatan anda");

    //make sure the destination isn't empty
    if (!destination.trim())
      return alert("Silahkan masukkan pelabuhan tujuan anda");

    //make sure the date isn't empty
    if (!date)
      return alert("Silahkan memilih tanggal keberangkatan anda");

    const userHaveActiveBooking = await isUserHaveActiveBooking();

    if (userHaveActiveBooking)
      return alert("Saat ini Anda sudah memiliki pemesanan tiket. Silahkan cek di E-Ticket tab");

    navigation.navigate("FerryList", { source, destination, date: moment(date).format() });
  };

  return <View style={{
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
  }}>
    {
      [
        {
          upperText: "Asal",
          value: source,
          setValue: setSource,
          placeholder: "Manado",
          isTextInput: false,
          onPress: null,
          RightIcon: <></>,
        },
        {
          upperText: "Tujuan",
          value: destination ? destination : "Masukkan tujuan",
          setValue: setDestination,
          placeholder: "Jakarta",
          isTextInput: false,
          onPress: showDestinationModal,
          RightIcon: <ArrowDown height="100%" width="100%" />,
        },
        {
          upperText: "Tanggal",
          value: date ? moment(date).format("DD MMMM YYYY") : "Masukkan tanggal keberangkatan",
          setValue: setDate,
          placeholder: "Pilih Tanggal",
          isTextInput: false,
          onPress: showDateModal,
          RightIcon: <Calendar height="100%" width="100%" />,
        },
      ].map((field, index) =>
        <View style={{ marginBottom: 15 }}>
          <PolymorphicForm key={index} {...field} />
        </View>,
      )
    }

    <TouchableOpacity
      style={{
        backgroundColor: "#5EBEF4",
        marginHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 10,
      }}
      onPress={findShipBtnHandler}
    >
      <TextPoppins style={{
        color: "black",
        fontType: "bold",
        textAlign: "center",
      }}>
        Cari Kapal
      </TextPoppins>
    </TouchableOpacity>
  </View>;
}

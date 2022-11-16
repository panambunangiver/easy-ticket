import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../../Common/Header";
import PolymorphicForm from "../../../Common/PolymorphicForm";
import ArrowDown from "../../../../assets/ArrowDown.svg";
import Calendar from "../../../../assets/Calendar.svg";
import Clock from "../../../../assets/Clock.svg";
import TextPoppins from "../../../Common/TextPoppins";
import ModalContext from "../../../../contexts/ModalContext";
import FerrySelectModal from "./FerrySelectModal";
import DepartureDaysModal from "./DepartureDaysModal";
import DestinationSelectModal from "./DestinationSelectModal";
import { datesToFormattedString, postedologic } from "../../../../util_meetjam1pagi";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import { BACKENDIP } from "../../../../constantine";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* AddFerrySchedule Page Component
*
* similar to AddFerry Page Component, but it's for adding ferries schedules
* */
const AddFerrySchedule = ({ navigation, route }) => {
  const [selectedShip, setSelectedShip] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [departureDays, setDepartureDays] = React.useState(null);
  const [departureTime, setDepartureTime] = React.useState(null);
  const modalContext = React.useContext(ModalContext);
  const globalsContext = React.useContext(GlobalsContext);

  //handle adding a new schedule
  const tambahJadwalBtnHander = async () => {
    if (!selectedShip)
      return alert("Pilih kapal terlebih dahulu");

    if (!destination)
      return alert("Pilih tujuan terlebih dahulu");

    if (!departureDays)
      return alert("Pilih hari keberangkatan terlebih dahulu");

    if (!departureTime)
      return alert("Pilih waktu keberangkatan terlebih dahulu");

    //send request to backend
    const response = await fetch(BACKENDIP + "/api/schedule/create", postedologic({
      shipName: selectedShip.name,
      shipUid: selectedShip.uid,
      destination: destination,
      departureDays: departureDays,
      departureTime: moment(departureTime).format(),
    }, globalsContext.globalsData.accessToken));

    //something wrong
    if (!response.ok) {
      const { data } = await response.json();
      console.log(data);
      return alert(data);
    }

    //everything's fine
    const { data } = await response.json();
    alert(data);

    navigation.goBack();
  };

  //handle editing a schedule
  const editJadwalBtnHandler = async () => {
    if (!selectedShip)
      return alert("Pilih kapal terlebih dahulu");

    if (!destination)
      return alert("Pilih tujuan terlebih dahulu");

    if (!departureDays)
      return alert("Pilih hari keberangkatan terlebih dahulu");

    if (!departureTime)
      return alert("Pilih waktu keberangkatan terlebih dahulu");

    //send request to backend
    const response = await fetch(BACKENDIP + "/api/schedule/update", postedologic({
      uid: route.params.uid,
      shipName: selectedShip.name,
      shipUid: selectedShip.uid,
      destination: destination,
      departureDays: departureDays,
      departureTime: moment(departureTime).format(),
    }, globalsContext.globalsData.accessToken));

    //something wrong
    if (!response.ok) {
      const { data } = await response.json();
      console.log(data);
      return alert(data);
    }

    //everything's fine
    const { data } = await response.json();
    alert(data);

    navigation.goBack();
  };

  //handle deleting a schedule
  const deleteJadwalBtnHandler = async () => {
    //send request to backend
    const response = await fetch(BACKENDIP + "/api/schedule/delete", postedologic({
      uid: route.params.uid,
    }, globalsContext.globalsData.accessToken));

    //something wrong
    if (!response.ok) {
      const { data } = await response.json();
      console.log(data);
      return alert(data);
    }

    //everything's fine
    const { data } = await response.json();
    alert(data);

    navigation.goBack();
  };

  //show modal for selecting a ferry
  const showFerrySelectModal = () => {
    modalContext.setPage(
      <FerrySelectModal
        data={selectedShip}
        onDismiss={() => {
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
        onConfirm={chosenFerry => {
          setSelectedShip(chosenFerry);
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
      />,
    );

    modalContext.setVisible(true);
  };

  //show modal for selecting a destination
  const showDestinationSelectModal = () => {
    modalContext.setPage(
      <DestinationSelectModal
        data={destination}
        onDismiss={() => {
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
        onConfirm={chosenDestination => {
          setDestination(chosenDestination);
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
      />,
    );

    modalContext.setVisible(true);
  };

  //show modal for selecting departure days
  const showDepartureDaysSelectModal = () => {
    modalContext.setPage(
      <DepartureDaysModal
        data={departureDays}
        onDismiss={() => {
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
        onConfirm={chosenDepartureDays => {
          setDepartureDays(chosenDepartureDays);
          modalContext.setVisible(false);
          modalContext.setPage(null);
        }}
      />,
    );

    modalContext.setVisible(true);
  };

  //show modal for selecting departure time
  const showDepartureTimePicker = async () =>
    DateTimePickerAndroid.open({

      //if we have a departure time, use it, otherwise use current time
      value: (departureTime && moment(departureTime).toDate()) || new Date(),

      onChange: (evt, date) => {
        if (date) {
          setDepartureTime(date);
        }
      },

      //only time
      mode: "time",

      is24Hour: true,
    });

  //upon mounting, check if we're editing a schedule
  //if so, populate the fields with the schedule's data
  React.useEffect(() => navigation.addListener("focus", () => {
    if (route?.params?.isEdit) {
      setSelectedShip({
        name: route.params.shipName,
        uid: route.params.shipUid,
      });
      setDestination(route.params.destination);
      setDepartureDays(route.params.departureDays);
      setDepartureTime(route.params.departureTime);
    }
  }), [navigation]);

  return (
    <ScrollView style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <Header {...{ navigation }} title={`${route?.params?.isEdit ? "Edit" : "Tambah"} Jadwal Kapal`} />

      {
        [
          [
            "Nama Kapal",
            selectedShip ? selectedShip?.name : "Tidak ada kapal dipilih",
            setSelectedShip,
            "Pilih Kapal",
            false,
            showFerrySelectModal,
            <ArrowDown height="100%" width="100%" />,
            true,
          ],
          [
            "Tujuan",
            destination ? destination : "Tidak ada tujuan dipilih",
            setDestination,
            "Pilih Tujuan",
            false,
            showDestinationSelectModal,
            <ArrowDown height="100%" width="100%" />,
            true,
          ],
          [
            "Hari Berangkat",
            departureDays ? datesToFormattedString(departureDays) : "Tidak ada hari keberangkatan",
            setDepartureDays,
            "Pilih Hari",
            false,
            showDepartureDaysSelectModal,
            <Calendar height="100%" width="100%" />,
            true,
          ],
          [
            "Jam Berangkat",
            departureTime ? moment(departureTime).format("HH:mm") : "Tidak ada jam keberangkatan",
            setDepartureTime,
            "Pilih Jam",
            false,
            showDepartureTimePicker,
            <Clock height="100%" width="100%" />,
            true,
          ],
        ].map((el, idx) =>
          <View key={idx} style={{
            marginTop: 15,
            marginHorizontal: 25,
          }}>
            <PolymorphicForm
              key={idx}
              upperText={el[0]}
              value={el[1]}
              setValue={el[2]}
              placeholder={el[3]}
              isTextInput={el[4]}
              onPress={el[5]}
              RightIcon={el[6]}
              isBackgroundWhite={el[7]}
            />
          </View>,
        )
      }

      <TouchableOpacity
        style={{
          backgroundColor: "#F97C08",
          alignSelf: "center",
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 30,
          marginTop: 30,
        }}
        onPress={route?.params?.isEdit ? editJadwalBtnHandler : tambahJadwalBtnHander}
      >
        <TextPoppins style={{
          color: "white",
          fontType: "semibold",
        }}>
          {route?.params?.isEdit ? "Edit" : "Tambah"} Jadwal
        </TextPoppins>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          alignSelf: "center",
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 30,
          marginTop: 20,
          display: route?.params?.isEdit ? null : "none",
        }}
        onPress={deleteJadwalBtnHandler}
      >
        <TextPoppins style={{
          color: "white",
          fontType: "semibold",
        }}>
          Hapus Jadwal
        </TextPoppins>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddFerrySchedule;

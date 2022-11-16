import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { easeOut, fixDay, lerp, postedologic } from "../../../../util_meetjam1pagi";
import TextPoppins from "../../../Common/TextPoppins";
import CalendarPicker from "react-native-calendar-picker";
import { BACKENDIP } from "../../../../constantine";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* BoardingDateModal {Dash} Component
*
* This component is the modal that pops up when the user clicks on the date input field
* */
const BoardingDateModal = ({ data, onDismiss, onConfirm }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [ferriesSchedulesDays, setFerriesSchedulesDays] = React.useState([]);
  const globalsContext = React.useContext(GlobalsContext);
  const { selectedDestination } = data;

  //we fetch the ferries schedules for the selected destination to colorize the dates coinciding with ferries schedules
  const getFerriesSchedulesDays = async () => {
    const response = await fetch(BACKENDIP + "/api/schedule/getFerriesScheduleDays", postedologic({
      destination: selectedDestination,
    }, globalsContext.globalsData.accessToken));

    if (!response.ok) {
      const { data } = await response.json();
      return alert(data);
    }

    const { data } = await response.json();
    setFerriesSchedulesDays(data);
  };

  //function that handles when user is confirming a date
  const onConfirmHandler = () => {
    //if the user hasn't selected a date, we return an alert
    if (!selectedDate) return alert("Pilih tanggal");

    //we call the onConfirm callback and returns the selected date back to the parent component
    onConfirm(selectedDate);
  };

  //upon mounting, we fetch the ferries schedules for the selected destination
  React.useEffect(() => {
    getFerriesSchedulesDays();
  }, []);

  return (
    <View style={{
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 50,
      overflow: "hidden",
    }}>
      <ScrollView>
        <CalendarPicker
          selectedStartDate={selectedDate}
          onDateChange={date => setSelectedDate(date)}
          width={260}
          customDatesStyles={date => {
            //we check if the date is in the ferries schedules days
            if (ferriesSchedulesDays.includes(date.isoWeekday()-1)) {
              //if it is, we color the date with yellow
              return ({
                style: {
                  backgroundColor: "yellow",
                },
              });
            }
          }}
          textStyle={{
            fontSize: 16,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={onConfirmHandler}
        >
          <TextPoppins style={{
            color: "black",
            textAlign: "center",
            fontType: "semibold",
          }}>Pilih</TextPoppins>
        </TouchableOpacity>

        <View style={{ height: 10 }} />

        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={onDismiss}
        >
          <TextPoppins style={{
            color: "white",
            textAlign: "center",
            fontType: "semibold",
          }}>Batal</TextPoppins>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BoardingDateModal;

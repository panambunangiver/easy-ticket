import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";

/*
* DepartureDaysModal {AddFerrySchedule} Component
*
* this component is used to display the days of the week for user to select
* */
const DepartureDaysModal = ({ data, onDismiss, onConfirm }) => {
  const [selectedDays, setSelectedDays] = React.useState([]);

  //if there's data passed in, set the selected days to the data
  React.useEffect(() => {
    if (data)
      setSelectedDays(data);
  }, []);

  return (
    <ScrollView>
      {/* this is to prevent the modal from being too close to the top of the screen */}
      <View style={{ height: 150 }} />

      <View style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 50,
      }}>
        {
          ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
            .map((el, idx) =>
              <TouchableOpacity
                key={idx}

                //this code below handles selecting and unselecting the days
                onPress={() => {
                  //make a copy of the selected days, because we're gonna be sorting it.
                  //we don't want to mutate the state directly
                  const newSelectedDays = [...selectedDays];

                  //if the day is already selected, remove it
                  if (newSelectedDays.includes(idx)) {
                    newSelectedDays.splice(newSelectedDays.indexOf(idx), 1);
                  }
                  //if the day is not selected, add it
                  else {
                    newSelectedDays.push(idx);
                  }

                  //sort the days
                  newSelectedDays.sort();

                  //set the selected days
                  setSelectedDays(newSelectedDays);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eaeaea",
                }}
              >
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: selectedDays.includes(idx) ? "#f5a623" : "#eaeaea",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}>
                  {
                    selectedDays.includes(idx) && <View style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#f5a623",
                    }} />
                  }
                </View>

                <TextPoppins style={{
                  color: "black",
                  fontType: selectedDays.includes(idx) ? "semibold" : "regular",
                }}
                >{el}</TextPoppins>
              </TouchableOpacity>,
            )
        }


        {
          [
            ["Tetapkan", () => onConfirm(selectedDays), "#c0ffa8"],
            ["Batal", onDismiss, "#ffc0bd"],
          ].map((el, idx) =>
            <TouchableOpacity
              key={idx}
              style={{
                height: 40,
                backgroundColor: el[2],
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginTop: 5,
              }}
              onPress={el[1]}
            >
              <TextPoppins style={{
                color: "black",
                fontType: "bold",
              }}>
                {el[0]}
              </TextPoppins>
            </TouchableOpacity>,
          )
        }
      </View>
    </ScrollView>
  );
};

export default DepartureDaysModal;

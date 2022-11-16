import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import TextualInputGroup from "../../../Common/TextualInputGroup";
import Lister from "../../../Common/Lister";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";

/*
* DestinationSelectModal {AddFerrySchedule} Component
*
* This component is used to select the destination of the ferry schedule
* */
const DestinationSelectModal = ({ data, onDismiss, onConfirm }) => {
  const [selectedDestination, setSelectedDestination] = React.useState(null);
  const [typedDestination, setTypedDestination] = React.useState("");
  const [destinations, setDestinations] = React.useState([]);
  const globalsContext = React.useContext(GlobalsContext);

  const getDestinations = async () => {
    const response = await fetch(BACKENDIP + "/api/schedule/getDestinations", postedologic(
      {}, //empty body, because this a POST method even though we're just getting data without any parameter
      globalsContext.globalsData.accessToken));

    if (!response.ok)
      return alert("Gagal mengambil data destinasi");

    const { data } = await response.json();
    setDestinations(data);
  };

  //upon mounting, get the destinations list
  React.useEffect(() => {
    getDestinations();

    //if there's data, set the selected destination to the data
    if (data)
      setSelectedDestination(data);
  }, []);

  return (
    <ScrollView>
      {/* this is to make the modal scrollable */}
      <View style={{ height: 80 }} />

      <View style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 50,
      }}>
        <TextualInputGroup
          value={typedDestination}
          setValue={value => {
            setTypedDestination(value);

            if (selectedDestination)
              //reset the selected destination (that came from the lister) if the user types something
              setSelectedDestination(null);
          }}
          validator={value => value.length > 0 && selectedDestination === null}
          upperLabel="Ketik destinasi disini"
          upperLabelTextColor="black"
          upperLabelFontSize={14}
          bottomSpacing={10}
          isBlack
        />

        <TextPoppins style={{
          color: "black",
        }}>
          atau pilih dari daftar dibawah ini
        </TextPoppins>

        <View style={{
          borderRadius: 10,
          maxHeight: 300,
          overflow: "hidden",
          marginBottom: 20,
        }}>
          <Lister
            listData={destinations}
            currentSelectedItem={selectedDestination}
            onItemPress={item => {
              setSelectedDestination(item);

              //reset the typed destination (that came from the text input) if the user selects from the list
              setTypedDestination("");
            }}
            renderItem={(item, idx) =>
              <TextPoppins style={{
                color: "black",
                fontSize: 16,
                fontType: selectedDestination === item ? "bold" : "regular",
              }}>
                {item}
              </TextPoppins>
            }
            keyExtractor={item => item}
          />
        </View>

        {
          [
            ["Tetapkan", () => onConfirm(
              //if the user selected from the list, use the selected destination, otherwise use the typed destination
              selectedDestination ? selectedDestination : typedDestination,
            ), "#c0ffa8"],
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

export default DestinationSelectModal;

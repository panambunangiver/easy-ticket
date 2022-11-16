import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import { easeIn, easeOut, flip, lerp, postedologic } from "../../../../util_meetjam1pagi";
import { BACKENDIP } from "../../../../constantine";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import Lister from "../../../Common/Lister";

/*
* DestinationModal {Dash} Component
*
* This component is the modal that pops up when the user clicks on destination input field
* */
const DestinationModal = ({ data, onDismiss, onConfirm }) => {
  const [selected, setSelected] = React.useState("");
  const [destinations, setDestinations] = React.useState([]);
  const globalsContext = React.useContext(GlobalsContext);

  //fetch destinations from backend
  const getDestinations = async () => {
    const response = await fetch(BACKENDIP + "/api/schedule/getDestinations", postedologic(
      {}, globalsContext.globalsData.accessToken));

    if (!response.ok) {
      const { data } = await response.json();
      return alert(data);
    }

    const { data } = await response.json();
    setDestinations(data);
  };

  //function that handles when user is confirming the destination
  const onConfirmHandler = () => {
    //if user has not selected any destination, return an alert
    if (selected === "") return alert("Pilih destinasi dulu");

    //call onConfirm callback and pass the selected destination back to parent component
    onConfirm(selected);
  };

  //fetch destinations when component is mounted
  React.useEffect(() => {
    getDestinations();
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

        <View style={{ borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
          <Lister
            listData={destinations}
            currentSelectedItem={selected}
            onItemPress={setSelected}
            renderItem={(item, idx) => (
              <TextPoppins style={{
                fontSize: 16,
                color: "black",
                paddingVertical: 10,
                fontType: selected === item ? "bold" : null,
              }}>{item}</TextPoppins>
            )}
            keyExtractor={item => item}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={onConfirmHandler}
        >
          <TextPoppins style={{ color: "black", fontType: "semibold", textAlign: "center" }}>Pilih</TextPoppins>
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
          <TextPoppins style={{ color: "white", fontType: "semibold", textAlign: "center" }}>Batal</TextPoppins>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DestinationModal;

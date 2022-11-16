import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import Lister from "../../../Common/Lister";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* FerrySelectModal {AddFerrySchedule} Component
*
* this component is used to select ferry from the list of ferry
* */
const FerrySelectModal = ({ data, onDismiss, onConfirm }) => {
  const [selectedShip, setSelectedShip] = React.useState(null);
  const [ferries, setFerries] = React.useState([]);
  const globalsContext = React.useContext(GlobalsContext);

  const getFerries = async () => {
    const response = await fetch(BACKENDIP + "/api/ferry/getAll", postedologic(
      {}, globalsContext.globalsData.accessToken));

    if (!response.ok)
      return alert("Gagal mengambil daftar kapal");

    const { data } = await response.json();
    setFerries(data);
  };

  //upon mounting, fetch ferries
  React.useEffect(() => {
    getFerries();

    //if data is passed, set selected ship to data
    if (data)
      setSelectedShip(data);
  }, []);

  return (
    <View style={{
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 50,
    }}>
      <View style={{
        borderRadius: 10,
        maxHeight: 300,
        overflow: "hidden",
        marginBottom: 20,
      }}>
        {
          ferries &&
          <Lister
            listData={ferries}
            currentSelectedItem={selectedShip}
            onItemPress={setSelectedShip}
            renderItem={(item, idx) => (
              <TextPoppins style={{
                color: "black",
                fontSize: 16,
                fontType: selectedShip?.uid === item?.uid ? "bold" : "regular",
              }}>
                {item.name}
              </TextPoppins>
            )}
            keyExtractor={item => item?.uid}
          />
        }
      </View>

      {
        [
          ["Tetapkan", () => onConfirm(selectedShip), "#c0ffa8"],
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
  );
};

export default FerrySelectModal;

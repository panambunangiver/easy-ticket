import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Header } from "../../../Common/Header";
import TextPoppins from "../../../Common/TextPoppins";
import { FerryCardAdmin } from "./FerryCardAdmin";
import AddKapalIcon from "../../../../assets/AddKapalIcon.svg";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* FerryList Page Component
*
* this shows the list of ferries registerd in the system and also button
* to register new ferry
* */
const FerryList = ({ navigation }) => {
  const [ferriesList, setFerriesList] = React.useState([]);
  const globalsContext = React.useContext(GlobalsContext);

  //function to get the ferries list
  const getFerries = async () => {
    const response = await fetch(BACKENDIP + "/api/ferry/getAll", postedologic(
      {}, //empty body because this endpoint isn't a GET method, it's a POST
      globalsContext.globalsData.accessToken));

    //something went wrong while getting the list
    if (!response.ok) {
      const { data } = await response.json();
      return alert(data);
    }

    //get the list
    const { data } = await response.json();

    //set the local state to the list
    setFerriesList(data);
  };

  //this is the function that handles when user tapped on one of the ferries
  const ferryItemOnPress = ferry =>
    navigation.navigate("AdminAddFerry", {
      ...ferry,
      //we go to the AdminAddFerry, but it's the 'Editing' version of the page
      isEdit: true,
    })

  //get the ferries list when the page is loaded
  React.useEffect(() => navigation.addListener("focus", () => {
    getFerries();
  }), [navigation]);

  return (
    <View style={{ backgroundColor: "#304875", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header {...{ navigation }} title="Daftar Kapal" />
        {ferriesList.map((el) => (
          <TouchableOpacity
            key={el.uid}
            onPress={() => ferryItemOnPress(el)}
          >
            <FerryCardAdmin
              listKey={el.uid}
              name={el.name}
              priceEkonomi={el.economicPrice}
              priceBusiness={el.businessPrice}
              uid={el.uid}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
        <View style={{flex: 1}}/>
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminAddFerry")}
          style={{
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            marginRight: -20,
            paddingRight: 30,
            paddingVertical: 10,
          }}>
          <AddKapalIcon width={10} />
          <TextPoppins
            style={{
              color: "black",
              fontType: "semibolditalic",
              fontSize: 14,
              marginLeft: 4,
            }}>
            Tambah Kapal
          </TextPoppins>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FerryList;

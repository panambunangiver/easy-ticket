import React from "react";

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import { Header } from "../../../Common/Header";
import { BACKENDIP } from "../../../../constantine";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { postedologic } from "../../../../util_meetjam1pagi";

/*
* FerryDetail Page Component
*
* shows the image and description of the ferry
* */
const FerryDetail = ({ navigation, route }) => {
  const [ferryImage, setFerryImage] = React.useState("");
  const [ferryData, setFerryData] = React.useState(null);
  const globalsContext = React.useContext(GlobalsContext);

  const getFerryData = async () => {
    const response = await fetch(BACKENDIP + "/api/ferry/get", postedologic({
      uid: route.params.schedule.shipUid,
    }, globalsContext.globalsData.accessToken));

    if (!response.ok) {
      const { data } = await response.json();
      return alert(data);
    }

    const { data } = await response.json();
    setFerryData(data);
  };

  //we get the ferry image in seperate request
  const getFerryImage = async () => {
    const response = await fetch(BACKENDIP + "/api/ferry/getImage", postedologic({
      uid: route.params.schedule.shipUid,
    }, globalsContext.globalsData.accessToken));

    if (response.status !== 200)
      return;

    const image = await response.text();
    setFerryImage(image);
  };

  //navigates to BookTicket when user clicks on the button
  const pesanBtnHandler = () => {
    navigation.navigate("BookTicket", {
      schedule: route.params.schedule,
      ferry: ferryData,
      source: route.params.source,
      destination: route.params.destination,
      date: route.params.date,
      ferryImg: ferryImage, //pass the image too so we don't have to fetch it again
    });
  };

  React.useEffect(() => navigation.addListener("focus", () => {
    //make sure to get the ferry data first before getting the image
    //DEV WARNING: idk why this works. because when getting the ticket transaction status
    //             on ETicketDetail, this a().then(() => b()) technique doesn't work.
    //POSSIBLE FIX: put getFerryImage into a useEffect with ferryData as dependency
    getFerryData().then(() => getFerryImage());
  }), [navigation]);

  return (
    <ScrollView style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <Header {...{ navigation }} title={route.params.schedule.shipName} />

      <View style={{
        height: 280,
        marginHorizontal: 25,
        borderRadius: 10,
        backgroundColor: "white",
        overflow: 'hidden',
      }}>
        <Image
          source={{ uri: "data:image/png;base64," + ferryImage }}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
          }}
        />
      </View>

      <View style={{
        backgroundColor: "white",
        marginHorizontal: 50,
        marginTop: 20,
        borderRadius: 30,
        overflow: "hidden",
        padding: 20,
        paddingHorizontal: 15,
      }}>
        <TextPoppins style={{
          textAlign: "center",
          color: "black",
          fontType: "semibold",
          fontSize: 18,
        }}>Deskripsi Kapal</TextPoppins>

        <TextPoppins style={{
          textAlign: "center",
          color: "black",
          marginTop: 20,
          lineHeight: 25,
        }}>
          {ferryData?.description}
        </TextPoppins>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#F97C08",
          marginHorizontal: 25,
          marginTop: 20,
          borderRadius: 10,
          overflow: "hidden",
          alignSelf: "center",
          paddingHorizontal: 60,
          paddingVertical: 10,
          marginBottom: 80,
        }}
        onPress={pesanBtnHandler}
      >
        <TextPoppins
          style={{
            color: "black",
            fontType: "semibolditalic",
            fontSize: 18,
          }}
        >Pesan</TextPoppins>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FerryDetail;

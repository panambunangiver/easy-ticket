import React from "react";
import TextPoppins from "../../../Common/TextPoppins";
import { Image, TouchableOpacity, View } from "react-native";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { BACKENDIP } from "../../../../constantine";
import { datesToFormattedString, postedologic } from "../../../../util_meetjam1pagi";
import moment from "moment";

/*
* FerryCardSchedulesAdmin {FerrySchedules} Component
*
* similar to FerryCardAdmin {FerryList} Component, but this one is for schedules
* */
export function FerryCardScheduleAdmin({
                                         schedule,
                                         onPress,
                                       }) {
  const [ferryImg, setFerryImg] = React.useState("");
  const globalsContext = React.useContext(GlobalsContext);

  React.useEffect(() => {
    fetch(BACKENDIP + "/api/ferry/getImage", postedologic({
      uid: schedule.shipUid,
    }, globalsContext.globalsData.accessToken))
      .then(resp => resp.text())
      .then(image => setFerryImg(image));
  }, [schedule.uid]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        padding: 10,
        margin: 30,
        borderRadius: 10,
        flexDirection: "row",
      }}
      onPress={() => onPress(schedule)}
    >
      {/*Ferry Image*/}
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 999,
          backgroundColor: "grey",
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: "data:image;base64," + ferryImg }}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
          }}
        />
      </View>

      {/*Ferry Details*/}
      <View
        style={{
          justifyContent: "space-between",
          // paddingVertical: 5,
          // backgroundColor: 'red',
          flex: 1,
        }}>
        <TextPoppins
          style={{
            fontSize: 18,
            fontType: "extrabolditalic",
            marginLeft: 10,
            color: "black",
          }}>
          {schedule.shipName}
        </TextPoppins>
        <TextPoppins
          style={{
            fontSize: 14,
            marginLeft: 10,
            color: "black",
          }}>
          {datesToFormattedString(schedule.departureDays)}
        </TextPoppins>
        <TextPoppins
          style={{
            fontSize: 14,
            marginLeft: 10,
            color: "black",
          }}>
          Jam Berangkat {moment(schedule.departureTime).format("HH:mm")} WITA
        </TextPoppins>
      </View>
    </TouchableOpacity>
  );
}

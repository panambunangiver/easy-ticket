import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Header } from "../../../Common/Header";
import { FerryCardScheduleAdmin } from "./FerryCardSchedulesAdmin";
import AddKapalIcon from "../../../../assets/AddKapalIcon.svg";
import TextPoppins from "../../../Common/TextPoppins";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { BACKENDIP } from "../../../../constantine";
import { datesToFormattedString, postedologic } from "../../../../util_meetjam1pagi";
import moment from "moment";

/*
* FerrySchedules Page Component
*
* similar to FerryList Page Component, but for the ferry schedules
* */
const FerrySchedules = ({ navigation }) => {
  const [schedulesList, setSchedulesList] = React.useState([]);
  const globalsContext = React.useContext(GlobalsContext);

  const getSchedules = async () => {
    const response = await fetch(BACKENDIP + "/api/schedule/getAll", postedologic(
      {}, globalsContext.globalsData.accessToken));

    if (response.status !== 200) {
      const { data } = await response.json();
      return alert(data);
    }

    const { data } = await response.json();
    setSchedulesList(data);
  };

  const scheduleItemOnPress = schedule =>
    navigation.navigate("AdminAddFerrySchedule", {
      ...schedule,
      isEdit: true,
    });

  React.useEffect(() => navigation.addListener("focus", () =>
    getSchedules(),
  ), [navigation]);

  return (
    <View
      style={{
        backgroundColor: "#304875",
        flex: 1,
      }}>
      <ScrollView>
        <Header {...{ navigation }} title="Jadwal Kapal" />
        {schedulesList.map((el, index) => (
          <FerryCardScheduleAdmin
            key={el.uid}
            schedule={el}
            onPress={scheduleItemOnPress}
          />
        ))}
      </ScrollView>
      <View style={{ paddingBottom: 10, flexDirection: "row" }}>
        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => navigation.navigate("AdminAddFerrySchedule")}
          style={{
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            height: 48,
            alignItems: "center",
            paddingHorizontal: 5,
            marginRight: -15,
            paddingRight: 30,
            paddingLeft: 20,
          }}>
          <AddKapalIcon width={10} />
          <TextPoppins
            style={{
              color: "black",
              fontType: "semibolditalic",
              fontSize: 14,
              marginLeft: 10,
            }}>
            Tambah Jadwal
          </TextPoppins>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FerrySchedules;

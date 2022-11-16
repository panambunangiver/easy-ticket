import React from "react";

import { ScrollView, View } from "react-native";
import { Header } from "../../../Common/Header";
import { FerryCard } from "./FerryCard";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { BACKENDIP } from "../../../../constantine";
import { datesToFormattedString, postedologic } from "../../../../util_meetjam1pagi";
import moment from "moment";

/*
*This fixes the day numbering that is returned by moment.getDate().getDay().
*
*e.g
*
*fixDay(0) returns 6
*
*fixDay(1) returns 0
*
*fixDay(2) returns 1
*
*fixDay(3) returns 2
*/
const fixDay = dayInteger =>
  dayInteger === 0 ? 6 : dayInteger - 1;

/*
* FerryList Page Component
*
* displays the list of ferries according to the selected destination
* */
const FerryList = ({ navigation, route }) => {
  console.log("route", route);
  const [ferriesList, setFerriesList] = React.useState([]);
  const globalsContext = React.useContext(GlobalsContext);

  //fetches the list of ferries from the backend
  const getFerries = async () => {
    const response = await fetch(BACKENDIP + "/api/schedule/getAll", postedologic({

      //only fetches ferries that are going to the selected destination
      destination: route.params.destination

    }, globalsContext.globalsData.accessToken));

    if (!response.ok) {
      const { data } = await response.json();
      return alert(data);
    }

    const { data } = await response.json();

    //getDay() will return number 0-6, 0 is sunday, 1 is monday, 2 is tuesday, etc
    //we need to shift it so that 0 is monday, 1 is tuesday, till 6 is sunday
    setFerriesList(data.filter(schedule =>
      schedule.departureDays.includes(fixDay(moment(route.params.date).toDate().getDay())),
    ));
  };

  //handles when user taps on one of the ferries
  const ferryItemOnPress = schedule =>
    //navigate to the FerryDetail page
    navigation.navigate("FerryDetail", {
      schedule,
      source: route.params.source,
      destination: route.params.destination,
      date: route.params.date,
    });

  //fetches the list of ferries when the component is mounted
  React.useEffect(() => navigation.addListener("focus", () => {
    getFerries();
  }), [navigation]);

  return (
    <View style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <ScrollView>
        <Header {...{ navigation }} title={"Daftar Kapal"} />

        {ferriesList.map((el, index) =>
          <FerryCard key={el.uid}
                     uid={el.uid}
                     shipUid={el.shipUid}
                     departure={datesToFormattedString(el.departureDays)}
                     onPress={() => ferryItemOnPress(el)}
          />,
        )}
      </ScrollView>
    </View>
  );
};

export default FerryList;

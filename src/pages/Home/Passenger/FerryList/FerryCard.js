import { Image, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import React from "react";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";

/*
* FerryCard {FerryList} Component
*
* card that contains the ferry information
* */
export function FerryCard({ departure, onPress, shipUid, uid }) {
  const [ferryImg, setFerryImg] = React.useState("");
  const [ferryData, setFerryData] = React.useState(null);
  const globalsContext = React.useContext(GlobalsContext);

  //we don't want to get the ferry images when we were getting the list on the parent component
  //that's why we give responsibility of showing the ferry images to each of the ferry card
  //so that it doesn't bogs down the parent component when getting the ferry list
  React.useEffect(() => {
    fetch(BACKENDIP + "/api/ferry/getImage", postedologic({
      uid: shipUid,
    }, globalsContext.globalsData.accessToken))
      .then(resp => resp.text()) //the image is in base64 format
      .then(image => {
        setFerryImg(image);

        //we get the rest of the ferry information after we get the image
        fetch(BACKENDIP + "/api/ferry/get", postedologic({
          uid: shipUid,
        }, globalsContext.globalsData.accessToken))
          .then(resp => resp.json())
          .then(ferry => {
            setFerryData(ferry.data);
          });
      });
  }, [uid]); //run this effect only when the uid changes

  return <TouchableOpacity
    style={{
      backgroundColor: "white",
      padding: 10,
      margin: 30,
      borderRadius: 10,
      flexDirection: "row",
    }}
    onPress={onPress}
  >
    {/*Ferry Image*/}
    <View style={{
      width: 95,
      height: 95,
      borderRadius: 999,
      backgroundColor: "grey",
      overflow: "hidden",
    }}>
      <Image
        source={{ uri: "data:image/png;base64," + ferryImg }}
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: "cover",
        }}
      />
    </View>

    {/*Ferry Details*/}
    <View style={{
      justifyContent: "space-between",
      paddingVertical: 5,
    }}>
      <TextPoppins style={{
        fontSize: 18,
        fontType: "extrabolditalic",
        marginLeft: 10,
        color: "black",
      }}>
        {ferryData?.name}
      </TextPoppins>
      <TextPoppins style={{
        fontSize: 14,
        marginLeft: 10,
        color: "black",
        maxWidth: 150,
      }}>
        {
          //this one is potentially lengthy, so we only show the first 25 characters
          ferryData?.description.substring(0, 25) + "..."
        }
      </TextPoppins>
      <TextPoppins style={{
        fontSize: 14,
        marginLeft: 10,
        color: "black",
      }}>
        {departure}
      </TextPoppins>
    </View>
  </TouchableOpacity>;
}

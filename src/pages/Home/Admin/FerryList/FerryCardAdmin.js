import React from "react";
import TextPoppins from "../../../Common/TextPoppins";
import { Image, TouchableOpacity, View } from "react-native";
import { numberWithCommas, postedologic } from "../../../../util_meetjam1pagi";
import { BACKENDIP } from "../../../../constantine";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* FerryCardAdmin {FerryList} Component
*
* card that houses the ferry information
* */
export function FerryCardAdmin({ name, priceEkonomi, priceBusiness, listKey }) {
  const [ferryImg, setFerryImg] = React.useState("");
  const globalsContext = React.useContext(GlobalsContext);

  //get the ferry image here instead of in the initial fetch in the parent component
  //so to not make the initial fetch slow due to the large image data
  React.useEffect(() => {
    fetch(BACKENDIP + "/api/ferry/getImage", postedologic({
      uid: listKey,
    }, globalsContext.globalsData.accessToken))
      .then(resp => resp.text())
      .then(image => {
        setFerryImg(image);
      });
  }, [listKey]); //only re-fetch the image when the listKey changes

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        margin: 30,
        borderRadius: 10,
        flexDirection: "row",
      }}>
      {/*Ferry Image*/}
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 999,
          backgroundColor: "grey",
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: 'data:image;base64,' + ferryImg}}
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
          paddingVertical: 5,
        }}>
        <TextPoppins
          style={{
            fontSize: 18,
            fontType: "extrabolditalic",
            marginLeft: 10,
            color: "black",
          }}>
          {name}
        </TextPoppins>
        <TextPoppins
          style={{
            fontSize: 14,
            marginLeft: 10,
            color: "black",
          }}>
          Harga Tiket Ekonomi
          {"\n"}
          Rp. {numberWithCommas(priceEkonomi)}
        </TextPoppins>
        <TextPoppins
          style={{
            fontSize: 14,
            marginLeft: 10,
            color: "black",
          }}>
          Harga Tiket Business
          {"\n"}
          Rp. {numberWithCommas(priceBusiness)}
        </TextPoppins>
      </View>
    </View>
  );
}

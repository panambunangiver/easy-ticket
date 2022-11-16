import React from "react";

import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Header } from "../../../Common/Header";
import { TouchableProfilePicture } from "./TouchableProfilePicture";
import TextualInputGroup from "../../../Common/TextualInputGroup";
import TextPoppins from "../../../Common/TextPoppins";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { launchImageLibrary } from "react-native-image-picker";

/*
* AddFerry Page Component
*
* This component is used to add (and edit) a ferry to the database
* */
const AddFerry = ({ navigation, route }) => {
  const [name, setName] = React.useState("");
  const [economyTicketPrice, setEconomyTicketPrice] = React.useState("");
  const [businessTicketPrice, setBusinessTicketPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const globalsContext = React.useContext(GlobalsContext);

  //handler to add the ferry
  const tambahKapalBtnHandler = async () => {
    //if ferry name is empty
    if (!name.replace(/\s/g, "").length)
      return alert("Nama kapal tidak boleh kosong");

    //if economy ticket price is empty or not a number
    if (!economyTicketPrice.replace(/\s/g, "").length || isNaN(economyTicketPrice))
      return alert("Harga tiket ekonomi tidak boleh kosong atau berisi huruf/simbol");

    //if business ticket price is empty or not a number
    if (!businessTicketPrice.replace(/\s/g, "").length || isNaN(businessTicketPrice))
      return alert("Harga tiket bisnis tidak boleh kosong atau berisi huruf/simbol");

    //if description is empty
    if (!description.replace(/\s/g, "").length)
      return alert("Deskripsi kapal tidak boleh kosong");

    //send the data to the backend
    const response = await fetch(BACKENDIP + "/api/ferry/create", postedologic({
      name,
      economicPrice: economyTicketPrice,
      businessPrice: businessTicketPrice,
      description,
      imageBase64: image ? image : "", //if image is empty, send empty string
    }, globalsContext.globalsData.accessToken));

    //something went wrong
    if (!response.ok) {
      const error = await response.json();
      console.log(error.data);
      alert(error.data);
      return;
    }

    //success
    const message = await response.json();
    alert(message.data);

    navigation.goBack();
  };

  //handler to edit the ferry
  const editKapalBtnHandler = async () => {
    //if ferry name is empty
    if (!name.replace(/\s/g, "").length)
      return alert("Nama kapal tidak boleh kosong");

    //if economy ticket price is empty or not a number
    if (!economyTicketPrice.replace(/\s/g, "").length || isNaN(economyTicketPrice))
      return alert("Harga tiket ekonomi tidak boleh kosong atau berisi huruf/simbol");

    //if business ticket price is empty or not a number
    if (!businessTicketPrice.replace(/\s/g, "").length || isNaN(businessTicketPrice))
      return alert("Harga tiket bisnis tidak boleh kosong atau berisi huruf/simbol");

    //if description is empty
    if (!description.replace(/\s/g, "").length)
      return alert("Deskripsi kapal tidak boleh kosong");

    //send the data to the backend
    const response = await fetch(BACKENDIP + "/api/ferry/update", postedologic({
      uid: route.params.uid,
      name,
      economicPrice: economyTicketPrice,
      businessPrice: businessTicketPrice,
      description,
      imageBase64: image ? image : "",
    }, globalsContext.globalsData.accessToken));

    //something went wrong
    if (!response.ok) {
      const error = await response.json();
      console.log(error.data);
      alert(error.data);
      return;
    }

    //success
    const message = await response.json();
    alert(message.data);

    navigation.goBack();
  };

  //handler to delete the ferry
  const hapusKapalBtnHandler = () => {
    Alert.alert(
      "Hapus Kapal",
      "Apakah anda yakin ingin menghapus kapal ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Ya", onPress: async () => {
            //send the data to the backend
            const response = await fetch(BACKENDIP + "/api/ferry/delete", postedologic({
              uid: route.params.uid,
            }, globalsContext.globalsData.accessToken));

            //something went wrong
            if (!response.ok) {
              const error = await response.json();
              console.log(error.data);
              alert(error.data);
              return;
            }

            //success
            const message = await response.json();
            alert(message.data);

            navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
  };

  //handler to pick image from gallery
  const gambarisasi = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,

      //smartphone nowadays takes photos in the resolution
      //reaching 16 megapixels and above.
      //so, we need to limit the maximum resolution of the image
      //to 256 pixels so that the server doesn't get overloaded
      //with high resolution images
      maxHeight: 256,
      maxWidth: 256,

      presentationStyle: "fullScreen", //for iOS
    });

    //user cancelled the image picker
    if (result.didCancel) {
      console.log("Anda telah membatalkan memilih gambar kapal");
    }
    //something went wrong
    else if (result.errorCode) {
      console.log("ImagePicker Error: ", result.errorCode);
    }
    //error message emitted
    else if (result.errorMessage) {
      console.log("ImagePicker Error: ", result.errorMessage);
    }
    //success
    else {
      setImage(result.assets[0].base64);
    }
  };

  //load image from the backend, this function gets triggered when we're editing a ferry
  const loadImage = async () => {
    const response = await fetch(BACKENDIP + "/api/ferry/getImage/", postedologic({
      uid: route.params.uid,
    }, globalsContext.globalsData.accessToken));

    if (response.status !== 200) {
      const error = await response.json();
      console.log(error.data);
      alert(error.data);
      return;
    }

    const image = await response.text();

    setImage(image);
  };

  //upon mounting, check if we're editing a ferry
  //if so, automatically fill the form with the ferry's data
  //and load the ferry's image
  React.useEffect(() => navigation.addListener("focus", async () => {
    if (route?.params?.isEdit) {
      setName(route.params.name);
      setEconomyTicketPrice(route.params.economicPrice);
      setBusinessTicketPrice(route.params.businessPrice);
      setDescription(route.params.description);
      await loadImage();
    }
  }), [navigation]);

  return (
    <ScrollView style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <Header {...{ navigation }} title={route.params?.isEdit ? "Edit Kapal" : "Tambah Kapal"} />

      <TouchableProfilePicture onPress={gambarisasi} image={image} />

      <View style={{
        marginHorizontal: 30,
        marginTop: 30,
      }}>
        {[
          [
            "Nama Kapal", //label
            "", //placeholder
            name, //value
            setName, //setValue
            null, //keyboardType
            value => value.length > 0, //validator
            false, //secret (is password?)
            true, //isBlack
            null, //prefix
          ],
          [
            "Harga Tiket Ekonomi", //label
            "", //placeholder
            economyTicketPrice, //value
            setEconomyTicketPrice, //setValue
            "numeric", //keyboardType
            value => value.length > 0 && !isNaN(value), //validator
            false, //secret (is password?)
            true, //isBlack
            "Rp.", //prefix
          ],
          [
            "Harga Tiket Bisnis", //label
            "", //placeholder
            businessTicketPrice, //value
            setBusinessTicketPrice, //setValue
            "numeric", //keyboardType
            value => value.length > 0 && !isNaN(value), //validator
            false, //secret (is password?)
            true, //isBlack
            "Rp.", //prefix
          ],
          [
            "Deskripsi", //label
            "", //placeholder
            description, //value
            setDescription, //setValue
            "multiline", //keyboardType
            value => value.length > 0, //validator
            false, //secret (is password?)
            true, //isBlack
            null, //prefix
          ],
        ].map((el, idx) =>
          <TextualInputGroup
            key={idx}
            upperLabel={el[0]}
            placeholder={el[1]}
            value={el[2]}
            setValue={el[3]}
            keyboardType={el[4]}
            validator={el[5]}
            secret={el[6]} //DEV WARNING: why are we defining this?
            isBlack={el[7]}
            prefix={el[8]}
          />,
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#F97C08",
          borderRadius: 10,
          alignSelf: "center",
          padding: 10,
          paddingHorizontal: 30,
          marginBottom: 20,
        }}
        //depending on whether we're editing or adding a ferry, we use different handlers
        onPress={route?.params?.isEdit ? editKapalBtnHandler : tambahKapalBtnHandler}
      >
        <TextPoppins style={{
          color: "white",
          fontType: "semibold",
        }}>{
          route?.params?.isEdit ? "Edit Kapal" : "Tambah Kapal"
        }</TextPoppins>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "red",
          borderRadius: 10,
          alignSelf: "center",
          padding: 10,
          paddingHorizontal: 30,
          //this only shows up when we're editing a ferry
          display: route?.params?.isEdit ? null : "none",
        }}
        onPress={hapusKapalBtnHandler}
      >
        <TextPoppins style={{
          color: "white",
          fontType: "semibold",
        }}>{
          "Hapus Kapal"
        }</TextPoppins>
      </TouchableOpacity>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

export default AddFerry;

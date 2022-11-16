import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Header } from "../../../Common/Header";
import { RoundProfilePicture } from "./RoundProfilePicture";
import TextPoppins from "../../../Common/TextPoppins";
import DoorExit from "../../../../assets/DoorExit.svg";
import { UserInfoCard } from "./UserInfoCard";
import { CommonActions } from "@react-navigation/native";
import GlobalsContext from "../../../../contexts/GlobalsContext";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";

const Profile = ({ navigation }) => {
  const globalsContext = React.useContext(GlobalsContext);

  const keluarBtnHandler = () => {
    navigation.dispatch(state => {
      globalsContext.setGlobalsData({
        user: null,
        accessToken: null,
      });

      return CommonActions.reset({
        routes: [{ name: "Login" }],
        index: 0,
      });
    });
  };

  const getNewUserData = async () => {
    const response = await fetch(BACKENDIP + "/api/user/getUserInfo", postedologic({
      id: globalsContext.globalsData.user.uid,
    }, globalsContext.globalsData.accessToken));

    if (!response.ok) {
      const { data } = await response.json();
      console.log(data);
      return alert(data);
    }

    const { data } = await response.json();

    globalsContext.setGlobalsData({
      user: data,
    });
  };

  const updateUserData = async newData => {
    const response = await fetch(BACKENDIP + "/api/user/update", postedologic({
      id: newData.uid,
      phoneNumber: newData.phoneNumber,
      email: newData.email,
      password: newData.password,
      fullName: newData.fullName,
    }, globalsContext.globalsData.accessToken));

    if (!response.ok) {
      const { data } = await response.json();
      console.log(data);
      return alert(data);
    }

    //this updates the global context data with the newly updated user data
    await getNewUserData();

    const { data } = await response.json();

    alert(data);
  };

  return (
    <ScrollView style={{
      backgroundColor: "#304875", flex: 1,
    }}>
      <Header {...{ navigation, noBackButton: true }} title="Profile" />

      <RoundProfilePicture />
      <UserInfoCard {...{
        data: globalsContext?.globalsData?.user,
        setData: newData => updateUserData(newData),
      }} />

      <View style={{
        alignItems: "center",
        marginTop: 20,
      }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#F97C08",
            borderRadius: 5,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
          }}
          onPress={keluarBtnHandler}
        >
          <DoorExit width={20} />
          <TextPoppins style={{
            color: "black",
            fontType: "semibold",
            fontSize: 18,
            marginLeft: 5,
          }}>
            Keluar
          </TextPoppins>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

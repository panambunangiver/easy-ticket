import React from "react";

import { View } from "react-native";
import TextPoppins from "../pages/Common/TextPoppins";
import { LoadingProvider } from "../contexts/LoadingContext";
import { LoadingCircle } from "./LoadingCircle";

/*
* LoadingScreen Component
*
* This component will overlay over the entire application when triggered to be shown*/
const LoadingScreen = (props) => {
  //props to store loading message
  const [loadingData, setLoadingData] = React.useState({
    show: false,
    text: "apa itu sistem? be real ya, be real",
  });

  return (
    <LoadingProvider value={{
      data: loadingData,
      setData: newData => setLoadingData(prevState =>
        ({ ...prevState, ...newData })),
    }}>
      {props.children}
      <View style={{
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: loadingData.show ? null : "none",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <LoadingCircle />
        <TextPoppins style={{
          color: "white",
          fontSize: 20,
        }}>
          {loadingData.text}
        </TextPoppins>
      </View>
    </LoadingProvider>
  );
};

export default LoadingScreen;

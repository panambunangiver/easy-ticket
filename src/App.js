import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingScreen from "./loader_verfikasigaperluvalidasi";
import Modalaso from "./modal_berealya";
import { GlobalsProvider } from "./contexts/GlobalsContext";
import TextPoppins from "./pages/Common/TextPoppins";

const App = () => {
  const [globalsData, SetGlobalsData] = React.useState({});

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LoadingScreen>
        <GlobalsProvider
          value={{
            globalsData,
            setGlobalsData: data => SetGlobalsData(prevState => ({ ...prevState, ...data })),
          }}
        >
          <Modalaso>
            <View style={{
              flex: 1,
            }}>
              <NavigationContainer>
                <Router />
              </NavigationContainer>
            </View>
          </Modalaso>
        </GlobalsProvider>
      </LoadingScreen>
      {/*
      overlaying watermark component that displays across pages
       */}
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.0,
        }}
        pointerEvents="none"
      >
        <View style={{ width: 800, transform: [{ rotateZ: "20deg" }] }}>
          {
            [...Array(50)].map((el, key) =>
              <TextPoppins key={key} numberOfLines={1} style={{
                fontSize: 25,
                fontWeight: "bold",
                marginBottom: 10,
                color: "grey",
              }}> </TextPoppins>,
            )
          }
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

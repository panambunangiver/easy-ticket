import React from "react";
import Login from "../pages/Login";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../pages/SignUp";
import Dash from "../pages/Home/Passenger/Dash";
import FerryList from "../pages/Home/Passenger/FerryList";
import ETicketDetail from "../pages/Home/Passenger/ETicketDetail";
import Profile from "../pages/Home/Passenger/Profile";
import TabContainer from "../pages/Home/TabContainer";
import FerryDetail from "../pages/Home/Passenger/FerryDetail";
import BookTicket from "../pages/Home/Passenger/BookTicket";
import BookTicketPassengerInfo from "../pages/Home/Passenger/BookTicketPassengerInfo";
import BookTicketPayment from "../pages/Home/Passenger/BookTicketPayment";
import PaymentSuccess from "../pages/Home/Passenger/PaymentSuccess";
import AdminNavigation from "../pages/Home/AdminNavigation";
import MidTrans from "../pages/Home/Passenger/MidTrans";
import ModalContext from "../contexts/ModalContext";
import GlobalsContext from "../contexts/GlobalsContext";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

const Stack = createStackNavigator();

/*
* Router System Component
*
* This components handles the root page handling on the entire app.
* This also handles the customer pages routing.
*
* For admin pages routing, see `/src/pages/Home/AdminNavigation.js`
* */
const Router = () => {
  const modalContext = React.useContext(ModalContext);
  const globalsContext = React.useContext(GlobalsContext);

  //this handles the user back button event on the root router which includes
  //customer pages.
  //we prevent user from navigating when a modal is being shown and also
  //when user is on the homescreen to prevent user from accidentally logging out.
  //for handling this in admin pages, see `/src/pages/Home/AdminNavigation.js`
  const userPressedBackButtonHandler = (evt, nav) => {
    const navigationStates = nav.getState();
    const previousRoute = navigationStates.routes[navigationStates.index - 1]?.name;
    const currentlyLoggedIn = globalsContext?.globalsData.user !== undefined && globalsContext?.globalsData.user !== null;

    //prevent user from navigating away by pressing back on android UI
    //when a modal is currently being presented to the user
    if (modalContext.visible)
      return evt.preventDefault();

    //warn user when pressing back on homescreen
    //to prevent user from accidentally logging out
    if (previousRoute === "Login" && currentlyLoggedIn) {
      //if it's performing the 'RESET' from nav.dispatch below, let it do it's thing
      //don't interfere anymore
      if (evt.data.action.type === "RESET")
        return;

      //prevent default behavior from running
      evt.preventDefault();

      Alert.alert(
        "Keluar",
        "Apakah anda yakin ingin keluar?",
        [
          {
            text: "Tidak",
            style: "cancel",
          },
          {
            text: "Ya",
            onPress: () =>
              //reset the navigation stack to the login page and
              //clear the user data from the global context
              nav.dispatch(() => {
                globalsContext.setGlobalsData({
                  user: null,
                  accessToken: null,
                });

                return CommonActions.reset({
                  routes: [{ name: "Login" }],
                  index: 0,
                });
              }),
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <Stack.Navigator
      screenListeners={({ navigation }) => ({
        beforeRemove: evt => userPressedBackButtonHandler(evt, navigation),
      })}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="FerryList" component={FerryList} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={TabContainer} options={{ headerShown: false }} />
      <Stack.Screen name="FerryDetail" component={FerryDetail} options={{ headerShown: false }} />
      <Stack.Screen name="BookTicket" component={BookTicket} options={{ headerShown: false }} />
      <Stack.Screen name="BookTicketPassengerInfo" component={BookTicketPassengerInfo}
                    options={{ headerShown: false }} />
      <Stack.Screen name="BookTicketPayment" component={BookTicketPayment} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ headerShown: false }} />
      <Stack.Screen name="AdminNavigation" component={AdminNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="MidTrans" component={MidTrans} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Router;

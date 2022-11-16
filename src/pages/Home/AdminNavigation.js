import React from "react";

import { Text, View } from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import AddFerry from "./Admin/AddFerry";
import AddFerrySchedule from "./Admin/AddFerrySchedule";
import Dash from "./Admin/Dash";
import FerryList from "./Admin/FerryList";
import FerrySchedules from './Admin/FerrySchedules'
import TicketsList from "./Admin/TicketsList";
import ModalContext from "../../contexts/ModalContext";
const Stack = createStackNavigator();

/*
* AdminNavigation Routing Component for Admin pages
*
* Contrary to customer pages, admin pages are not laid out in a tab navigator
* */
const AdminNavigation = () => {
  const modalContext = React.useContext(ModalContext);

  //this handles the user back button event in admin pages
  //we prevent them from navigating if a modal is open
  const userPressedBackButtonHandler = evt => {
    if (modalContext.visible)
      evt.preventDefault();
  };

  return (
    <Stack.Navigator
      screenListeners={{
        beforeRemove: userPressedBackButtonHandler
      }}
    >
      <Stack.Screen name='AdminDash' component={Dash} options={{headerShown:false}}/>
      <Stack.Screen name='AdminAddFerry' component={AddFerry} options={{headerShown:false}}/>
      <Stack.Screen name='AdminAddFerrySchedule' component={AddFerrySchedule} options={{headerShown:false}}/>
      <Stack.Screen name='AdminFerryList' component={FerryList} options={{headerShown:false}}/>
      <Stack.Screen name='AdminFerrySchedules' component={FerrySchedules} options={{headerShown:false}}/>
      <Stack.Screen name='AdminTicketsList' component={TicketsList} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default AdminNavigation;

import React from 'react';

import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GlobalsContext from '../../contexts/GlobalsContext';
import Dash from './Passenger/Dash';
import ETicketDetail from './Passenger/ETicketDetail';
import Profile from './Passenger/Profile';
import TextPoppins from '../Common/TextPoppins';
import BottomHomeIcon from '../../assets/BottomHomeIcon.png';
import BottomProfileIcon from '../../assets/BottomProfileIcon.png';
import BottomTicketIcon from '../../assets/BottomTicketIcon.png';
import BottomHistoryIcon from '../../assets/BottomHistoryIcon.png'
import {useNavigation} from '@react-navigation/native';
import TicketHistory from './Passenger/TicketHistory/index';

const Tab = createBottomTabNavigator();

const iconMapping = {
  HomeDash: BottomHomeIcon,
  HomeTicket: BottomTicketIcon,
  HomeProfile: BottomProfileIcon,
  HomeHistory: BottomHistoryIcon,
};

/*
 * TabContainer Routing Component for Customer pages
 *
 * This component handles the tab navigation for the customer pages,
 * for the rest of the customer pages route handling, see `/src/router/index.js`
 * */
const TabContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => (
          <Image
            source={iconMapping[route.name]}
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? 'orange' : 'grey',
            }}
          />
        ),
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name={'HomeDash'}
        component={Dash}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'HomeTicket'}
        component={ETicketDetail}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'HomeHistory'}
        component={TicketHistory}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'HomeProfile'}
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabContainer;

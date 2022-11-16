import React from 'react';

import {ScrollView, View} from 'react-native';
import {Header} from '../../../Common/Header';
import {ETicketCard} from '../../../Common/ETicketCard';
import GlobalsContext from '../../../../contexts/GlobalsContext';
import {BACKENDIP, KEY_MIDTRANS} from '../../../../constantine';
import {postedologic} from '../../../../util_meetjam1pagi';
import TextPoppins from '../../../Common/TextPoppins';
import moment from 'moment';

/*
 * ETicketDetail Page Component
 *
 * this component shows the detail of the current e-ticket that the user has
 * */
const TicketHistory = ({navigation}) => {
  const [ticketList, setTicketList] = React.useState();
  const globalsContext = React.useContext(GlobalsContext);

  const getAllCompletedTicket = async () => {
    const response = await fetch(
      BACKENDIP + '/api/ticket/getAllForUser',
      postedologic(
        {
          userUid: globalsContext.globalsData.user.uid,
          status: ['completed'],
        },
        globalsContext.globalsData.accessToken,
      ),
    );

    //something went wrong with the backend
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      alert(error);
      return null;
    }

    //response from API
    console.log('RESPONSE', response);
    const {data} = await response.json();
    setTicketList(data);
    console.log('RESPONSE PALING FIX', data);
  };

  React.useEffect(
    () =>
      navigation.addListener('focus', () => {
        getAllCompletedTicket();
      }),
    [navigation],
  );

  return (
    <ScrollView
      style={{
        backgroundColor: '#304875',
        flex: 1,
      }}>
      <Header
        {...{navigation, noBackButton: true}}
        title={'Riwayat Pemesanan'}
      />
      {ticketList &&
        ticketList.map((el, index) => (
          <View style={{marginBottom: 30}}>
            <ETicketCard {...{ticketData: el, key: index}} isHistory />
          </View>
        ))}
    </ScrollView>
  );
};

export default TicketHistory;

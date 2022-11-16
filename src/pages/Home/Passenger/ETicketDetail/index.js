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
const ETicketDetail = ({navigation}) => {
  const [ticketData, setTicketData] = React.useState();
  const globalsContext = React.useContext(GlobalsContext);
  const [noTicketMessage, setNoTicketMessage] = React.useState('');
  const [isReadyToShowTicket, setIsReadyToShowTicket] = React.useState(false);

  const getAllCompletedTicket = async () => {
    const response = await fetch(
      BACKENDIP + 'api/ticket/getAllForUser',
      postedologic(
        {
          userUid: globalsContext.globalsData.user.uid,
          status: ['completed'],
        },
        globalsContext.globalsData.accessToken,
      ),
    );

    //response from API
    console.log('RESPONSE', response);
  };

  //this function gets the latest active ticket (if any) from the backend
  //active in this case means the ticket's status is either 'unpaid' or 'active'
  const getLatestActiveTicket = async () => {
    //request data to the backend
    const response = await fetch(
      BACKENDIP + '/api/ticket/getLatestActive',
      postedologic(
        {
          userUid: globalsContext.globalsData.user.uid,
        },
        globalsContext.globalsData.accessToken,
      ),
    );

    //something went wrong
    if (!response.ok) {
      const {data} = await response.json();
      console.log(data);

      //reset the ticket data state
      setTicketData(null);

      return;
    }

    //everything went well, get the data
    const {data} = await response.json();

    //backend says "No data", that means the user doesn't have any active ticket
    if (data === 'No data')
      //reset the ticket data state
      return setTicketData(null);

    //user has an active ticket, set the ticket data state
    setTicketData(data);
  };

  //handler to cancel ticket
  const cancelTicket = async () => {
    //request to the backend to cancel the ticket
    const response = await fetch(
      BACKENDIP + '/api/ticket/changeStatus',
      postedologic(
        {
          ticketNumber: ticketData?.uid,
          status: 'cancelled',
          userUid: globalsContext.globalsData.user.uid,
        },
        globalsContext.globalsData.accessToken,
      ),
    );

    //something went wrong with the backend
    if (!response.ok) {
      const {data} = await response.json();
      console.log(data);
      return alert(data);
    }

    //everything went well, get the latest active ticket again to update the ticket data state
    await getLatestActiveTicket();
  };

  //this function checks the ticket status so that we can determine whether to show the 'Pay' button
  //or the entire ticket detail (if it has been paid)
  const checkTicketStatus = async () => {
    let response = null;

    //ticketData is still null, abort
    if (!ticketData) return null;

    //check if ticket is already expired
    if (
      moment(ticketData?.paymentExpiry).isBefore(moment()) &&
      ticketData?.status === 'unpaid'
    ) {
      await cancelTicket();

      return setNoTicketMessage('Ticket Expired');
    }

    //ticket is active, show it and return
    setIsReadyToShowTicket(true);

    //ticketData status is not 'unpaid', abort
    if (ticketData?.status !== 'unpaid') {
      return null;
    }

    //ask MidTrans to check the status of the transaction
    response = await fetch(
      `https://api.sandbox.midtrans.com/v2/${ticketData?.uid}/status`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic ' + KEY_MIDTRANS,
        },
      },
    );

    //something went wrong with MidTrans
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      alert(error);
      return null;
    }

    //everything went well, get the transaction status
    const {transaction_status} = await response.json();

    //transaction is not yet paid, abort
    if (transaction_status !== 'settlement' && transaction_status !== 'capture')
      return null;

    //transaction is paid, update the ticket status to 'active' in the backend
    response = await fetch(
      BACKENDIP + '/api/ticket/changeStatus',
      postedologic(
        {
          ticketNumber: ticketData?.uid,
          status: 'active',
          userUid: globalsContext.globalsData.user.uid,
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

    //finally show the ticket
    setIsReadyToShowTicket(true);

    //everything went well, get the latest active ticket again to update the ticket data state
    await getLatestActiveTicket();
  };

  //get the latest active ticket when the component is mounted
  React.useEffect(
    () =>
      navigation.addListener('focus', () => {
        getLatestActiveTicket();
        setNoTicketMessage('Tidak ada tiket');
        setIsReadyToShowTicket(false);
      }),
    [navigation],
  );

  React.useEffect(
    () =>
      navigation.addListener('blur', () => {
        setNoTicketMessage('...');
        setIsReadyToShowTicket(false);
      }),
    [navigation],
  );

  //check the ticket status everytime the ticket data state changes
  React.useEffect(() => {
    getAllCompletedTicket();
    checkTicketStatus();
    console.log('DATASSS', globalsContext.globalsData.user);
  }, [ticketData]);

  return (
    <ScrollView
      style={{
        backgroundColor: '#304875',
        flex: 1,
      }}>
      <Header {...{navigation, noBackButton: true}} title={'Tiket saya'} />

      {ticketData ? (
        isReadyToShowTicket ? (
          <ETicketCard {...{ticketData, cancelTicket}} />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextPoppins
              style={{
                color: 'black',
                fontSize: 22,
                marginTop: 100,
                fontType: 'italic',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
                paddingHorizontal: 20,
              }}>
              Sedang memuat...
            </TextPoppins>
          </View>
        )
      ) : (
        //if there is no active ticket, show this
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextPoppins
            style={{
              color: 'black',
              fontSize: 22,
              marginTop: 100,
              fontType: 'italic',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              paddingHorizontal: 20,
            }}>
            {noTicketMessage}
          </TextPoppins>
        </View>
      )}

      <View style={{height: 100}} />
    </ScrollView>
  );
};

export default ETicketDetail;

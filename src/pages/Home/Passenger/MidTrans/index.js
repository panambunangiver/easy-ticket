import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { BACKENDIP } from "../../../../constantine";
import { postedologic } from "../../../../util_meetjam1pagi";
import GlobalsContext from "../../../../contexts/GlobalsContext";

/*
* MidTrans Page Component
*
* this contains the midtrans payment webview and the signals receiver for the webview
* */
const MidTrans = ({ navigation, route }) => {
  const globalsContext = React.useContext(GlobalsContext);

  //this page can be triggered from anywhere as long as it has the correct params
  //but they are required to pass 'isResumingPayment' as an additional prop to the page
  const { isResumingPayment } = route.params;

  const onMessage = async data => {
    //webview doesn't signals 'Selesai', order hasn't been paid
    if (data.nativeEvent.data !== "Selesai") {
      alert("Jangan lupa membayar tiketnya ya");
      return navigation.goBack();
    }

    //notify server that the ticket has been paid
    const response = await fetch(BACKENDIP + "/api/ticket/changeStatus", postedologic({
      //ticketNumber resides in 'uid' due to the way it was stored in firebase
      //therefore we don't use the staging data structure of tickets that came to 'params'
      //from the ticket creation screen
      ticketNumber: isResumingPayment ? route.params.uid : route.params.ticketNumber,
      status: "active",
      userUid: globalsContext.globalsData.user.uid,
    }, globalsContext.globalsData.accessToken));

    //something's wrong
    if (response.status !== 200) {
      const { data } = await response.json();
      console.log(data);
      return alert(data);
    }

    //everything's fine, go to PaymentSuccess
    navigation.replace("PaymentSuccess");
  };

  return <WebView source={{ uri: route.params.paymentUrl }} onMessage={onMessage} />;
};

export default MidTrans;

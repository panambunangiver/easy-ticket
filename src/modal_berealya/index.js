import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../pages/Common/TextPoppins";
import ModalContext, { ModalProvider } from "../contexts/ModalContext";

/*
* InvalidModal Component
*
* This is the default modal shown when the Modal system is triggered to be shown
* */
const InvalidModal = ({ onDismiss }) => {
  const modalContext = React.useContext(ModalContext);

  return (
    <View style={{
      backgroundColor: "white",
      marginHorizontal: 50,
      borderRadius: 10,
      padding: 10,
    }}>
      <TextPoppins style={{
        color: "black",
        textAlign: "center",
        fontSize: 20,
      }}>
        Can we get much higher? {"\n\n\n\n"}{modalContext?.data}
      </TextPoppins>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 20,
        }}
        onPress={onDismiss}
      >
        <TextPoppins style={{ color: "white", textAlign: "center" }}>
          Close
        </TextPoppins>
      </TouchableOpacity>
    </View>
  );
};

/*
* Modalaso System Component
*
* This component handles the visibility of the modal and setting the content of the modal*/
const Modalaso = (props) => {
  //states to handle the visibility and content of the modal
  const [show, setShow] = React.useState(false);
  const [content, setContent] = React.useState(<InvalidModal onDismiss={() => {
    setContent(null);
    setShow(false);
  }} />);

  return (
    <ModalProvider value={{
      page: content,
      setPage: modal => setContent(modal ? modal : <InvalidModal onDismiss={() => {
        setContent(null);
        setShow(false);
      }} />),
      visible: show,
      setVisible: setShow,
    }}>
      {props.children}
      <View style={{
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: show ? null : "none",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}>
        {content}
      </View>
    </ModalProvider>
  );
};

export default Modalaso;

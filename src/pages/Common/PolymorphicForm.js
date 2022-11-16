import React from "react";

import { Image, TextInput, TouchableOpacity, View } from "react-native";
import TextPoppins from "./TextPoppins";

/*
* PolymorphicForm Common Component
*
* This component renders a TextField styled form component that either can be a TextField
* or a button that's connected to a callback
*
* Required Props:
* - upperText: The text that will be displayed above the input field
* - value: value of the input field
* - setValue: callback function that the component will send user input to
* - placeholder: placeholder text for the input field
* - isTextInput: boolean that determines if the component is a text input or a button
*                that looks like a text input
* - onPress: callback function that the component will call when the button is pressed.
*            only called if isTextInput is false
* - RightIcon: optional icon that will be displayed on the right side of the input field
* - isBackgroundWhite: boolean that determines if the background of the input field is white
* */
const PolymorphicForm = (props) => {
  const { upperText, value, setValue, placeholder, isTextInput, onPress, RightIcon, isBackgroundWhite } = props;

  return (
    <View style={props.style}>
      <TextPoppins style={{color: isBackgroundWhite ? 'white' : 'black'}}>
        {upperText ? upperText : "NO UPPER TEXT"}
      </TextPoppins>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 10,
          height: 40,
          flexDirection: "row",
          backgroundColor: isBackgroundWhite ? 'white' : null,
        }}
        onPress={onPress}
      >
        {
          isTextInput ?
            <TextInput
              style={{
                flex: 1,
                color: "black",
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                textAlignVertical: 'center',
                marginLeft: 10,
                padding: 0,
              }}
              placeholder={placeholder ? placeholder : "NO PLACEHOLDER"}
              placeholderTextColor="grey"
              onChangeText={text => setValue(text)}
              value={value}
            />
            :
            <TextPoppins style={{
              flex: 1,
              textAlignVertical: "center",
              color: "black",
              marginLeft: 10,
              fontSize: 12,
            }}>
              {value ? value : "NO VALUE"}
            </TextPoppins>
        }
        <View style={{
          width: 25,
          marginRight: 10,
        }}>
          {RightIcon}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PolymorphicForm;

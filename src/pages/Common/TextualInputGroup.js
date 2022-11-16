import React from "react";

import { View } from "react-native";
import TextField from "./TextField";
import TextPoppins from "./TextPoppins";

/*
* TextualInputGroup Common Component
*
* This component is similar to `PolymorphicForm` component, but solely for textual input
* and therefore have more specific props regarding text inputs.
*
* Required Props:
* - upperLabel: the label to be displayed above the input field
* - placeholder: the placeholder text to be displayed in the input field
* - value: the value of the input field
* - setValue: callback that the component will call when the input field's value changes
* - keyboardType: the keyboard type to be used for the input field
* - validator: callback that returns true whenever the input is correct
* - secret: boolean that determines whether the input field should be a password field
* - isBlack: boolean that determines whether the input field were sitting on a black background
* - prefix: optional prefix to be displayed before the input field
* - upperLabelTextColor: optional color for the upper label
* - upperLabelFontSize: optional font size for the upper label
* - bottomSpacing: optional spacing to be added below the input field
* */
const TextualInputGroup = ({
                             upperLabel,
                             placeholder,
                             value,
                             setValue,
                             keyboardType,
                             validator,
                             secret,
                             isBlack,
                             prefix,
                             upperLabelTextColor,
                             upperLabelFontSize,
                             bottomSpacing,
                           }) => {
  return (
    <View style={{ marginBottom: bottomSpacing ? bottomSpacing : 25}}>
      <TextPoppins style={{
        fontSize: upperLabelFontSize ? upperLabelFontSize : 18,
        color: upperLabelTextColor ? upperLabelTextColor : "white",
        marginBottom: 5,
      }}>{upperLabel}</TextPoppins>
      <TextField
        {...{
          placeholder,
          value,
          setValue,
          keyboardType,
          validator,
          secret,
          isBlack,
          prefix,
        }}
      />
      <TextPoppins style={{
        position: "absolute",
        color: isBlack ? "black" : "white",
        top: 44,
        left: 15,
      }}>
        {prefix}
      </TextPoppins>
    </View>
  );
};

export default TextualInputGroup;

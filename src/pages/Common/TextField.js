import React from "react";
import { TextInput } from "react-native";

/*
* TextField Common Component
*
* This component is responsible for rendering and handling a text field.
* It's also has a validator that will determine if the text field is valid or not
* with a visual cue.
*
* Required Props:
* - value: The value of the text field
* - setValue: callback function that the component will call when the text field changes
* - keyboardType: The type of keyboard to use for the text field
* - validator: a callback that should return true if the text field content is valid, false otherwise
* - placeholder: The placeholder text to display when the text field is empty
* - secret: a boolean that determines if the text field should be a password field
* - isBlack: a boolean that determines if the text field background is black
* - prefix: a string that will be displayed before the text field content
* */
const TextField = ({
                     value,
                     setValue,
                     keyboardType,
                     validator,
                     placeholder,
                     secret,
                     isBlack,
                     prefix,
                   }) => {
  //disturbed State is used to check if user has tapped on the text field for the first time
  const [disturbed, setDisturbed] = React.useState(false);

  //isValid state is used to determine if the text field is valid or not
  const [isValid, setIsValid] = React.useState(true);

  //ran validator for once when the component is mounted
  React.useEffect(() => {
    setIsValid(validator ? validator(value) : true);

    //when the component unmounts, we reset the disturbed state
    return () => {
      setDisturbed(false);
    };
  }, []);

  return (
    <TextInput
      style={{
        borderWidth: 1,

        //color the border based on the validity of the text field, if user has disturbed the text field
        //or if the text field is black
        borderColor: disturbed ? !isValid ? "red" : isBlack ? "black" : "white" : isBlack ? "black" : "white",

        borderRadius: 10,
        color: isBlack ? "black" : "white",

        //if there is a prefix, we need to add some padding to the left
        paddingLeft: prefix ? 35 : 15,

        fontFamily: "Poppins-Light",
        backgroundColor: isBlack ? "white" : null,
      }}
      value={value}
      onChangeText={text => {
        setValue(text);

        //run the validator every time the text field changes
        setIsValid(validator(text));

        //user has entered something in the text field
        setDisturbed(true);
      }}

      //multiline actually doesn't exist in React's TextInput keyboardType, so do NO-OP if programmers
      //specify multiline on keyboardType
      keyboardType={keyboardType ? keyboardType !== 'multiline' ? keyboardType : null : null}

      //user has tapped on the text field
      onFocus={() => setDisturbed(true)}

      placeholder={placeholder}
      placeholderTextColor={isBlack ? "black" : "white"}
      secureTextEntry={secret}

      //this is the real place to set multiline
      multiline={keyboardType === 'multiline'}

      //at max, 10 lines
      numberOfLines={keyboardType === 'multiline' ? 10 : 1}

      //align the text to the top if multiline
      textAlignVertical={keyboardType === 'multiline' ? 'top' : 'center'}

      //don't set keyboard auto-capitalization for email
      autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
    />
  );
};

export default TextField;

import React from "react";

import { Text } from "react-native";

const fontMapping = {
  'black': 'Poppins-Black',
  'blackitalic': 'Poppins-BlackItalic',
  'bold': 'Poppins-Bold',
  'bolditalic': 'Poppins-BoldItalic',
  'extrabold': 'Poppins-ExtraBold',
  'extrabolditalic': 'Poppins-ExtraBoldItalic',
  'extralight': 'Poppins-ExtraLight',
  'extralightitalic': 'Poppins-ExtraLightItalic',
  'italic': 'Poppins-Italic',
  'light': 'Poppins-Light',
  'lightitalic': 'Poppins-LightItalic',
  'medium': 'Poppins-Medium',
  'mediumitalic': 'Poppins-MediumItalic',
  'regular': 'Poppins-Regular',
  'semibold': 'Poppins-SemiBold',
  'semibolditalic': 'Poppins-SemiBoldItalic',
  'thin': 'Poppins-Thin',
  'thinitalic': 'Poppins-ThinItalic',
}

/*
* TextPoppins Common Component
*
* This component wraps the Text component and adds the Poppins font family.
* With this component, you can specify `fontType` on the `style` prop to
* specify the font type. The font type can be one of the following:
* - black, blackitalic, bold, bolditalic, extrabold, extrabolditalic,
*   extralight, extralightitalic, italic, light, lightitalic, medium,
*   mediumitalic, regular, semibold, semibolditalic, thin, thinitalic
* */
const MyComponent = (props) =>
  <Text
    {...props}
    style={[
      {
        //red so you know it's a custom text and you NEED customize it
        color: 'red',
        fontFamily: props.style?.fontType ? fontMapping[props.style?.fontType] : fontMapping['regular'],
      },
      props.style
    ]}
  />

export default MyComponent;

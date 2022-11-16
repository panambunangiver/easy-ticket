import {Image, View} from 'react-native';
import TextPoppins from './TextPoppins';
import ETicketAccent from '../../assets/ETicketAccent.png';
import React from 'react';

/*
 * CardHeader {ETicketDetail} Component
 *
 * this shows up the accent on the top of the card
 * */
export function CardHeader({isHistory}) {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <TextPoppins
        style={{
          color: isHistory ? 'grey' : 'black',
          fontSize: 21,
          fontType: 'extrabolditalic',
          marginLeft: 15,
          marginVertical: 20,
          flex: 1,
        }}>
        E-Ticket
      </TextPoppins>

      <Image
        source={ETicketAccent}
        style={{
          flex: 1.8,
          height: null,
          resizeMode: 'contain',
          tintColor: isHistory ? 'grey' : null,
        }}
      />
    </View>
  );
}

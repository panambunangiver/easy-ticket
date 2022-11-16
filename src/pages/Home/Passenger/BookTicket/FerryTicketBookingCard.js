import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import TextPoppins from "../../../Common/TextPoppins";
import { datesToFormattedString } from "../../../../util_meetjam1pagi";
import moment from "moment";

/*
* FerryTicketBookingCard {BookTicket} Component
*
* This is the card that contains the ferry and schedule information,
* and the options to ticket classes.
* */
export function FerryTicketBookingCard({
                                         ticketClass,
                                         setTicketClass,
                                         schedule,
                                         ferryImg,
                                         source,
                                       }) {
  return <View style={{
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    margin: 30,
  }}>
    <View>
      <View style={{
        borderRadius: 999,
        backgroundColor: "grey",
        height: 80,
        width: 80,
        overflow: "hidden",
      }}>
        <Image
          source={{ uri: "data:image;base64," + ferryImg }}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
          }}
        />
      </View>
    </View>

    <View style={{
      flex: 1,
      marginLeft: 15,
    }}>
      <View style={{
        flexDirection: "row",
      }}>
        <View style={{
          flex: 1,
        }}>
          <TextPoppins style={{
            color: "black",
            fontType: "extrabolditalic",
            fontSize: 18,
            marginBottom: -5,
          }}>{schedule.shipName}</TextPoppins>
          <TextPoppins style={{
            color: "black",
            fontType: "extrabolditalic",
            fontSize: 15,
          }}>{source} - {schedule.destination}</TextPoppins>
        </View>

        {/*
            DEV WARNING:

            we dont actually have any distance information from the backend
            let's just not show it for now
        */}

        {/*<View>*/}
        {/*  <TextPoppins style={{*/}
        {/*    color: "#F97C08",*/}
        {/*    borderRadius: 20,*/}
        {/*    borderWidth: 1,*/}
        {/*    borderColor: "#F97C08",*/}
        {/*    fontType: "extrabold",*/}
        {/*    fontSize: 12,*/}
        {/*    paddingHorizontal: 8,*/}
        {/*    textAlignVertical: "center",*/}
        {/*  }}>*/}
        {/*    255 km*/}
        {/*  </TextPoppins>*/}
        {/*</View>*/}
      </View>

      <TextPoppins style={{
        color: "black",
        fontType: "semibold",
        fontSize: 12,
      }}>{"\n"}Info Keberangkatan</TextPoppins>

      {
        [
          ["Pengiriman", datesToFormattedString(schedule.departureDays)],
          ["Keberangkatan", `${moment(schedule.departureTime).format('HH:mm')} WITA`],
        ].map((el, idx) =>
          <View
            key={idx}
            style={{
              flexDirection: "row",
            }}
          >
            <TextPoppins style={{
              color: "black",
              fontSize: 12,
              flex: 1,
            }}>
              {el[0]}
            </TextPoppins>
            <TextPoppins style={{
              color: "black",
              fontSize: 12,
            }}>
              :
            </TextPoppins>
            <TextPoppins style={{
              color: "black",
              fontSize: 12,
              marginLeft: 5,
              width: 90,
            }}>
              {el[1]}
            </TextPoppins>
          </View>,
        )
      }

      <TextPoppins style={{
        color: "black",
        fontType: "semibold",
        fontSize: 12,
      }}>{"\n"}Kelas{"\n"}</TextPoppins>

      <View style={{
        flexDirection: "row",
      }}>
        {
          ["Ekonomi", "Business"].map((el, idx) =>
            <TouchableOpacity
              key={idx}
              style={{
                flex: 1,
                marginLeft: idx > 0 ? 10 : 0, // margin left for all except the first one
              }}
              onPress={() => setTicketClass(idx)}
            >
              <TextPoppins style={{
                color: ticketClass === idx ? "orange" : "black", // orange if selected
                fontType: "extrabold",
                fontSize: 12,
                textAlignVertical: "center",
                textAlign: "center",
                paddingHorizontal: 10,
                borderRadius: 999, // what the fuck
                borderWidth: 1,
                borderColor: ticketClass === idx ? "#F97C08" : "black", // orange if selected, black if not
              }}>
                {el}
              </TextPoppins>
            </TouchableOpacity>,
          )
        }
      </View>
    </View>
  </View>;
}

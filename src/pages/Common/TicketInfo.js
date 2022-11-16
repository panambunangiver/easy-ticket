import { TouchableOpacity, View } from "react-native";
import TextPoppins from "./TextPoppins";
import React from "react";
import moment from "moment";
import "moment/locale/id";
import { useNavigation } from "@react-navigation/native";

/*
* TicketInfo {ETicketDetail} Component
*
* this component houses the information of the ticket
* */
export function TicketInfo({ ticketData, cancelTicket, isHistory }) {
  const navigation = useNavigation();

  return <View style={{
    marginHorizontal: 15,
  }}>
    <View style={{
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
    }}>
      <View style={{
        flexDirection: "row",
      }}>
        <TextPoppins style={{
          color:  isHistory ? "grey" : "black",
          fontType: "extrabolditalic",
          flex: 1,
          fontSize: 20,
          textAlign: "center",
        }}>
          {ticketData?.ferryName}
        </TextPoppins>

        <TextPoppins style={{
          color: "orange",
          borderRadius: 99,
          borderWidth: 1,
          borderColor: "orange",
          padding: 3,
          paddingHorizontal: 8,
          fontType: "bold",
          fontSize: 12,
          display: "none",
        }}>
          244 km
        </TextPoppins>
      </View>

      <TextPoppins style={{
        textAlign: "center",
        fontType: "bold",
        color:  isHistory ? "grey" : "black",
        marginTop: 10,
      }}>
        {/*Kamis, 12 Mei 2022*/}
        {moment(ticketData?.departureDate).locale("id").format("dddd, DD MMMM YYYY")}
      </TextPoppins>
      <TextPoppins style={{
        textAlign: "center",
        color:  isHistory ? "grey" : "black",
        marginTop: -5,
        marginBottom: 10,
      }}>
        {/*Berangkat Pukul 16:00 WITA*/}
        Berangkat Pukul {moment(ticketData?.departureDate).format("HH:mm")} WITA
      </TextPoppins>

      <View style={{
        flexDirection: "row",
      }}>
        <View style={{
          flex: 1,
        }}>
          <TextPoppins style={{
            color:  isHistory ? "grey" : "black",
            fontType: "semibold",
          }}>
            Asal
          </TextPoppins>
          <TextPoppins style={{
            color:  isHistory ? "grey" : "black",
          }}>
            Pelabuhan {ticketData?.source}
          </TextPoppins>
        </View>

        <View style={{
          flex: 1,
        }}>
          <TextPoppins style={{
            color:  isHistory ? "grey" : "black",
            fontType: "semibold",
          }}>
            Tujuan
          </TextPoppins>
          <TextPoppins style={{
            color:  isHistory ? "grey" : "black",
          }}>
            Pelabuhan {ticketData?.destination}
          </TextPoppins>
        </View>
      </View>
    </View>

    <TextPoppins style={{
      color:  isHistory ? "grey" : "black",
      textAlign: "center",
      marginTop: 10,
      display: ticketData?.status === 'unpaid' ? null : 'none',
    }}>
      Tiket belum di bayar
    </TextPoppins>

    <TouchableOpacity
      style={{
        backgroundColor: "#F97C08",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 50,
        marginTop: 5,
        display: ticketData?.status === 'unpaid' ? null : 'none',
      }}
      onPress={() => navigation.navigate("MidTrans", {
        ...ticketData,
        isResumingPayment: true,
      })}
    >
      <TextPoppins style={{
        color: "white",
        textAlign: "center",
      }}>Pay</TextPoppins>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        marginHorizontal: 50,
        marginTop: 10,
        display: ticketData?.status === 'unpaid' ? null : 'none',
      }}
      onPress={cancelTicket}
    >
      <TextPoppins style={{
        color: "black",
        textAlign: "center",
      }}>Batalkan</TextPoppins>
    </TouchableOpacity>
  </View>;
}

import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import TextualInputGroup from "../../../Common/TextualInputGroup";

const UserEditInfoModal = ({ data, onConfirm, onDismiss }) => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pNumber, setPNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setFullName(data?.fullName)
    setEmail(data?.email)
    setPNumber(data?.phoneNumber)
  }, [])

  return (
    <View style={{
      backgroundColor: "white",
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 20,
    }}>
      <ScrollView>
        {
          [
            {
              value: fullName,
              setValue: setFullName,
              validator: value => value.length > 0 && value.trim().length > 0,
              upperLabel: "Nama Lengkap",
              placeholder: "Masukkan nama lengkap anda",
            },
            {
              value: email,
              setValue: setEmail,
              validator: value => value.length > 0 && value.trim().length > 0,
              upperLabel: "Email",
              placeholder: "Masukkan email anda",
            },
            {
              value: pNumber,
              setValue: setPNumber,
              validator: value => /^[0-9]+$/.test(value),
              upperLabel: "Nomor Telepon",
              placeholder: "Masukkan nomor telepon anda",
            },
            {
              value: password,
              setValue: setPassword,
              validator: value => /^[0-9]+$/.test(value),
              upperLabel: "Kata sandi",
              placeholder: "Masukkan kata sandi anda",
            },
          ].map((el, idx) =>
            <TextualInputGroup
              {...{
                ...el,
                key: idx,
                isBlack: true,
                upperLabelTextColor: "black",
                inputBorderColor: "black",
                secret: el.upperLabel === 'Password',
              }}
            />,
          )
        }

        {
          [
            [
              "Ubah",
              () => onConfirm({
                uid: data.uid,
                phoneNumber: pNumber,
                fullName: fullName,
                email: email,
                password: password,
              }),
              "rgba(0, 200, 55, 0.5)",
              "black",
            ],
            [
              "Batal",
              onDismiss,
              "rgba(255, 0, 0, 0.5)",
              "white",
            ],
          ].map((el, idx) =>
            <TouchableOpacity
              style={{
                backgroundColor: el[2],
                borderRadius: 10,
                marginTop: 10,
                padding: 10,
              }}
              onPress={el[1]}
              key={idx}
            >
              <TextPoppins style={{
                color: el[3],
                textAlign: "center",
              }}>
                {el[0]}
              </TextPoppins>
            </TouchableOpacity>,
          )
        }
      </ScrollView>
    </View>
  );
};

export default UserEditInfoModal;

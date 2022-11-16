import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ThreeBoats from "../../assets/ThreeBoats.svg";
import TextPoppins from "../Common/TextPoppins";
import TextualInputGroup from "../Common/TextualInputGroup";
import { postedologic } from "../../util_meetjam1pagi";
import { BACKENDIP } from "../../constantine";

/*
* SignUp Page Component
*
* Page for user to sign up
* */
const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const signUpBtnHandler = async () => {
    //return early if email is empty or only contain spaces
    if (email.length < 1 || email.trim().length < 1)
      return alert("Silahkan masukkan email anda terlebih dahulu");

    //return early if password is empty or only contain spaces
    if (password.length < 1 || password.trim().length < 1)
      return alert("Silahkan masukkan password anda terlebih dahulu");

    //return early if phone number is empty, only contain spaces, or contains non-numeric characters
    if (phoneNumber.length < 1 || phoneNumber.trim().length < 1 || isNaN(phoneNumber))
      return alert("Silahkan masukkan nomor telepon anda terlebih dahulu");

    //send request to backend
    const response = await fetch(BACKENDIP + "/api/user/create", postedologic({
      email,
      password,
      phoneNumber,
    }));

    //something went wrong
    if (!response.ok) {
      const error = await response.json();

      //displays error message from backend
      return alert(error.data);
    }

    const message = await response.json();

    //displays success message from backend
    alert(message.data);

    //navigate to login page
    navigation.goBack();
  };

  return (
    <View style={{
      backgroundColor: "#304875",
      flex: 1,
    }}>
      <ScrollView style={{ flex: 1 }}>
        <ThreeBoats />
        <View style={{
          marginTop: -300,
          marginHorizontal: 25,
        }}>
          <TextPoppins style={{
            color: "white",
            fontSize: 45,
            textAlign: "center",
            fontType: "bold",
            marginBottom: 50,
          }}>Daftar</TextPoppins>

          {[
            {
              value: email,
              setValue: value => setEmail(value.trim()),
              label: "Email",
              placeholder: "Masukkan email",
              validator: value => value.length > 0,
            },
            {
              value: password,
              setValue: setPassword,
              label: "Kata Sandi",
              placeholder: "Masukkan kata sandi",
              validator: value => value.length > 0,
              secret: true,
            },
            {
              value: phoneNumber,
              setValue: value => setPhoneNumber(value.trim()),
              label: "Nomor Telepon",
              placeholder: "Masukkan nomor telepon",
              validator: value => value.length > 0 && !value.match(/[^0-9]/),
            },
          ].map((el, idx) =>
            <TextualInputGroup
              key={idx}
              value={el.value}
              setValue={el.setValue}
              upperLabel={el.label}
              placeholder={el.placeholder}
              validator={el.validator}
              secret={el.secret}
            />,
          )}

          <View style={{ height: 30 }} />

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 15,
            }}
            onPress={signUpBtnHandler}
          >
            <TextPoppins style={{
              color: "black",
              textAlign: "center",
              fontType: "semibold",
              fontSize: 16,
            }}>
              Buat Akun
            </TextPoppins>
          </TouchableOpacity>

          <View style={{ height: 10 }} />

          <TextPoppins style={{
            color: "white",
            fontSize: 12,
          }}>
            Dengan mendaftar, anda menyetujui <TextPoppins style={{
            color: "white",
            textDecorationLine: "underline",
          }}>Syarat dan Ketentuan</TextPoppins> serta <TextPoppins style={{
            color: "white",
            textDecorationLine: "underline",
          }}>Kebijakan Privasi</TextPoppins>.
          </TextPoppins>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

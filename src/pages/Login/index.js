import React from "react";
import ThreeBoats from "../../assets/ThreeBoats.svg";
import { ScrollView, TouchableOpacity, View } from "react-native";
import TextualInputGroup from "../Common/TextualInputGroup";
import TextPoppins from "../Common/TextPoppins";
import { BACKENDIP } from "../../constantine";
import { postedologic } from "../../util_meetjam1pagi";
import GlobalsContext from "../../contexts/GlobalsContext";

/*
* Login Page Component
*
* Page for user to login
* */
const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const globalsContext = React.useContext(GlobalsContext);

  const signInBtnHandler = async () => {
    //if email is empty or only contains spaces, return
    if (email.length < 1 || password.length < 1)
      return alert("Email tidak bisa kosong");

    //if password is empty, return
    if (password.length < 1)
      return alert("Password tidak bisa kosong");

    //send request to backend
    const response = await fetch(BACKENDIP + "/api/auth/login", postedologic({
      email,
      password,
    }));

    //something went wrong
    if (!response.ok) {
      const error = await response.json();
      return alert(error.data);
    }

    //backend will return a token and user uid
    const { data } = await response.json();

    const accessToken = data.token;

    //request user info to backend
    const userInfo = await fetch(BACKENDIP + "/api/user/getUserInfo", postedologic({
      id: data.uid,
    }, accessToken));

    //something went wrong when requesting user info
    if (!userInfo.ok) {
      const error = await userInfo.json();
      return alert(error.data);
    }

    //get user info
    const { data: userData } = await userInfo.json();

    //save user info and token to global context
    globalsContext.setGlobalsData({
      user: userData,
      accessToken,
    });

    //conditionally navigate to either customer version of the home page or
    //the admin version of the home page
    navigation.navigate(userData.type === 'admin' ? 'AdminNavigation' : 'Home');
  };

  const signUpBtnHandler = () =>
    navigation.navigate("SignUp");

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
          }}>Masuk</TextPoppins>

          {[
            {
              value: email,
              setValue: value => setEmail(value.trim()),
              label: "Email",
              placeholder: "Masukkan email anda",
              validator: () => true,
              keyboardType: 'email-address',
            },
            {
              value: password,
              setValue: setPassword,
              label: "Kata Sandi",
              placeholder: "Masukkan kata sandi anda",
              validator: () => true,
              secret: true,
              keyboardType: 'default',
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
              keyboardType={el.keyboardType}
            />,
          )}

          <View style={{ height: 30 }} />

          {[
            [
              "Masuk",
              signInBtnHandler,
            ],
            [
              "Buat Akun",
              signUpBtnHandler,
            ],
          ].map((el, idx) =>
            <TouchableOpacity
              key={idx}
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                borderRadius: 10,
                marginBottom: 15,
              }}
              onPress={el[1]}
            >
              <TextPoppins style={{
                color: "black",
                textAlign: "center",
                fontType: "semibold",
                fontSize: 16,
              }}>
                {el[0]}
              </TextPoppins>
            </TouchableOpacity>,
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

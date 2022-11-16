import { Alert, TouchableOpacity, View } from "react-native";
import TextPoppins from "../../../Common/TextPoppins";
import Pencil from "../../../../assets/Pencil.svg";
import React from "react";
import ModalContext from "../../../../contexts/ModalContext";
import UserEditInfoModal from "./UserEditInfoModal";

export function UserInfoCard({ data, setData }) {
  const [fullName, setFullName] = React.useState(null);
  const modalContext = React.useContext(ModalContext);

  const editConfirmationHandler = modifikesyen => {
    Alert.alert(
      "Konfirmasi",
      "Apakah semua informasi yang diisi sudah benar?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            modalContext.setPage(null);
            modalContext.setVisible(false);
          },
        },
        {
          text: "OK",
          onPress: () => {
            setData(modifikesyen);
            modalContext.setPage(null);
            modalContext.setVisible(false);
          },
        },
      ],
    );
  };

  const showEditModal = () => {
    modalContext.setPage(
      <UserEditInfoModal
        data={data}
        onConfirm={editConfirmationHandler}
        onDismiss={() => {
          modalContext.setPage(null);
          modalContext.setVisible(false);
        }}
      />,
    );

    modalContext.setVisible(true);
  };

  React.useEffect(() => {
    setFullName(data?.fullName);
  }, [data?.fullName]);

  return <View style={{
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 80,
    padding: 10,
  }}>
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingBottom: 20,
      }}
      onPress={showEditModal}
    >
      <TextPoppins style={{
        color: "black",
        fontType: "semibold",
      }}>
        {fullName ? fullName : "Masukkan nama anda"}
      </TextPoppins>

      <Pencil width={20} height={20} />
    </TouchableOpacity>

    {
      [
        "Email: " + data?.email,
        "Nomor Telepon: " + data?.phoneNumber,
        // "Airmadidi, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara 95461",
      ].map((el, idx) =>
        <TextPoppins key={idx} style={{
          color: "black",
          fontType: "regular",
        }}>
          {el}
        </TextPoppins>,
      )
    }
  </View>;
}

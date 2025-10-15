import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },

  modal: {
    position: "absolute",
    bottom: 40,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 4,
    borderColor: colors.lightGreen,
    fontFamily: "Arial",
  },
  modalText: {
    color: "0x222222",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Arial",
    fontWeight: 700,
  },

  titleTxt: {
    color: "#010101",
    fontSize: 58,
    textAlign: "center",
    marginBottom: 50,
    paddingTop: 10,
    paddingBottom: 24,
  },
});

export default styles;

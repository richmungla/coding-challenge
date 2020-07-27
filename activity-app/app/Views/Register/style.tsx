import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-around",
  },

  inputStyle: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
  },
  buttonStyle: {
    borderRadius: 15,
    width: 120,
  },
  flexWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  actionIcon: {
    marginRight: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  divider: {
    height: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  overlayContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
  cardContainer: {
    borderRadius: 15,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  deleteButtons: {
    justifyContent: "space-evenly",
    marginTop: 15,
  },
});

export default styles;

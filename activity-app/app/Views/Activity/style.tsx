import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardContainer: {
    borderRadius: 15,
  },
  cardDivider: {
    marginBottom: 5,
    marginTop: 10,
  },
  cardBoldLabel: {
    fontSize: 10,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDateContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  cardflexWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDateLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDateText: {
    fontSize: 12,
  },
  overlayContainer: {
    display: "flex",
  },
  divider: {
    height: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;

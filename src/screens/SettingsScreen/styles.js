import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#484240",
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "#484240",
    padding: 25,
  },
  section: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  
    flexDirection: "row",
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    padding: 5,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  inputContainer: {
    height: 75,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    color: "#ffff",
  },
  textInput2: {
    marginTop: 10,
    marginBottom: 10,
    color: "#ffff",

  },
  button: {
    backgroundColor: "#EA9547",
    paddingVertical: 5,
    padding: 20,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "bold",
  },
  Icon: {
    height: 50,
    width: 200,
    paddingRight: 100,
    paddingLeft: 50,
    // paddingVertical: 30,
    paddingBottom: 50,
    // marginLeft: 70,
    marginTop: 25,
  },
  saveIcon: {
    height: 10,
    width: 200,
    // paddingRight: 120,
    paddingLeft: 20,
    // paddingVertical: 30,
    paddingBottom: 0,
    paddingTop: 30,
    // marginLeft: 70,
    // marginTop: 25,
    marginBottom: 100,
  },
  SettingsIcon: {
    height: 100,
    width: 200,
    paddingRight: 150,
    paddingLeft: 150,
    paddingVertical: 30,
    // paddingBottom: 50,
    marginLeft: 50,
    marginTop: 30,
  },
});

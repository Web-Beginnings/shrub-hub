import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
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
    paddingVertical: 30,
    paddingHorizontal: 24,
    // justifyContent: "flex-start",
    height: 50,
    flexDirection: "row",
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  inputContainer: {
    height: 20,
  },
  textInput: {
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
  },
  button: {
    backgroundColor: "#EA9547",

    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

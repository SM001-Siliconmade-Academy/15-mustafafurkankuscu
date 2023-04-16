import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

const MySubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    // @ts-ignore
    <Pressable style={styles.pressable} onPress={handleSubmit}>
      <Text style={styles.pressableText}>{title}</Text>
    </Pressable>
  );
};

export default MySubmitButton;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#96234f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 20,
    color: "white",
    marginTop: 20,
    width: 150,
    alignSelf: "center",
  },
  pressableText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

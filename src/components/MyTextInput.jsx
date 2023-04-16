import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useField, useFormikContext } from "formik";
import MyLabel from "./MyLabel";
import MyErrorText from "./MyErrorText";

const MyTextInput = (props) => {
  const [inputProps, metaProps, helperProps] = useField(props);
  const { handleBlur, handleChange } = useFormikContext();

  return (
    <View style={styles.container}>
      <MyLabel>{props.label}</MyLabel>
      {/* @ts-ignore */}
      <TextInput
        style={styles.textInput}
        inputMode={props.inputMode}
        value={inputProps.value}
        onChangeText={handleChange(props.name)}
        onBlur={handleBlur(props.name)}
        placeholder={props.placeholder}
      />
      <MyErrorText metaProps={metaProps} />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    marginTop: 16,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    marginTop: 4,
    backgroundColor: "#4a5568",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 20,
    color: "white",
    borderWidth: 3,
    borderColor: "#a0aec0",
  },
  errorText: {
    color: "tomato",
    fontSize: 18,
    marginTop: 4,
  },
});

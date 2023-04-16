import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useField, useFormikContext } from "formik";
import MyLabel from "./MyLabel";
import MyErrorText from "./MyErrorText";

const MyPicker = (props) => {
  const [inputProps, metaProps, helperProps] = useField(props);
  return (
    <>
      <MyLabel>{props.label}</MyLabel>
      <Picker
        selectedValue={inputProps.value}
        onValueChange={(value, index) => {
          helperProps.setValue(value);
        }}
        itemStyle={{ color: "white" }}
      >
        {props.children}
      </Picker>
      <MyErrorText metaProps={metaProps} />
    </>
  );
};

export default MyPicker;

const styles = StyleSheet.create({
  label: {
    marginTop: 16,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "tomato",
    fontSize: 18,
    marginTop: 4,
  },
});

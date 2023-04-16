import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useField } from "formik";
import MyLabel from "./MyLabel";
import MyErrorText from "./MyErrorText";

const MyCheckbox = (props) => {
  const [inputProps, metaProps, helperProps] = useField(props);
  return (
    <>
      <View style={styles.container}>
        <Checkbox
          // @ts-ignore
          style={styles.checkbox}
          value={inputProps.value}
          onValueChange={(value, index) => {
            helperProps.setValue(value);
          }}
          color={inputProps.value ? "#000" : undefined}
        />
        <MyLabel 
// @ts-ignore
        color={props.color}>{props.label}</MyLabel>
      </View>
      <MyErrorText metaProps={metaProps} />
    </>
  );
};

export default MyCheckbox;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal:10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    
  },
  errorText: {
    color: "tomato",
    fontSize: 18,
    marginTop: 4,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyErrorText = ({ metaProps }) => {
  return metaProps.touched && metaProps.error ? (
    <Text style={styles.errorText}>{metaProps.error}</Text>
  ) : null;
};

export default MyErrorText;

const styles = StyleSheet.create({
  errorText: {
    color: "#000",
    fontSize:12,
    marginRight:5,
    maxWidth:160
  },
});

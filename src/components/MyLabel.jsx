import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyLabel = ({ children, color }) => {
  return <Text style={{
    marginStart: 10,
    color: color,
    fontSize: 14,
    fontWeight: "500",
  }}>{children}</Text>;
};

export default MyLabel;

const styles = StyleSheet.create({
  label: {
    marginStart: 10,
    color: '#000',
    fontSize: 14,
    fontWeight: "500",
  },
});

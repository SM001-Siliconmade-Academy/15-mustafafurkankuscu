//import DateTimePicker, {DateTimePickerAndroid,} from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, Dimensions, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { useField, useFormikContext } from "formik";
import { string } from "yup";
import MyErrorText from "./MyErrorText";

const MyDateTime = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const [inputProps, metaProps, helperProps] = useField(props);
 

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    //setDate(currentDate);
    helperProps.setValue(currentDate);
    setShow(false);
  };

  if (Platform.OS === "android" && show) {
    DateTimePickerAndroid.open({
      value: date,
      onChange:(event, value) => {
        helperProps.setValue(value);
        setDate(value);
        setShow(false);
        
      },
      mode: "date",
      is24Hour: true,
    });
  }

  return (
    <>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShow(!show)}>
        <MaterialIcons name={props.iconName} size={24} color="black" />
        {!show && <Text>{date.toLocaleDateString()}</Text>}
        {show && Platform.OS === "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={inputProps.value}
            mode={"date"}
            //is24Hour={true}
            onChange={(event, value) => {
              helperProps.setValue(value);
              setShow(false);
            }}
            style={styles.datepicker}
            display="inline"
          />
        )}
      </TouchableOpacity>
    </>

  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: "#000",
    justifyContent: 'flex-start',
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
    width: Dimensions.get("window").width - 20

  },
  datepicker: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginHorizontal: 10
  }
});

export default MyDateTime;
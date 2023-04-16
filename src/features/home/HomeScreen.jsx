import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MyLabel from "../../components/MyLabel";
import MyCheckbox from "../../components/MyCheckbox";
import { Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../components/MyTextInput";
import MySubmitButton from "../../components/MySubmitButton";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Formik
        initialValues={{
          addressChecked: false,
          smsChecked: false,
          emailChecked: false,
          address: "",
          phoneNumber: "",
          email: "",
        }}
        validationSchema={Yup.object({
          addressChecked: Yup.boolean().oneOf([true, false], "Seçiniz"),
          smsChecked: Yup.boolean().oneOf([true, false], "Seçiniz"),
          emailChecked: Yup.boolean().oneOf([true, false], "Seçiniz"),
          address: Yup.string().max(100, "100 karakterden fazla olamaz"),
          phoneNumber: Yup.string().max(10, "10 karakterden fazla olamaz"),
          email: Yup.string().email("Geçersiz mail"),
        })}
        onSubmit={(values, props) => {
          let error = false;
          if (
            !values.addressChecked &&
            !values.smsChecked &&
            !values.emailChecked
          ) {
            alert("En az bir iletişim şekli seçiniz");
            return;
          }
          if (values.addressChecked && !values.address) {
            props.setFieldError("address", "Adres boş olamaz");
            error = true;
          }

          if (values.smsChecked && !values.phoneNumber) {
            props.setFieldError("phoneNumber", "Telefon boş olamaz");
            error = true;
          }

          if (values.emailChecked && !values.email) {
            props.setFieldError("email", "Mail boş olamaz");
            error = true;
          }

          if (error) {
            return;
          }

          alert("Submitting" + JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <View style={styles.container}>
            <MyLabel>Iletişim Tercihi</MyLabel>
            <MyCheckbox label="Ev adresi" name="addressChecked" />
            <MyCheckbox label="SMS" name="smsChecked" />
            <MyCheckbox label="E-posta" name="emailChecked" />
            {formik.values.addressChecked && (
              <MyTextInput
                label="Ev adresi"
                name="address"
                placeholder="E-posta"
                inputMode="text"
              />
            )}
            {formik.values.smsChecked && (
              <MyTextInput
                label="Telefon numarası"
                name="phoneNumber"
                placeholder="Telefon numaranız"
                inputMode="text"
              />
            )}
            {formik.values.emailChecked && (
              <MyTextInput
                label="Email"
                name="email"
                placeholder="Email adresiniz"
                inputMode="text"
              />
            )}
            <MySubmitButton title={"Gönder"} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#1a202c",
  },
  container: {
    padding: 20,
  },
});

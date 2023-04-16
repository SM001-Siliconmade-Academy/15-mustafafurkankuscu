// @ts-ignore
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// @ts-ignore
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import MyTextInput2 from '../../components/MyTextInput2'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MyDateTime from '../../components/MyDateTime';
import { parsePhoneNumber } from 'libphonenumber-js';
// @ts-ignore
import LocationScreen from './LocationScreen';
import MyLocationChoose from '../../components/MyLocationChoose';
import MyCheckbox from '../../components/MyCheckbox';
import MySubmitButton from '../../components/MySubmitButton';


const CustomerScreen = (props) => {
   
  

    function CheckIdentity(tc) {
        if (tc.length == 11 && tc[0] != "0") {
            var tek = Number(tc[0]) + Number(tc[2]) + Number(tc[4]) + Number(tc[6]) + Number(tc[8]);
            var cift = Number(tc[1]) + Number(tc[3]) + Number(tc[5]) + Number(tc[7]);
            var t10 = ((tek * 7) - cift) % 10;
            if (Number(tc[9]) == t10 && Number(tc[10]) == (cift + tek + t10) % 10) {
                return { isValid: true };
            } else {
                return { isValid: false, errorMessage: "Girmiş olduğunuz T.C. Kimlik no hatalıdır" };
            }
        } else {
            return { isValid: false, errorMessage: "Girmiş olduğunuz T.C. Kimlik no hatalıdır" };
        }
    }
    function CheckPhone(phone) {
        if (phone.length > 9) {
            const phoneNumber = parsePhoneNumber(phone, "TR")
            if (phoneNumber) {
                if (phoneNumber.isValid()) {
                    return {
                        isValid: true
                    }
                } else {
                    return {
                        isValid: false,
                        errorMessage: "Telefon formatı yanlış"
                    }
                }

            }
        }
        else {
            return {
                isValid: false,
                errorMessage: "Telefon formatı yanlış"
            }
        }

    }

    var seçilenşehir="";
    var seçilenilçe="";
    if(props.route.params !=undefined){
        if(props.route.params.location=="il"){
            // @ts-ignore
            seçilenşehir=props.route.params.data;
        }
        else{
            // @ts-ignore
            console.log("buraya girdi",props.route.params)
            seçilenşehir=props.route.params.şehir;
            seçilenilçe=props.route.params.data;
        }
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{backgroundColor:'#fff'}}>
                <ScrollView>
                <View style={styles.info}>
                    <Text style={styles.infotext}>Sizi tanıyabilmem için lütfen kimlik ve telefon bilgilerinizi girin</Text>
                </View>
                <Formik
                    initialValues={
                        {
                            identityNo: "",
                            serialNo: "",
                            birthDate: new Date(1598051730000),
                            phoneNumber: "",
                            city: "",
                            district: "",
                            kvkkchecked:false,
                            kvkkchecked2:false
                        }
                    }
                    validationSchema={Yup.object({
                        identityNo: Yup.string().required("Zorunlu alan").test('validator-custom-name', function (value) {
                            const validation = CheckIdentity(value);
                            if (!validation.isValid) {
                                return this.createError({
                                    path: this.path,
                                    message: validation.errorMessage,
                                });
                            }
                            else {
                                return true;
                            }
                        }),
                        serialNo: Yup.string().min(9, "9 hane olacak şekilde giriniz").max(9, "9 hane olacak şekilde giriniz"),
                        birthDate: Yup.date().required("Zorunlu Alan"),
                        phoneNumber: Yup.string().required("Zorunlu alan").min(10, "10 hane olacak şekilde giriniz").test('validator-custom-name-2', function (value) {
                            const validation = CheckPhone(value);
                            if (!validation.isValid) {
                                return this.createError({
                                    path: this.path,
                                    message: validation.errorMessage,
                                });
                            }
                            else {
                                return true;
                            }
                        }),


                    })}
                    // @ts-ignore
                    onSubmit={(values, props) => {
                        values.city=seçilenşehir;
                        values.district=seçilenilçe;
                        alert("Submitting" + JSON.stringify(values, null, 2));
                    }}
                >
                    <>
                        <MyTextInput2
                            title="T.C. Kimlik No"
                            name="identityNo"
                            placeholder="11111111111"
                            inputMode="text"
                            iconName="perm-identity"
                        />
                        <MyTextInput2
                            title="Kimlik Seri No"
                            name="serialNo"
                            placeholder="AAAAAAAAA"
                            inputMode="text"
                            iconName="credit-card"
                        />
                        <MyDateTime
                            title="Doğum Tarihi"
                            name="birthDate"
                            inputMode="text"
                            iconName="date-range"
                        />
                        <MyTextInput2
                            title="Cep Telefonu No"
                            name="phoneNumber"
                            placeholder="53"
                            inputMode="text"
                            iconName="smartphone"
                        />
                        <TouchableOpacity onPress={() => props.navigation.navigate("Location",{value:"il"})}>
                            <MyLocationChoose
                                title="İl"
                                name="city"
                                placeholder="şehir"
                                inputMode="text"
                                iconName="smartphone"
                                value={props.route.params != undefined ? seçilenşehir : "Seçiniz"}
                            />
                        </TouchableOpacity>
                        {props.route.params != undefined && (
                            <TouchableOpacity onPress={() => props.navigation.navigate("Location",{value:"ilçe",city:seçilenşehir})}>
                                <MyLocationChoose
                                    title="İlçe"
                                    name="district"
                                    placeholder="ilçe"
                                    inputMode="text"
                                    iconName="smartphone"
                                    value={props.route.params != undefined ? seçilenilçe : "Seçiniz"}
                                />
                            </TouchableOpacity>
                        )
                        }

                        <MyCheckbox color="#96234f"  label="Kişisel verilerin korunması kanunu aydınlatma metnini okudum ve bilgilendirildim" name="kvkkchecked" />
                        <MyCheckbox color="#000" label="Alternatif bank  A.ş'nin ve/veya iş ortaklarının ürün,hizmet ve kampanyanyalarını tanıtmaya ve pazarlamaya yönelik yazılı,sesli ve görsel" name="kvkkchecked2" />

                        <MySubmitButton title={"Gönder"} />
                    </>
                </Formik>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default CustomerScreen

// @ts-ignore
const styles = StyleSheet.create({
    info:{
        
        backgroundColor:'#f5f4f5'
    },
    infotext:{
        fontSize:18,
        fontWeight:'400',
        alignSelf:'center',
        padding:20,
        color:'#6d3132'
    }
})

// identityNo: Yup.string().max(11, "Girmiş olduğunuz T.C. Kimlik no hatalıdır"),
// @ts-nocheck
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useField, useFormikContext } from 'formik';
import MyErrorText from './MyErrorText';

const MyLocationChoose = (props) => {
    const [inputProps, metaProps, helperProps] = useField(props);
    const { handleBlur, handleChange } = useFormikContext();
    handleChange(props.value);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.inputSection}>
                <MaterialIcons style={styles.icon} name={props.iconName} size={24} color="black" />
                <TextInput
                    style={styles.input}
                    placeholder={props.placeholder}
                    underlineColorAndroid="transparent"
                    inputMode={props.inputMode}
                    value={props.value}
                    onChangeText={handleChange(props.value)}
                    onBlur={handleBlur(props.name)}
                />
                <MyErrorText metaProps={metaProps} style={styles.message}></MyErrorText>
            </View>

        </View>

    )
}

export default MyLocationChoose

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,

    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
        width:Dimensions.get("window").width-20
    },
    input: {
        flex: 1,
        
    },
    icon: {
        //resizeMode: 'stretch',
        alignItems: 'center',
        marginLeft: 10,
        marginRight:10
    },
    message: {
        //resizeMode: 'stretch',
        alignItems: 'center',
        marginRight: 5,
        maxWidth: 150
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginHorizontal: 10
    }
})
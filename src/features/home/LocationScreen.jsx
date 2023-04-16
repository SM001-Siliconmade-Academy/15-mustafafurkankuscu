import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useField, useFormikContext } from 'formik';

const LocationScreen = (props) => {
    const [data, setData] = useState([]);
    const [ilçeler, setİlçeler] = useState([]);
    var şehir=props.route.params.city;
    useEffect(() => {
        const getDatasFromApiAsync = async () => {
            try {
                const response = await fetch('https://turkiyeapi.cyclic.app/api/v1/provinces');
                const json = await response.json();
                setData(json.data);
            } catch (error) {
                console.error(error);
            }
        };

        

        getDatasFromApiAsync();
        

        
    }, [])

    const handleChooseCity = (data) => {
        props.navigation.navigate("Customer", { data: data,location:"il"})
    };
    const handleChooseDistrict = (data) => {
        props.navigation.navigate("Customer", { data: data,location:"ilçe",şehir:şehir})
    };

    const getDistrictFromApi = async ()=>{
        const aaa=data.filter(d=>d.name==şehir)[0].districts;
        console.log(aaa);
        setİlçeler(aaa);
    }

    if(props.route.params.value=="ilçe" && data.length>80 && ilçeler.length==0) getDistrictFromApi();
   
    

    return (
       <>
        < ScrollView style = { styles.locationContainer } >
        {/* {
            data.map(data => (
                <TouchableOpacity onPress={() => handleChooseCity(data.name)} style={styles.locationButton} key={data.id}>
                    <Text style={styles.locationButtonText}>{data.name}</Text>
                </TouchableOpacity>
            ))
        } */}
       
        {props.route.params.value==="il" && (
            data.map(data => (
                <TouchableOpacity onPress={() => handleChooseCity(data.name)} style={styles.locationButton} key={data.id}>
                    <Text style={styles.locationButtonText}>{data.name}</Text>
                </TouchableOpacity>
            ))
        )}
        {props.route.params.value==="ilçe" && (
            ilçeler.map(data => (
                <TouchableOpacity onPress={() => handleChooseDistrict(data.name)} style={styles.locationButton} key={data.id}>
                    <Text style={styles.locationButtonText}>{data.name}</Text>
                </TouchableOpacity>
            ))
        )}
         </ScrollView >
        </>

       
        
    )
}

export default LocationScreen

const styles = StyleSheet.create({
    locationContainer: {
        flex: 1
    },
    locationButton: {

        borderWidth: 0.5,
        borderBottomColor: '#ccc'
    },
    locationButtonText: {
        fontSize: 12,
        fontWeight: "600",
        padding: 15
    }
})
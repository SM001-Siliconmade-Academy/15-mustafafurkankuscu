import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/features/home/HomeScreen";
import CustomerScreen from "./src/features/home/CustomerScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from "./src/features/home/LocationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        
          name="Customer"
          component={CustomerScreen}
          options={
            {
              title: 'Müşteri ol',
              headerStyle:{backgroundColor:'#96234f'},
              headerTintColor:'#fff',
              headerTitleAlign:'center'
            }
            
          }
          
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={
            { 
              title: 'Konum Bilgisi',
              headerStyle:{backgroundColor:'#96234f'},
              headerTintColor:'#fff',
              headerTitleAlign:'center'
            }
          }
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

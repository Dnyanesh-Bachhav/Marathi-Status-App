import react from "react";
import { View, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import StatusListScreen from "./screens/StatusListScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from "./components/constants";
import Full_ImageScreen from "./screens/Full_ImageScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="StatusList" component={StatusListScreen} options={{
          headerShown: true,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}  />
        <Stack.Screen name="FullStatus" component={Full_ImageScreen} options={{
          headerShown: true,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}  />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
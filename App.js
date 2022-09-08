import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						title: "International Matches",
						headerTitleAlign: "center",
					}}
				/>
				<Stack.Screen
					name="Game"
					component={GameScreen}
					options={{
						title: "Video Analytics",
						headerTitleAlign: "center",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

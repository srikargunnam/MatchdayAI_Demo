import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const GameCard = ({
	tournament,
	round,
	winner,
	set1,
	set2,
	set3,
	player1,
	player2,
}) => {
	const logo = "../assets/logo_white.png";
	const crown = "../assets/crown.png";
	const flag = "../assets/Flag_of_India.svg";
	const navigation = useNavigation();

	return (
		<Pressable
			onPress={() => navigation.navigate("Game")}
			className="flex w-12/11 h-50 m-1 bg-[#00264d] rounded-md"
		>
			<Text className="text-white text-center font-bold pt-2">
				{tournament}
			</Text>
			<Text className="text-white text-center font-bold pt-1 text-xs">
				{round}
			</Text>
			<View className="flex flex-row w-full space-x-4 p-4">
				{/* Team 1 */}
				<View className="w-1/4 items-center pt-4">
					<View className="relative items-center">
						{player1 === winner && (
							<Image
								source={require(crown)}
								className="h-6 w-6 rounded-full absolute -top-6 "
							/>
						)}
						<Image
							source={require(flag)}
							className="h-10 w-10 rounded-full mx-auto my-auto"
						/>
					</View>
					<Text className="text-white text-center pt-2 text-xs">
						{player1}
					</Text>
				</View>

				{/* Score Sets */}
				<View className="w-2/5">
					<Text className="text-center text-white">
						v/s
					</Text>
					<Text className="text-white px-2 my-2 py-1 text-xs font-bold text-center bg-[#00CCBB] rounded-md flex-1">
						{set1},{set2},{set3}
					</Text>
					<Image
						source={{
							uri: logo,
						}}
						className="h-14 w-14 mx-auto"
					/>
				</View>

				{/* Team 2 */}
				<View className="w-1/4 items-center pt-4">
					<View className="relative items-center">
						{player2 === winner && (
							<Image
								source={require(crown)}
								className="h-6 w-6 rounded-full absolute -top-6 "
							/>
						)}
						<Image
							source={require(flag)}
							className="h-10 w-10 rounded-full mx-auto my-auto"
						/>
					</View>
					<Text className="text-white text-center pt-2 text-xs">
						{player2}
					</Text>
				</View>

				{/* END */}
			</View>
		</Pressable>
	);
};

export default GameCard;

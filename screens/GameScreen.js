import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import {
	PlayIcon,
	PauseIcon,
	ForwardIcon,
	BackwardIcon,
} from "react-native-heroicons/outline";

const GameScreen = () => {
	const video = useRef(null);
	const [status, setStatus] = useState({});

	const playPauseToggle = () => {
		if (status.isPlaying) pause();
		else play();
	};

	const play = () => {
		try {
			video.current.playAsync();
		} catch (ex) {
			console.log(ex);
		}
	};

	const pause = () => {
		try {
			video.current.pauseAsync();
		} catch (ex) {
			console.log(ex);
		}
	};

	const forward = () => {
		try {
			video.current.setPositionAsync(
				status.positionMillis + 5000
			);
		} catch (ex) {
			console.log(ex);
		}
	};

	const backward = () => {
		try {
			video.current.setPositionAsync(
				status.positionMillis - 5000
			);
		} catch (ex) {
			console.log(ex);
		}
	};

	useEffect(() => {
		if (status.didJustFinish) {
			video.current.stopAsync();
		}
	}, [status]);

	return (
		<View className="w-full h-full bg-gray-200">
			<View className="w-11/12 h-56 mx-auto">
				<Video
					ref={video}
					source={require("../assets/BadmintonSampleVideo.mp4")}
					useNativeControls
					resizeMode="contain"
					onPlaybackStatusUpdate={(status) =>
						setStatus(() => status)
					}
					className="w-full h-full"
				/>
			</View>
			<View className="relative bg-white w-11/12 h-10 p-4 mx-auto flex-row items-center justify-center rounded-md">
				<TouchableOpacity
					onPress={() => backward()}
					className="absolute left-10"
				>
					<BackwardIcon color="#00CCBB" />
				</TouchableOpacity>
				{!status.isPlaying && (
					<TouchableOpacity
						onPress={() =>
							playPauseToggle()
						}
						className="absolute"
					>
						<PlayIcon color="#00CCBB" />
					</TouchableOpacity>
				)}
				{status.isPlaying && (
					<TouchableOpacity
						onPress={() =>
							playPauseToggle()
						}
						className="absolute"
					>
						<PauseIcon color="#00CCBB" />
					</TouchableOpacity>
				)}
				<TouchableOpacity
					onPress={() => forward()}
					className="absolute right-10"
				>
					<ForwardIcon color="#00CCBB" />
				</TouchableOpacity>
			</View>
			<View className="flex-1 items-center justify-center">
				<Text className="font-bold text-lg pt-2 mb-4 border-b-4 border-black">
					Matchday AI
				</Text>
				<Text className="font-bold text-lg">
					AI enabled intelligence!
				</Text>
			</View>
		</View>
	);
};

export default GameScreen;

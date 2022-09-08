import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	ScrollView,
	TextInput,
	BackHandler,
	Pressable,
	SafeAreaView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import {
	MagnifyingGlassIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "react-native-heroicons/outline";
import GameCard from "../components/GameCard";

const HomeScreen = () => {
	const [fixtures, setFixtures] = useState([]);
	const [guiFixtures, setGuiFixtures] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");
	const inputRef = useRef();

	useEffect(() => {
		setLoading(true);
		fetch(
			`https://matchday.ai/referee/api/fixture/all_matches?page=${page}&rowsPerPage=5`,
			{
				headers: {
					email: "matchdayai@test.com",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setFixtures(data.fixtures);
				setGuiFixtures(data.fixtures);
				setTotalPages(data.totalPages);
			})
			.catch((error) => console.log(error))
			.finally(() => {
				setLoading(false);
			});
	}, [page]);

	const searchHandler = (searchKey) => {
		const filteredFixtures = fixtures.filter(
			(fixture) =>
				fixture.tournament[0].name
					.toLowerCase()
					.indexOf(searchKey.toLowerCase()) >
					-1 ||
				fixture.team1[0].name
					.toLowerCase()
					.indexOf(searchKey.toLowerCase()) >
					-1 ||
				fixture.team2[0].name
					.toLowerCase()
					.indexOf(searchKey.toLowerCase()) >
					-1 ||
				searchText.length == 0
		);
		setGuiFixtures(filteredFixtures);
		setSearchText(searchKey);
	};

	return (
		<SafeAreaView className="pb-14">
			<View className="flex-row bg-white p-2 items-center space-x-4 border-2 border-gray-200 mt-3 mx-2 rounded-lg">
				<MagnifyingGlassIcon color="gray" size={20} />
				<TextInput
					ref={inputRef}
					placeholder="Search for Matches"
					value={searchText}
					onChangeText={searchHandler}
					onPressIn={() =>
						inputRef.current.blur()
					}
					className="flex-1"
				/>
				{searchText.length > 0 && (
					<Pressable
						onPress={() => {
							inputRef.current.clear();
							setSearchText("");
						}}
					>
						<Text className="font-bold text-gray-400 px-2">
							x
						</Text>
					</Pressable>
				)}
			</View>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				className="p-2 pb-24"
			>
				{/* GameCards */}
				{loading ? (
					<ActivityIndicator />
				) : (
					guiFixtures.map((fixture) => (
						<GameCard
							key={fixture._id}
							id={fixture._id}
							tournament={
								fixture
									.tournament[0]
									.name
							}
							round={fixture.round}
							winner={fixture.winner}
							set1={`${fixture.a1}-${fixture.b1}`}
							set2={`${fixture.a2}-${fixture.b2}`}
							set3={`${fixture.a3}-${fixture.b3}`}
							player1={
								fixture.team1[0]
									.name
							}
							player2={
								fixture.team2[0]
									.name
							}
						/>
					))
				)}
				<View className="pb-24"></View>
			</ScrollView>
			{page > 0 && !loading && (
				<TouchableOpacity
					onPress={() => setPage(page - 1)}
					className="absolute bottom-20 left-5 z-50 bg-gray-100 p-2 rounded-full"
				>
					<ArrowLeftIcon
						color="#00CCBB"
						size={35}
					/>
				</TouchableOpacity>
			)}
			{page < totalPages && !loading && (
				<TouchableOpacity
					onPress={() => setPage(page + 1)}
					className="absolute bottom-20 right-5 z-50 bg-gray-100 p-2 rounded-full"
				>
					<ArrowRightIcon
						color="#00CCBB"
						size={35}
					/>
				</TouchableOpacity>
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;

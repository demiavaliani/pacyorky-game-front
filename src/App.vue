<template>
	<div id="app">
		<NavBar v-if="$route.name != 'boardGame'"></NavBar>
		<router-view></router-view>
		<MainFooter v-if="$route.name != 'boardGame'"></MainFooter>

		<!-- <InGameModal></InGameModal> -->

		<!-- <ErrorModal></ErrorModal> -->
		<!-- <GameLogic></GameLogic> -->
		<!-- <BoardGame></BoardGame> -->
		<!-- <GameDashboard></GameDashboard> -->
	</div>
</template>

<script>
import ErrorModal from "@/components/modals/ErrorModal";
import axios from "axios";
import NavBar from "@/components/general/NavBar";
import HomePage from "@/components/desktopApp/HomePage";
import MainFooter from "@/components/general/MainFooter";
import GameDescription from "@/components/desktopApp/GameDescription";
import BoardGame from "@/components/desktopApp/BoardGame";
import GameRules from "@/components/desktopApp/GameRules";
import GameDashboard from "@/components/desktopApp/GameDashboard";
import ActiveRoomsGraph from "@/components/desktopApp/ActiveRoomsGraph";
import CreateRoomModal from "@/components/modals/CreateRoomModal";
import JoinRoomModal from "@/components/modals/JoinRoomModal";
import GameLogic from "@/components/desktopApp/GameLogic";
import InGameModal from "@/components/modals/InGameModal";

export default {
	name: "app",
	components: {
		ErrorModal,
		NavBar,
		HomePage,
		MainFooter,
		GameDescription,
		GameRules,
		BoardGame,
		GameDashboard,
		ActiveRoomsGraph,
		CreateRoomModal,
		JoinRoomModal,
		GameLogic,
		InGameModal,
	},
	mounted() {
		// this.setPlayerID();
	},
	methods: {},
	created() {
		document.querySelector("body").style.height = "100vh";
	},
};
</script>

<style lang="less">
*::-webkit-scrollbar {
	width: 27px;
}

*::-webkit-scrollbar-thumb {
	border: 10px solid transparent;
	border-radius: 9999px;
	background-clip: padding-box;
	background-color: #5f9da5;
}

#app {
	height: 100%;
}

@font-face {
	font-family: "Montserrat";
	src: url("assets/fonts/Montserrat-Light.ttf") format("truetype");
	font-weight: 300;
}

@font-face {
	font-family: "Montserrat";
	src: url("assets/fonts/Montserrat-Regular.ttf") format("truetype");
	font-weight: 400;
}

@font-face {
	font-family: "Montserrat";
	src: url("assets/fonts/Montserrat-Medium.ttf") format("truetype");
	font-weight: 500;
}

@font-face {
	font-family: "Montserrat";
	src: url("assets/fonts/Montserrat-SemiBold.ttf") format("truetype");
	font-weight: 600;
}

@font-face {
	font-family: "Montserrat";
	src: url("assets/fonts/Montserrat-Bold.ttf") format("truetype");
	font-weight: 700;
}

@font-face {
	font-family: "Amatic_SC";
	src: url("assets/fonts/AmaticSC-Bold.ttf") format("truetype");
	font-weight: bold;
}
</style>

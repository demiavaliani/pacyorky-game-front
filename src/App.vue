<template>
	<div id="app">
		<!-- <NavBar></NavBar> -->
		<!-- <ErrorModal></ErrorModal> -->
		<!-- <router-view></router-view> -->
		<!-- <MainFooter></MainFooter> -->
		<BoardGame></BoardGame>
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
	},
	mounted() {
		this.setPlayerID();
	},
	methods: {
		setPlayerID: function() {
			axios.get("/api/player/id/").then((res) => {
				this.$cookies.set("playerid", res.data);
			});
		},
	},
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
	src: url("assets/fonts/MontserratAlternates-Regular.ttf") format("truetype");
}

@font-face {
	font-family: Montserrat;
	src: url("assets/fonts/MontserratAlternates-Bold.ttf") format("truetype");
	font-weight: bold;
}

@font-face {
	font-family: Montserrat;
	src: url("assets/fonts/MontserratAlternates-SemiBold.ttf") format("truetype");
	font-weight: 600;
}
</style>

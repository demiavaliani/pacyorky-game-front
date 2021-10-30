<template>
	<div id="home-page" class="h-75">
		<b-container fluid class="main-container h-75">
			<b-row cols="1" class="h-100 d-flex align-content-around">
				<b-col>
					<img src="@/assets/home-page/family-home-page.png" class="family-picture" />
				</b-col>

				<b-col>
					<p class="text-center text-in-middle">
						{{ $ml.get("home_page_text_middle") }}
					</p>
				</b-col>

				<b-col>
					<b-button
						to="/game-dashboard"
						class="start-game-btn d-flex justify-content-center align-items-center"
					>
						<p style="color: white;">{{ $ml.get("start_game") }}</p>
					</b-button>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/api";
export default {
	name: "HomePage",
	components: {},
	computed: {
		...mapState({
			game: "gameState",
			devicePlayerId: "devicePlayerId",
		}),
	},

	data() {
		return {
			// game: {
			// 	players: [
			// 		{
			// 			id: 1,
			// 			happiness: 0,
			// 			character: null,
			// 			deck: [],
			// 			currentDay: null,
			// 			stepFinished: false,
			// 			voted: false,
			// 			lastStep: false,
			// 			computer: false,
			// 		},
			// 		{
			// 			id: 2,
			// 			happiness: 0,
			// 			character: null,
			// 			deck: [],
			// 			currentDay: null,
			// 			stepFinished: false,
			// 			voted: false,
			// 			lastStep: false,
			// 			computer: false,
			// 		},
			// 	],
			// },
		};
	},

	methods: {
		checkGame() {
			if (this.game && this.game.players) {
				let result = this.game.players.find(({ id }) => id === this.devicePlayerId);
				if (result) {
					if (this.game.status !== "FINISHED") {
						this.$router.push(`/board-game/${this.game.id}`);
					} else if (this.game.status === "FINISHED") {
						api.leaveRoom().then();
					}
				}
			}
		},
	},

	async created() {
		await this.$store.dispatch("setGameAction");
		await this.$store.dispatch("setDevicePlayerIdAction");
		// this.checkGame();
	},
};
</script>

<style scoped>
.main-container {
	background-color: #ffffff;
	background: url("../../assets/home-page/background-patterns.png") top center no-repeat;
}

.main-container {
	margin-top: 10vh;
}

[class^="col"] {
	display: flex;
	justify-content: center;
}

p {
	margin-bottom: 0;
	font-family: "Montserrat";
	color: black;
}

.text-in-middle {
	width: 35vw;
	font-size: max(21px, 1.25vw);
	text-align: center;
	font-weight: 700;
	color: #3c3b3b;
}

.start-game-btn {
	width: max(200px, 15vw);
	height: 6vh;
	border: 0;
	border-radius: 10px;
	font-size: max(19px, 1.15vw);
	font-weight: 600;
	background-color: #35838dc9;
}

.family-picture {
	width: max(400px, 30vw);
}

@media (max-width: 991.98px) {
	.main-container {
		background: url("../../assets/home-page/background-patterns.png") center;
		background-size: 150vw;
	}
}
</style>

<template>
	<div id="main-div">
		<div id="vukol-character" class="vukol-character">
			<img src="@/assets/board-game/vukol.png" />
		</div>

		<GameLogic
			ref="gameLogic"
			@desk-order="setDeskOrder"
			@throw-dice-disabled="diceBtnDisabled = $event"
			class="game-logic"
		>
		</GameLogic>

		<b-container
			fluid
			class="d-flex justify-content-between align-items-center main-container px-0 h-100"
		>
			<b-row class="ml-3 mb-5 h-100 d-flex align-items-end">
				<b-col>
					<div class="game-controls-box">
						<b-row class="d-flex flex-column justify-content-between h-100">
							<b-col class="text-center flex-grow-0">
								<p>{{ $ml.get("my_turn") }}</p>
							</b-col>

							<b-col class="d-flex justify-content-between align-items-center flex-grow-0">
								<b-button @click="callThrowDice" :disabled="diceBtnDisabled" class="throw-dice-btn">
									<p>{{ $ml.get("throw_dice") }}</p>
								</b-button>
								<img src="@/assets/board-game/dice.svg" />
							</b-col>

							<b-col class="d-flex flex-column flex-grow-0">
								<img class="mb-2" width="34px" src="@/assets/board-game/timer.svg" />

								<svg viewBox="0 0 229 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect y="0.833008" width="229" height="11" rx="5.5" fill="#04944F" />
								</svg>
							</b-col>
						</b-row>
					</div>
				</b-col>
			</b-row>

			<div class="board-game-row">
				<img
					id="board"
					src="@/assets/board-game/board-1.svg"
					class="board-game-img"
					usemap="#image-map"
				/>

				<map name="image-map">
					<area id="img-map-area" alt="101" href="" coords="513,682,19" shape="circle" />
					<area id="img-map-area" alt="106" href="" coords="558,670,21" shape="circle" />
					<area id="img-map-area" alt="107" href="" coords="607,691,20" shape="circle" />
					<area id="img-map-area" alt="113" href="" coords="571,731,20" shape="circle" />
					<area id="img-map-area" alt="114" href="" coords="545,775,19" shape="circle" />
					<area id="img-map-area" alt="118" href="" coords="597,790,20" shape="circle" />
					<area id="img-map-area" alt="119" href="" coords="642,764,20" shape="circle" />
					<area id="img-map-area" alt="201" href="" coords="696,726,23" shape="circle" />
					<area id="img-map-area" alt="215" href="" coords="702,676,20" shape="circle" />
					<area id="img-map-area" alt="216" href="" coords="737,639,23" shape="circle" />
					<area id="img-map-area" alt="217" href="" coords="795,654,22" shape="circle" />
					<area id="img-map-area" alt="301" href="" coords="847,600,22" shape="circle" />
					<area id="img-map-area" alt="314" href="" coords="828,545,20" shape="circle" />
					<area id="img-map-area" alt="322" href="" coords="890,537,20" shape="circle" />
					<area id="img-map-area" alt="330" href="" coords="863,485,20" shape="circle" />
					<area id="img-map-area" alt="407" href="" coords="900,411,20" shape="circle" />
					<area id="img-map-area" alt="408" href="" coords="860,376,20" shape="circle" />
					<area id="img-map-area" alt="409" href="" coords="903,337,20" shape="circle" />
					<area id="img-map-area" alt="410" href="" coords="857,306,22" shape="circle" />
					<area id="img-map-area" alt="505" href="" coords="825,256,19" shape="circle" />
					<area id="img-map-area" alt="506" href="" coords="779,228,21" shape="circle" />
					<area id="img-map-area" alt="522" href="" coords="771,179,20" shape="circle" />
					<area id="img-map-area" alt="523" href="" coords="723,162,20" shape="circle" />
					<area id="img-map-area" alt="601" href="" coords="678,122,23" shape="circle" />
					<area id="img-map-area" alt="602" href="" coords="625,142,21" shape="circle" />
					<area id="img-map-area" alt="603" href="" coords="596,97,22" shape="circle" />
					<area id="img-map-area" alt="604" href="" coords="543,121,23" shape="circle" />
					<area id="img-map-area" alt="701" href="" coords="475,108,23" shape="circle" />
					<area id="img-map-area" alt="707" href="" coords="425,148,20" shape="circle" />
					<area id="img-map-area" alt="712" href="" coords="371,118,20" shape="circle" />
					<area id="img-map-area" alt="802" href="" coords="309,155,21" shape="circle" />
					<area id="img-map-area" alt="814" href="" coords="295,213,20" shape="circle" />
					<area id="img-map-area" alt="819" href="" coords="240,225,20" shape="circle" />
					<area id="img-map-area" alt="901" href="" coords="188,290,23" shape="circle" />
					<area id="img-map-area" alt="927" href="" coords="210,336,20" shape="circle" />
					<area id="img-map-area" alt="928" href="" coords="151,370,22" shape="circle" />
					<area id="img-map-area" alt="1014" href="" coords="148,440,19" shape="circle" />
					<area id="img-map-area" alt="1015" href="" coords="132,487,22" shape="circle" />
					<area id="img-map-area" alt="1016" href="" coords="181,509,22" shape="circle" />
					<area id="img-map-area" alt="1017" href="" coords="141,557,22" shape="circle" />
					<area id="img-map-area" alt="1101" href="" coords="193,597,22" shape="circle" />
					<area id="img-map-area" alt="1121" href="" coords="200,652,20" shape="circle" />
					<area id="img-map-area" alt="1122" href="" coords="255,639,22" shape="circle" />
					<area id="img-map-area" alt="1123" href="" coords="276,698,22" shape="circle" />
					<area id="img-map-area" alt="1204" href="" coords="335,724,19" shape="circle" />
					<area id="img-map-area" alt="1207" href="" coords="359,764,20" shape="circle" />
					<area id="img-map-area" alt="1213" href="" coords="415,768,20" shape="circle" />
					<area id="img-map-area" alt="1219" href="" coords="449,733,20" shape="circle" />
				</map>
			</div>

			<b-row class="d-flex justify-content-end align-items-center right-side mr-3 h-100">
				<b-col cols="12" class="d-flex justify-content-between align-items-center">
					<p>{{ $ml.get("room_name") }}</p>
					<b-button>
						<p>{{ $ml.get("end_game") }}</p>
					</b-button>
				</b-col>

				<b-col class="d-flex justify-content-end">
					<ActiveRoomsGraph
						class="active-rooms-graph"
						:displayRoomName="false"
						:activePlayersCountFromActiveRoomsGraph="game.players ? game.players.length : 0"
					></ActiveRoomsGraph>
				</b-col>

				<b-col cols="12" class="d-flex justify-content-end">
					<div class="my-cards-box">
						<b-row class="d-flex justify-content-end align-items-start h-100 mx-auto">
							<b-col cols="auto" class="d-flex flex-column">
								<p>{{ $ml.get("deck") }}</p>
							</b-col>

							<b-col cols="auto" class="pr-0 d-flex flex-column">
								<img src="@/assets/board-game/info-sign.svg" width="18" />
							</b-col>

							<b-col cols="12" class="cards dishes pl-0 pr-4">
								<b-row class="mx-auto">
									<b-col cols="1" class="p-0 first-col">
										<img src="@/assets/cards/dishes/borsh.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/cukerki.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/dishes/golubci.png" />
									</b-col>
								</b-row>
							</b-col>

							<b-col cols="12" class="cards stuff pl-0 pr-4">
								<b-row class="mx-auto">
									<b-col cols="1" class="p-0 first-col">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/stuff/bajan.png" />
									</b-col>
								</b-row>
							</b-col>

							<b-col cols="12" class="cards rituals pl-0 pr-4">
								<b-row class="mx-auto">
									<b-col cols="1" class="p-0 first-col">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>

									<b-col cols="1" class="p-0">
										<img src="@/assets/cards/rituals/chitannja.png" />
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</div>
				</b-col>

				<b-col cols="12" class="d-flex justify-content-end">
					<div class="my-progress-box">
						<b-row class="h-100">
							<b-col cols="6" class="left h-100">
								<img
									class="character-img w-100 h-100"
									src="@/assets/cards/character/baba_docka.png"
								/>
							</b-col>

							<b-col cols="6" class="d-flex flex-column justify-content-between right">
								<p>{{ $ml.get("my_character") }}</p>

								<p class="mt-5">{{ $ml.get("my_happiness") }}</p>

								<b-row class="d-flex justify-content-center align-items-center happiness">
									<b-col cols="5" class="px-0">
										<img src="@/assets/board-game/zheton.png" />
									</b-col>
									<b-col cols="auto" class="px-2">
										<p>-</p>
									</b-col>
									<b-col cols="2" class="px-0">
										<p>0</p>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ImageMap from "image-map";
import GameLogic from "./GameLogic";
import ActiveRoomsGraph from "./ActiveRoomsGraph.vue";

export default {
	name: "BoardGame",

	components: {
		GameLogic,
		ActiveRoomsGraph,
	},

	data() {
		return {
			deskOrder: "",
			boardX: "",
			boardY: "",
			adjustedCoordX: "",
			adjustedCoordY: "",
			diceBtnDisabled: "",
		};
	},

	computed: {
		...mapState({
			game: "gameState",
		}),
		// diceDisabled() {
		// 	this.$refs.gameLogic.throwDiceDisabled();
		// },
	},

	methods: {
		callThrowDice() {
			this.$refs.gameLogic.throwDice();
		},

		callThrowCards() {
			this.$refs.gameLogic.throwCards();
		},

		callVote() {
			this.$refs.gameLogic.vote();
		},

		callLeaveRoom() {
			this.$refs.gameLogic.leaveRoom();
		},

		setDeskOrder(event) {
			this.deskOrder = event;
		},

		getBoardPosition() {
			let elem = document.querySelector("#board");
			let board = elem.getBoundingClientRect();
			this.boardX = board.x;
			this.boardY = board.y;
			// console.log("Original boardX: ", this.boardX);
			// console.log("Original boardY: ", this.boardY);
		},

		adjustImgMapCoords() {
			setTimeout(() => {
				let elem = document.querySelector(`area[alt='${this.deskOrder}']`);
				// console.log("elem is: ", elem);
				let coordsAttr = elem.getAttribute("coords");
				// console.log("coords attribute is: ", coordsAttr);
				let coordsAttrArray = coordsAttr.split(",");
				// console.log("splitted attributes array:", coordsAttrArray);
				this.adjustedCoordX = this.boardX + parseFloat(coordsAttrArray[0]);
				this.adjustedCoordY = this.boardY + parseFloat(coordsAttrArray[1]);
				// console.log("adjusted coordX: ", this.adjustedCoordX);
				// console.log("adjusted coordY: ", this.adjustedCoordY);
			});
		},

		udpatePlayerBoardPosition() {
			setTimeout(() => {
				let player = document.getElementById("vukol-character");

				player.style.left = `${this.adjustedCoordX - 20}px`;
				player.style.top = `${this.adjustedCoordY - 120}px`;

				// console.log("player.style.left", player.style.left);
				// console.log("player.style.top", player.style.top);
			}, 15);
		},

		areaClick() {
			let area = document.getElementsByTagName("area");

			area.forEach(() => {
				addEventListener("click", event => {
					event.preventDefault();
					// event.stopPropagation();
					// event.stopImmediatePropagation();
				});
			});
		},
	},

	watch: {
		deskOrder() {
			// this.getBoardPosition();
			this.adjustImgMapCoords();
			// this.udpatePlayerBoardPosition();
		},
	},

	mounted() {
		ImageMap("img[usemap]", 0);
		this.areaClick();
		window.addEventListener("load", () => {
			this.getBoardPosition();
			this.adjustImgMapCoords();

			this.$watch("deskOrder", function() {
				console.log("WWWWWWWWWWWW");
				this.udpatePlayerBoardPosition();
			});
		});
	},

	// beforeUpdate() {
	// 	ImageMap("img[usemap]");
	// },
};
</script>

<style scoped>
.game-logic {
	position: absolute;
}

* {
	box-sizing: border-box;
}

#main-div {
	height: 100vh;
	background: url("../../assets/home-page/background-patterns.png") center no-repeat;
	background-size: 100vw;
}

p {
	margin-bottom: 0;
	font-family: "Amatic_SC";
	line-height: 1;
	color: black;
}

/* .board-game-row {
	position: absolute;
	left: 25%;
} */

.board-game-row img {
	width: 50vw;
}

.game-controls-box {
	width: 287px;
	height: 272px;
	padding: 20px 30px 35px 30px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07),
		0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275),
		0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725),
		0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

.game-controls-box p {
	font-size: 32px;
}

.throw-dice-btn {
	border: 1px solid #5f9da5;
	border-radius: 10px;
	background-color: white;
}

.throw-dice-btn p {
	font-size: 20px;
}

.right-side p {
	font-size: 50px;
}

.right-side button p {
	font-family: "Montserrat";
	font-size: 18px;
}

::v-deep .men-img {
	width: 10vw;
}

.my-cards-box {
	width: 198px;
	height: 380px;
	padding: 10px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07),
		0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275),
		0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725),
		0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

.my-cards-box p {
	font-size: 35px;
}

.my-cards-box .cards {
	height: 90px;
}

.my-cards-box .cards img {
	width: 53px;
}

.cards .p-0:hover img {
	position: absolute;
	width: 110px;
	bottom: 20px;
	z-index: 9999;
}

/* .cards :nth-child(n + 1):hover img {
	position: absolute;
	bottom: 20px;
	z-index: 9999;
} */

.cards :nth-child(9) {
	position: relative;
	top: 3px;
}

.cards :nth-child(8) {
	position: relative;
	top: 6px;
}

.cards :nth-child(7) {
	position: relative;
	top: 9px;
}

.cards :nth-child(6) {
	position: relative;
	top: 12px;
}

.cards :nth-child(5) {
	position: relative;
	top: 15px;
}

.cards :nth-child(4) {
	position: relative;
	top: 18px;
}

.cards :nth-child(3) {
	position: relative;
	top: 21px;
}

.cards :nth-child(2) {
	position: relative;
	top: 24px;
}

.first-col {
	position: relative;
	top: 27px;
}

.my-progress-box {
	width: 329px;
	height: 200px;
	padding: 20px 30px 20px 30px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07),
		0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275),
		0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725),
		0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

.my-progress-box p {
	font-size: 22px;
	text-align: center;
}

.happiness img {
	width: 55px;
}

.happiness p {
	font-size: 33px;
}

.vukol-character {
	position: absolute;
	/* top: 450px;
	left: 50px; */
	z-index: 1;
}

@media (min-width: 768px) and (max-width: 991.98px) {
}
@media (min-width: 992px) and (max-width: 1199.98px) {
}
@media (min-device-width: 1400px) and (max-device-width: 1440px) {
}
@media (min-device-width: 1536px) and (max-device-width: 1536px) {
}
</style>

<template>
	<div id="main-div">
		<!-- <div id="vukol-character" class="vukol-character">
			<img src="@/assets/board-game/vukol.png" />
		</div> -->

		<b-row class="ml-3 mb-5 h-100 d-flex align-items-end">
			<!-- <GameLogic @deskOrder="setDeskOrder"></GameLogic> -->
			<b-col>
				<div class="game-controls-box">
					<b-row cols="1" class="d-flex justify-content-center align-items-stretch h-100 mx-auto">
						<b-col class="text-center">My Turn</b-col>
						<b-col>
							<b-button class="throw-dice-btn">Throw Dice</b-button>
							<img src="@/assets/board-game/dice.svg" />
						</b-col>
						<b-col>
							<img src="@/assets/board-game/timer.svg" />
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>

		<b-row class="board-game-row">
			<b-col>
				<img src="@/assets/board-game/board-1.svg" class="board-game-img" usemap="#image-map" />

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
			</b-col>
		</b-row>
	</div>
</template>

<script>
import ImageMap from "image-map";
import GameLogic from "./GameLogic";

export default {
	name: "BoardGame",

	components: {
		GameLogic,
	},

	data() {
		return {
			deskOrder: "",
			boardX: "",
			boardY: "",
			adjustedCoordX: "",
			adjustedCoordY: "",
		};
	},

	computed: {},

	methods: {
		setDeskOrder(event) {
			this.deskOrder = event;
		},

		getBoardPosition() {
			if (document.readyState !== "complete") {
				window.addEventListener("load", () => {
					let elem = document.querySelector("#board");
					let board = elem.getBoundingClientRect();
					this.boardX = board.x;
					this.boardY = board.y;
					// console.log("boardX: ", this.boardX);
					// console.log("boardY: ", this.boardY);
				});
			} else if (document.readyState === "complete") {
				let elem = document.querySelector("#board");
				let board = elem.getBoundingClientRect();
				this.boardX = board.x;
				this.boardY = board.y;
				console.log("boardX: ", this.boardX);
				console.log("boardY: ", this.boardY);
			}
		},

		adjustImgMapCoords() {
			if (document.readyState !== "complete") {
				window.addEventListener("load", () => {
					setTimeout(() => {
						let elem = document.body.querySelector(`area[alt="${this.deskOrder}"]`);
						let coordsAttr = elem.getAttribute("coords");
						let coordsAttrArray = coordsAttr.split(",");
						// console.log("coords attributes array:", coordsAttrArray);

						this.adjustedCoordX = this.boardX + parseFloat(coordsAttrArray[0]);
						this.adjustedCoordY = this.boardY + parseFloat(coordsAttrArray[1]);
						// console.log("adjusted coordX: ", this.adjustedCoordX);
						// console.log("adjusted coordY: ", this.adjustedCoordY);
					});
				});
			} else if (document.readyState === "complete") {
				setTimeout(() => {
					let elem = document.body.querySelector(`area[alt="${this.deskOrder}"]`);
					let coordsAttr = elem.getAttribute("coords");
					let coordsAttrArray = coordsAttr.split(",");
					// console.log("coords attributes array:", coordsAttrArray);

					this.adjustedCoordX = this.boardX + parseFloat(coordsAttrArray[0]);
					this.adjustedCoordY = this.boardY + parseFloat(coordsAttrArray[1]);
					console.log("adjusted coordX: ", this.adjustedCoordX);
					console.log("adjusted coordY: ", this.adjustedCoordY);
				});
			}
		},

		udpatePlayerBoardPosition() {
			setTimeout(() => {
				let player = document.getElementById("vukol-character");

				player.style.left = `${this.adjustedCoordX}px`;
				player.style.top = `${this.adjustedCoordY}px`;

				console.log("player.style.left", player.style.left);
				console.log("player.style.top", player.style.top);
			});
		},

		areaClick() {
			let area = document.getElementsByTagName("area");

			area.forEach(() => {
				addEventListener("click", event => {
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
				});
			});
		},

		// fillMan(position) {
		// 	return this.activePlayersCountFromActiveRoomsGraph >= position;
		// }
	},

	watch: {
		deskOrder() {
			this.getBoardPosition();
			this.adjustImgMapCoords();
			this.udpatePlayerBoardPosition();
		},
	},

	mounted() {
		ImageMap("img[usemap]");
		this.areaClick();
		// this.getBoardPosition();
		// this.adjustImgMapCoords();
		// this.udpatePlayerBoardPosition();
	},

	// beforeUpdate() {
	// 	ImageMap("img[usemap]");
	// },
};
</script>

<style scoped>
* {
	box-sizing: content-box;
}

#main-div {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: url("../../assets/home-page/background-patterns.png") center no-repeat;
	background-size: 100vw;
}

.board-game-row {
	position: absolute;
	left: 25%;
}

.board-game-row img {
	width: 50vw;
}

.game-controls-box {
	width: 287px;
	height: 272px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	background-color: #ffffff;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07),
		0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275),
		0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725),
		0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
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

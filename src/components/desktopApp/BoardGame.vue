<template>
	<div id="main-div">
		<div
			v-for="player in playersInGame"
			:key="player.id"
			v-if="game && game.players && game.status === 'STARTED'"
			:id="'player-character-' + player.character.name"
			class="player-character"
      :style="inited ? '' : 'opacity: 0'"
		>
			<img :src="require('@/assets/cards/moving_characters/' + player.character.name + '.png')" />
		</div>

		<GameLogic
			ref="gameLogic"
			@throw-dice-disabled="diceBtnDisabled = $event"
			@show-throw-cards-modal="throwCardsModalVisible = true"
			@dropped-cards="populateVoteCardDecks($event)"
			@show-vote-modal="voteModalVisible = true"
			@show-game-ended-modal="gameEndedModalVisible = true"
			@show-step-time-out-modal="stepTimeOutModalVisible = true"
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
								<p v-if="!game.step"></p>
								<p v-else-if="isCurrentPlayer">
									{{ $ml.get("my_turn") }}
								</p>
								<p v-else-if="!isCurrentPlayer">
									Current Player: {{ this.game.step.currentPlayer.character.name }}
								</p>
							</b-col>

							<b-col class="d-flex flex-grow-0">
								<div
									class="d-flex justify-content-between align-items-center flex-grow-1"
									v-if="!game.step || isCurrentPlayer"
								>
									<b-button
										@click="callThrowDice"
										:disabled="diceBtnDisabled"
										class="throw-dice-btn"
									>
										<p>{{ $ml.get("throw_dice") }}</p>
									</b-button>
									<img src="@/assets/board-game/dice.svg" />
								</div>

								<div
									class="d-flex justify-content-center align-items-center flex-grow-1"
									v-else-if="!isCurrentPlayer"
								>
									<p>
										{{ this.game.step.status }}
									</p>
								</div>
							</b-col>

							<b-button @click="timerAnimate"></b-button>

							<b-col class="d-flex flex-column flex-grow-0">
								<img class="mb-2" width="34px" src="@/assets/board-game/timer.svg" />

								<svg
									class="timer"
									viewBox="0 0 229 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect class="timer-rect" y="0.833008" height="11" rx="5.5" fill="#04944F" />
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
					@load="getBoardPosition"
				/>

				<map name="image-map">
					<area alt="101" href="" coords="513,682,19" shape="circle" />
					<area alt="106" href="" coords="558,670,21" shape="circle" />
					<area alt="107" href="" coords="607,691,20" shape="circle" />
					<area alt="113" href="" coords="571,731,20" shape="circle" />
					<area alt="114" href="" coords="545,775,19" shape="circle" />
					<area alt="118" href="" coords="597,790,20" shape="circle" />
					<area alt="119" href="" coords="642,764,20" shape="circle" />
					<area alt="201" href="" coords="696,726,23" shape="circle" />
					<area alt="215" href="" coords="702,676,20" shape="circle" />
					<area alt="216" href="" coords="737,639,23" shape="circle" />
					<area alt="217" href="" coords="795,654,22" shape="circle" />
					<area alt="301" href="" coords="847,600,22" shape="circle" />
					<area alt="314" href="" coords="828,545,20" shape="circle" />
					<area alt="322" href="" coords="890,537,20" shape="circle" />
					<area alt="330" href="" coords="863,485,20" shape="circle" />
					<area alt="407" href="" coords="900,411,20" shape="circle" />
					<area alt="408" href="" coords="860,376,20" shape="circle" />
					<area alt="409" href="" coords="903,337,20" shape="circle" />
					<area alt="410" href="" coords="857,306,22" shape="circle" />
					<area alt="505" href="" coords="825,256,19" shape="circle" />
					<area alt="506" href="" coords="779,228,21" shape="circle" />
					<area alt="522" href="" coords="771,179,20" shape="circle" />
					<area alt="523" href="" coords="723,162,20" shape="circle" />
					<area alt="601" href="" coords="678,122,23" shape="circle" />
					<area alt="602" href="" coords="625,142,21" shape="circle" />
					<area alt="603" href="" coords="596,97,22" shape="circle" />
					<area alt="604" href="" coords="543,121,23" shape="circle" />
					<area alt="701" href="" coords="475,108,23" shape="circle" />
					<area alt="707" href="" coords="425,148,20" shape="circle" />
					<area alt="712" href="" coords="371,118,20" shape="circle" />
					<area alt="802" href="" coords="309,155,21" shape="circle" />
					<area alt="814" href="" coords="295,213,20" shape="circle" />
					<area alt="819" href="" coords="240,225,20" shape="circle" />
					<area alt="901" href="" coords="188,290,23" shape="circle" />
					<area alt="927" href="" coords="210,336,20" shape="circle" />
					<area alt="928" href="" coords="151,370,22" shape="circle" />
					<area alt="1014" href="" coords="148,440,19" shape="circle" />
					<area alt="1015" href="" coords="132,487,22" shape="circle" />
					<area alt="1016" href="" coords="181,509,22" shape="circle" />
					<area alt="1017" href="" coords="141,557,22" shape="circle" />
					<area alt="1101" href="" coords="193,597,22" shape="circle" />
					<area alt="1121" href="" coords="200,652,20" shape="circle" />
					<area alt="1122" href="" coords="255,639,22" shape="circle" />
					<area alt="1123" href="" coords="276,698,22" shape="circle" />
					<area alt="1204" href="" coords="335,724,19" shape="circle" />
					<area alt="1207" href="" coords="359,764,20" shape="circle" />
					<area alt="1213" href="" coords="415,768,20" shape="circle" />
					<area alt="1219" href="" coords="449,733,20" shape="circle" />
				</map>
			</div>

			<b-row class="d-flex justify-content-end align-items-center right-side mr-3 h-100">
				<b-col cols="12" class="d-flex justify-content-between align-items-center">
					<p v-if="game">{{ $ml.get("room_name") }} “{{ game.name }}”</p>
					<b-button @click="leaveRoom()">
						<p>{{ $ml.get("end_game") }}</p>
					</b-button>
				</b-col>

				<b-col class="d-flex justify-content-end">
					<ActiveRoomsGraph
						v-if="game"
						class="active-rooms-graph"
            :currentRoomFromActiveRoomsGraph="game"
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

							<b-col cols="12" class="pl-0 pr-4">
								<b-row class="cards mx-auto">
									<div class="p-0" style="width: 53px; height: 73px;" v-for="card in dishesDeck">
										<img :src="require('@/assets/cards/dishes/' + card.name + '.png')" />
									</div>
								</b-row>
							</b-col>

							<b-col cols="12" class="pl-0 pr-4">
								<b-row class="cards mx-auto">
									<div class="p-0" style="width: 53px; height: 73px;" v-for="card in ritualsDeck">
										<img :src="require('@/assets/cards/rituals/' + card.name + '.png')" />
									</div>
								</b-row>
							</b-col>

							<b-col cols="12" class="pl-0 pr-4">
								<b-row class="cards mx-auto">
									<div class="p-0" style="width: 53px; height: 73px;" v-for="card in stuffDeck">
										<img :src="require('@/assets/cards/stuff/' + card.name + '.png')" />
									</div>
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
									v-if="currentDevicePlayer && currentDevicePlayer.character"
									class="character-img w-100 h-100"
									:src="require('@/assets/cards/character/' + playerCharacter + '.png')"
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
										<p>{{ playerHappiness }}</p>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</div>
				</b-col>
			</b-row>
		</b-container>

		<InGameModal :modalVisible="throwCardsModalVisible" :footerHidden="false">
			<template v-slot:upper-half>
				<div class="mx-1" v-for="card in dishesDeck">
					<img
						:src="require('@/assets/cards/dishes/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToThrow')"
					/>
					<p>{{ card.id }}</p>
				</div>

				<div class="mx-1" v-for="card in ritualsDeck">
					<img
						:src="require('@/assets/cards/rituals/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToThrow')"
					/>
					<p>{{ card.id }}</p>
				</div>

				<div class="mx-1" v-for="card in stuffDeck">
					<img
						:src="require('@/assets/cards/stuff/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToThrow')"
					/>
					<p>{{ card.id }}</p>
				</div>
				<p>{{ cardsToThrow }}</p>
			</template>

			<template v-slot:footer>
				<b-button @click="callThrowCards()">
					<p v-bind:style="{ color: 'white', fontSize: '22px' }">
						{{ $ml.get("throw_cards") }}
					</p>
				</b-button>
			</template>
		</InGameModal>

		<InGameModal :modalVisible="voteModalVisible" :footerHidden="false">
			<template v-slot:upper-half>
				<div class="mx-1" v-for="card in dishesDeckForVote">
					<img
						:src="require('@/assets/cards/dishes/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToVote')"
					/>
					<p>{{ card.id }}</p>
				</div>

				<div class="mx-1" v-for="card in ritualsDeckForVote">
					<img
						:src="require('@/assets/cards/rituals/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToVote')"
					/>
					<p>{{ card.id }}</p>
				</div>

				<div class="mx-1" v-for="card in stuffDeckForVote">
					<img
						:src="require('@/assets/cards/stuff/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToVote')"
					/>
					<p>{{ card.id }}</p>
				</div>
				<p>{{ cardsToVote }}</p>
			</template>

			<template v-slot:footer>
				<b-button @click="callVote()">
					<p v-bind:style="{ color: 'white', fontSize: '22px' }">
						{{ $ml.get("throw_cards") }}
					</p>
				</b-button>
			</template>
		</InGameModal>

		<InGameModal :modalVisible="gameEndedModalVisible" :footerHidden="false">
			<template v-slot:upper-half>
				<!-- <p style="font-family: Montserrat; font-size: 35px;"> -->
				<p v-bind:style="{ fontFamily: 'Montserrat', fontWeight: '500', fontSize: '35px' }">
					{{ $ml.get("game_ended") }}
				</p>
			</template>

			<template v-slot:footer>
				<b-button to="/">
					<p
						v-bind:style="{
							color: 'white',
							fontFamily: 'Montserrat',
							fontWeight: '400',
							fontSize: '18px',
						}"
					>
						{{ $ml.get("go_back_to_home_page") }}
					</p>
				</b-button>
			</template>
		</InGameModal>

		<InGameModal :modalVisible="false" :footerHidden="false">
			<template v-slot:upper-half>
				<p
					v-bind:style="{
						color: '#E15465',
						fontFamily: 'Montserrat',
						fontWeight: '500',
						fontSize: '35px',
					}"
				>
					{{ $ml.get("step_time_over") }}
				</p>
			</template>

			<template v-slot:footer>
				<p v-bind:style="{ fontFamily: 'Montserrat', fontWeight: '300', fontSize: '35px' }">
					{{ $ml.get("switching_step") }}
				</p>
			</template>
		</InGameModal>
	</div>
</template>

<script>
import api from "@/api/api";
import * as imageMapResize from "@/plugins/imageMapResizer.min.js";
import { mapState } from "vuex";
import GameLogic from "./GameLogic";
import ActiveRoomsGraph from "./ActiveRoomsGraph.vue";
import InGameModal from "../modals/InGameModal.vue";

export default {
	name: "BoardGame",

	components: {
		GameLogic,
		ActiveRoomsGraph,
		InGameModal,
	},

	data() {
		return {
			deskOrder: 101,
			currentDevicePlayer: {},
			boardX: "",
			boardY: "",
			adjustedCoordX: "",
			adjustedCoordY: "",
			inited: false,
			playersInGame: [],

			cardsToThrow: [],
			cardsToVote: [],
			dishesDeckForVote: [
				// { id: 15, name: "med", cardType: 1 },
				// { id: 9, name: "polunica", cardType: 1 },
			],
			ritualsDeckForVote: [
				// { id: 123, name: "chitannja", cardType: 2 },
				// { id: 152, name: "prikrashati_hati", cardType: 2 },
			],
			stuffDeckForVote: [
				// { id: 193, name: "proskuri", cardType: 3 },
				// { id: 187, name: "ptashki", cardType: 3 },
			],

			dishesDeck: [
				// { id: 15, name: "med", cardType: 1 },
				// { id: 9, name: "polunica", cardType: 1 },
			],
			ritualsDeck: [
				// { id: 123, name: "chitannja", cardType: 2 },
				// { id: 152, name: "prikrashati_hati", cardType: 2 },
			],
			stuffDeck: [
				// { id: 193, name: "proskuri", cardType: 3 },
				// { id: 187, name: "ptashki", cardType: 3 },
			],

			throwCardsModalVisible: false,
			voteModalVisible: false,
			gameEndedModalVisible: false,
			stepTimeOutModalVisible: false,

			diceBtnDisabled: true,
		};
	},

	computed: {
		...mapState({
			game: "gameState",
			devicePlayerId: "devicePlayerId",
		}),

		playerHappiness() {
			return this.currentDevicePlayer.happiness;
		},

		playerCharacter() {
			return this.currentDevicePlayer.character.name;
		},

		isCurrentPlayer() {
			if (this.game.step && this.currentDevicePlayer.id === this.game.step.currentPlayer.id) {
				return true;
			}
		},
	},

	methods: {
		timerAnimate(startAt) {
			if (this.game.status === "WAITING") {
				let msTillGameStart = new Date(startAt) - new Date();
				console.log(msTillGameStart);
				let timerRect = document.querySelector(".timer-rect");

				timerRect.animate([{ width: "229px" }, { width: "0" }], {
					duration: msTillGameStart,
					fill: "forwards",
				});
			} else if (this.game.status === "STARTED") {
				let msTillNextStep = new Date(startAt) - new Date();
				console.log(msTillNextStep);
				let timerRect = document.querySelector(".timer-rect");

				timerRect.animate([{ width: "229px" }, { width: "0" }], {
					duration: msTillNextStep,
					fill: "forwards",
				});
			}
		},

		chooseCardsForAction(id, ev, actionArray) {
			let elementStyle = ev.target.style;

			if (!this[actionArray].includes(id)) {
				this[actionArray].push(id);

				elementStyle.position = "relative";
				elementStyle.bottom = "30px";
			} else {
				let cardIndexToRemove = this[actionArray].indexOf(id);
				this[actionArray].splice(cardIndexToRemove, 1);

				elementStyle.position = "static";
				elementStyle.bottom = "0";
			}
		},

		callThrowDice() {
			this.$refs.gameLogic.throwDice();
		},

		callThrowCards() {
			this.$refs.gameLogic.throwCards(this.cardsToThrow);
			this.cardsToThrow = [];
			this.throwCardsModalVisible = false;
		},

		populateVoteCardDecks(thrownCards) {
			this.dishesDeckForVote = thrownCards.filter(card => card.cardType === 1);
			this.ritualsDeckForVote = thrownCards.filter(card => card.cardType === 2);
			this.stuffDeckForVote = thrownCards.filter(card => card.cardType === 3);
		},

		callVote() {
			this.$refs.gameLogic.vote(this.cardsToVote);
			this.cardsToVote = [];
			this.voteModalVisible = false;
		},

		leaveRoom() {
			api.leaveRoom().then();
		},

		setDeskOrder(event) {
			//this.deskOrder = event;
		},

		getBoardPosition() {
			let elem = document.querySelector("#board");
			let board = elem.getBoundingClientRect();
			this.boardX = board.x;
			this.boardY = board.y;
			// console.log("Original boardX: ", this.boardX);
			// console.log("Original boardY: ", this.boardY);

			imageMapResize();
		},

		adjustImgMapCoords(players) {
			if (this.game && players && this.game.status === "STARTED") {
				for (let player of players) {
					let elem = document.querySelector(`area[alt='${player.currentDay.deskOrder}']`);
					let coordsAttr = elem.getAttribute("coords");
					let coordsAttrArray = coordsAttr.split(",");

					let playerFigure = document.getElementById("player-character-" + player.character.name);
					if (playerFigure) {
						let elementWidth = playerFigure.getBoundingClientRect().width;

						playerFigure.style.left = `${this.boardX + parseFloat(coordsAttrArray[0]) - elementWidth / 2}px`;
						playerFigure.style.top = `${this.boardY + parseFloat(coordsAttrArray[1]) - 120}px`;
						this.inited = true;
					}
				}
			}
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
			//this.adjustImgMapCoords();
		},

		game: {
			handler: function() {
				if (
					this.game &&
					this.game.status === "STARTED" &&
					this.game.players &&
					this.devicePlayerId
				) {
					this.currentDevicePlayer = this.game.players.filter(
						player => player.id == this.devicePlayerId
					)[0];
				}

				if (Object.keys(this.currentDevicePlayer).length) {
					let deck = this.currentDevicePlayer.deck;

					this.dishesDeck = deck.filter(card => card.cardType === 1);
					this.ritualsDeck = deck.filter(card => card.cardType === 2);
					this.stuffDeck = deck.filter(card => card.cardType === 3);
				}

				if (this.game && this.game.status === "STARTED" && this.game.players) {
					if (
						this.playersInGame.length === 0 ||
						this.playersInGame.length !== this.game.players.length
					) {
						this.playersInGame = this.game.players;
						setTimeout(() => this.adjustImgMapCoords(this.playersInGame), 500);
					}
					if (this.game.step) {
						this.adjustImgMapCoords([this.game.step.currentPlayer]);
					}
				}
			},
			deep: true,
		},

		"game.startAt": function() {
			console.log(this.game.startAt);
			this.timerAnimate(this.game.startAt);
		},

		"game.nextStepAt": function() {
			console.log(this.game.nextStepAt);
			if (this.game.nextStepAt) {
				this.timerAnimate(this.game.nextStepAt);
			}
		},
	},

	mounted() {
		this.areaClick();
	},
};
</script>

<style scoped>
.timer-rect {
	width: 229px;
	/* transition: width 10s linear 0s; */
}

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
	bottom: 100px;
	z-index: 9999;
}

.cards :nth-child(10) {
	position: absolute;
	top: 3px;
	left: 108px;
}

.cards :nth-child(9) {
	position: absolute;
	top: 3px;
	left: 96px;
}

.cards :nth-child(8) {
	position: absolute;
	top: 6px;
	left: 84px;
}

.cards :nth-child(7) {
	position: absolute;
	top: 9px;
	left: 72px;
}

.cards :nth-child(6) {
	position: absolute;
	top: 12px;
	left: 60px;
}

.cards :nth-child(5) {
	position: absolute;
	top: 15px;
	left: 48px;
}

.cards :nth-child(4) {
	position: absolute;
	top: 18px;
	left: 36px;
}

.cards :nth-child(3) {
	position: absolute;
	top: 21px;
	left: 24px;
}

.cards :nth-child(2) {
	position: absolute;
	top: 24px;
	left: 12px;
}

.cards > :nth-child(1) {
	position: absolute;
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

.player-character {
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

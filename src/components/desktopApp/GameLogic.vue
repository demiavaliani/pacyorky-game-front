<template>
	<div>
		<div><b>Game Status:</b> {{ gameStatus }}</div>
		<div><b>Step Status:</b> {{ stepStatus }}</div>
		<div><b>Device Player:</b> {{ devicePlayerId }}</div>
		<div><b>Current Player:</b> {{ currentTurnPlayerId }}</div>
		<div><b>Desk Order:</b> {{ deskOrder }}</div>
		<b-button @click="throwCards()" :disabled="throwCardsDisabled">Throw Cards</b-button>
		<b-button @click="vote()" :disabled="voteDisabled">Vote</b-button>
		<b-button @click="leaveRoom()">Leave room</b-button>
	</div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/api";
import axios from "axios";

export default {
	name: "GameLogic",

	components: {},

	data() {
		return {
			gameStatus: "",
			deskOrder: "",
			currentTurnPlayerId: "",
			stepStatus: "",
			droppedCards: [],
		};
	},

	computed: {
		...mapState({
			game: "gameState",
			devicePlayerId: "devicePlayerId",
		}),
	},

	methods: {
		throwDice() {
			api.throwDice().then(() => {
				// console.log("Threw Dice!!!");
			});
		},

		// currently for testing - passing random card IDs
		throwCards() {
			const playerCardIDs = [];
			this.game.step.currentPlayer.deck
				.slice(0, 3)
				.forEach(eachId => playerCardIDs.push(eachId.id));
			api.throwCards(playerCardIDs).then(() => {
				this.getDroppedCards();
				// console.log("Threw Cards!!!");
			});
		},

		getDroppedCards() {
			if (this.game && this.gameStatus === "STARTED" && this.stepStatus === "WAITING_VOTE") {
				api.getGame().then(res => {
					let cards = res.step.stepCards;
					let cardIdArr = [];
					for (let item of cards) {
						cardIdArr.push(item.card.id);
					}
					this.droppedCards = cardIdArr;
				});
			}
		},

		vote() {
			api.vote(this.droppedCards).then(res => {
				// console.log("Vote given!!!");
				// console.log(res);
			});
		},

		leaveRoom() {
			api.leaveRoom().then(res => {});
		},

		initializeGame() {
			this.$store.dispatch("setGameAction");
			setInterval(() => {
				this.$store.dispatch("setGameAction");
			}, 2000);
		},

		initializeDevicePlayerId() {
			this.$store.dispatch("setDevicePlayerIdAction");
		},

		setGameStatus() {
			if (this.game) {
				this.gameStatus = this.game.status;
			}
		},

		setDeskOrder() {
			if (this.game && this.gameStatus === "STARTED") {
				this.deskOrder = this.game.players.filter(
					curPlayer => curPlayer.id == this.devicePlayerId
				)[0].currentDay.deskOrder;
			}
			this.$emit("desk-order", this.deskOrder || 101);
		},

		identifyCurrentTurnPlayerId() {
			if (this.game && this.gameStatus === "STARTED" && this.game.step.currentPlayer.id) {
				this.currentTurnPlayerId = this.game.step.currentPlayer.id;
			}
		},

		setStepStatus() {
			if (this.game && this.gameStatus === "STARTED" && this.game.step.status) {
				this.stepStatus = this.game.step.status;
			}
		},

		throwDiceDisabled() {
			if (this.stepStatus !== "WAITING_DICE") {
				this.$emit("throw-dice-disabled", true);
			} else if (
				this.stepStatus === "WAITING_DICE" &&
				this.currentTurnPlayerId === this.devicePlayerId
			) {
				this.$emit("throw-dice-disabled", false);
			}
		},

		throwCardsDisabled() {
			if (this.stepStatus !== "WAITING_CARD" || this.currentTurnPlayerId !== this.devicePlayerId) {
				return true;
			} else false;
		},

		voteDisabled() {
			if (this.stepStatus !== "WAITING_VOTE" || this.currentTurnPlayerId === this.devicePlayerId) {
				return true;
			} else false;
		},
	},

	watch: {
		game() {
			this.setGameStatus();
			this.setDeskOrder();

			this.identifyCurrentTurnPlayerId();
			this.setStepStatus();
			this.getDroppedCards();
		},

		stepStatus() {
			this.throwDiceDisabled();
		},
	},

	created() {
		this.initializeGame();
		this.initializeDevicePlayerId();
	},
};
</script>

<style scoped></style>

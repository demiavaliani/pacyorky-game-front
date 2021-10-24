<template>
	<div>
		<div><b>Game Status:</b> {{ gameStatus }}</div>
		<div><b>Step Status:</b> {{ stepStatus }}</div>
		<div><b>Device Player:</b> {{ devicePlayerId }}</div>
		<div><b>Current Player:</b> {{ currentTurnPlayerId }}</div>
		<div><b>Desk Order:</b> {{ deskOrder }}</div>
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
		};
	},

	computed: {
		...mapState({
			game: "gameState",
			devicePlayerId: "devicePlayerId",
		}),

		secondsTillNextStep() {
			// let timeNow = new Date();
			// let nextStepAt = this.game.nextStepAt;
			// let timeLeft = (timeNow - nextStepAt) / 1000;
			// console.log((new Date() - this.game.nextStepAt) / 1000);
		},
	},

	methods: {
		initializeGame() {
			let interval = setInterval(() => {
				if (!this.game || !Object.keys(this.game).length) {
					clearInterval(interval);
				} else {
					this.$store.dispatch("setGameAction");
				}
			}, 2000);
		},

		initializeDevicePlayerId() {
			this.$store.dispatch("setDevicePlayerIdAction");
		},

		throwDice() {
			api.throwDice().then(() => {});
		},

		throwCards(cardsToThrow) {
			api.throwCards(cardsToThrow).then(res => {
				// this.getDroppedCards;
			});

			// const playerCardIDs = [];
			// this.game.step.currentPlayer.deck
			// 	.slice(0, 3)
			// 	.forEach(eachId => playerCardIDs.push(eachId.id));
			// api.throwCards(playerCardIDs).then(() => {
			// 	this.getDroppedCards();
			// });
		},

		getDroppedCards() {
			if (
				this.game &&
				this.gameStatus === "STARTED" &&
				this.stepStatus === "WAITING_VOTE" &&
				this.currentTurnPlayerId !== this.devicePlayerId
			) {
				api
					.getGame()
					.then(res => {
						let cards = res.step.stepCards;
						let cardsArray = [];
						for (let item of cards) {
							cardsArray.push(item.card);
						}
						this.$emit("dropped-cards", cardsArray);
					})
					.then(() => {
						this.$emit("show-vote-modal");
					});
			}
		},

		vote(cardsToVote) {
			api.vote(cardsToVote).then(res => {});
		},

		setGameStatus() {
			if (this.game) {
				this.gameStatus = this.game.status;
			}
		},

		setDeskOrder() {
			if (this.game && this.gameStatus === "STARTED" && this.game.players) {
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

		showThrowCardsModal() {
			if (this.stepStatus === "WAITING_CARD" && this.currentTurnPlayerId === this.devicePlayerId) {
				this.$emit("show-throw-cards-modal");
			}
		},
	},

	watch: {
		game: {
			handler: function() {
				this.setGameStatus();
				this.setDeskOrder();
				this.identifyCurrentTurnPlayerId();
				this.setStepStatus();
			},
			deep: true,
		},
		gameStatus() {
			if (this.game && this.gameStatus === "FINISHED") {
				this.$emit("show-game-ended-modal");
			}
		},
		stepStatus() {
			this.getDroppedCards();
			this.throwDiceDisabled();
			this.showThrowCardsModal();
		},
	},

	async created() {
		await this.$store.dispatch("setGameAction");
		if (this.game && Object.keys(this.game).length) {
			this.initializeGame();
			this.initializeDevicePlayerId();
		}
	},
};
</script>

<style scoped></style>

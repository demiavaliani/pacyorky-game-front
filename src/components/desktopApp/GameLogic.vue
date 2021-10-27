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
	},

	methods: {
		initializeGame() {
			return new Promise(resolve => {
				let interval = setInterval(() => {
					if (!Object.keys(this.game).length) {
						this.$emit("show-step-time-out-modal");
						clearInterval(interval);
					} else {
						this.$store.dispatch("setGameAction").then(() => {
							resolve();
						});
					}
				}, 2000);
			});
		},

		initializeDevicePlayerId() {
			return new Promise(resolve => {
				this.$store.dispatch("setDevicePlayerIdAction").then(() => {
					resolve();
				});
			});
		},

		throwDice() {
			api.throwDice().then(() => {});
		},

		throwCards(cardsToThrow) {
			api.throwCards(cardsToThrow).then(res => {});
		},

		getDroppedCards() {
			if (
				// this.game &&
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
			// if (this.game) {
			this.gameStatus = this.game.status;
			// }
		},

		setDeskOrder() {
			if (
				// this.game &&
				this.gameStatus === "STARTED"
				// this.game.players
			) {
				/*this.deskOrder = this.game.players.filter(
					curPlayer => curPlayer.id == this.devicePlayerId
				)[0].currentDay.deskOrder;*/
			}
			//this.$emit("desk-order", this.deskOrder || 101);
		},

		identifyCurrentTurnPlayerId() {
			if (
				// this.game &&
				this.gameStatus === "STARTED" &&
				this.game.step &&
				this.game.step.currentPlayer.id
			) {
				this.currentTurnPlayerId = this.game.step.currentPlayer.id;
			}
		},

		setStepStatus() {
			if (
				// this.game &&
				this.gameStatus === "STARTED" &&
				this.game.step
			) {
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

	watch: {},

	async created() {
		await this.$store.dispatch("setGameAction");
		await this.initializeGame();
		await this.initializeDevicePlayerId();

		this.$watch(
			"game",
			() => {
				this.setGameStatus();
				this.identifyCurrentTurnPlayerId();
				this.setStepStatus();
			},
			{ deep: true }
		);

		this.$watch("gameStatus", () => {
			if (this.game && this.gameStatus === "FINISHED") {
				this.$emit("show-game-ended-modal");
			}
		});

		this.$watch("stepStatus", () => {
			this.getDroppedCards();
			this.throwDiceDisabled();
			this.showThrowCardsModal();
		});
	},
};
</script>

<style scoped></style>

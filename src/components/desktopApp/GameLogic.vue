<template>
	<div></div>
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
			currentTurnPlayerId: "",
			stepStatus: "",
			interval: "",
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
			return new Promise((resolve) => {
				this.interval = setInterval(() => {
					if (!Object.keys(this.game).length) {
						// this.$emit("show-step-time-out-modal");
						// clearInterval(this.interval);
						this.$store.dispatch("getGamesByIdAction", this.$route.params.id).then(async (response) => {
							if (response.status === "WAITING") {
								this.$emit("game-waiting-player-not-in-game");
							} else if (response.status === "STARTED") {
								this.$emit("game-started-player-not-in-game");
							} else if (response.status === "FINISHED" || response.status === "CANCELLED") {
								this.$emit("game-finished-or-cancelled");
								clearInterval(this.interval);
							}
						});
					} else if (this.gameStatus === "FINISHED" || this.gameStatus === "CANCELLED") {
						this.$emit("game-finished-or-cancelled");
						clearInterval(this.interval);
					} else {
						this.$store.dispatch("setGameAction").then(() => {
							this.$emit("player-in-game");
							resolve();
						});
					}
				}, 2000);
			});
		},

		initializeDevicePlayerId() {
			return new Promise((resolve) => {
				this.$store.dispatch("setDevicePlayerIdAction").then(() => {
					resolve();
				});
			});
		},

		throwDice() {
			api.throwDice().then(() => {});
		},

		startGame() {
			api.startGame().then(() => {});
		},

		throwCards(cardsToThrow) {
			api.throwCards(cardsToThrow).then((res) => {});
		},

		getDroppedCards() {
			if (
				this.gameStatus === "STARTED" &&
				this.stepStatus === "WAITING_VOTE" &&
				this.currentTurnPlayerId !== this.devicePlayerId
			) {
				api.getGame()
					.then((res) => {
						let cards = res.step.stepCards;
						let cardsArray = [];
						for (let item of cards) {
							cardsArray.push(item.card);
						}
						this.$emit("dropped-cards", cardsArray);
					})
					.then(() => {
						this.$emit("can-vote");
					});
			}
		},

		vote(cardsToVote) {
			api.vote(cardsToVote).then((res) => {});
		},

		setGameStatus() {
			this.gameStatus = this.game.status;
		},

		identifyCurrentTurnPlayerId() {
			if (this.gameStatus === "STARTED" && this.game.step && this.game.step.currentPlayer.id) {
				this.currentTurnPlayerId = this.game.step.currentPlayer.id;
			}
		},

		setStepStatus() {
			if (this.gameStatus === "STARTED" && this.game.step) {
				this.stepStatus = this.game.step.status;
			}
		},

		throwDiceDisabled() {
			if (this.stepStatus !== "WAITING_DICE") {
				this.$emit("throw-dice-disabled", true);
			} else if (this.stepStatus === "WAITING_DICE" && this.currentTurnPlayerId === this.devicePlayerId) {
				this.$emit("throw-dice-disabled", false);
			}
		},

		showThrowCardsModal() {
			if (this.stepStatus === "WAITING_CARD" && this.currentTurnPlayerId === this.devicePlayerId) {
				this.$emit("show-throw-cards-modal");
			}
		},

		pickBirthdayCard(card) {
			api.choosePrize(card).then((res) => {});
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
			if (this.game && (this.gameStatus === "FINISHED" || this.gameStatus === "CANCELLED")) {
				this.$emit("show-game-ended-modal");
			}
			if (this.game && this.gameStatus === "WAITING") {
				this.$emit("start-game-btn-disabled", false);
			} else {
				this.$emit("start-game-btn-disabled", true);
			}
		});

		this.$watch("stepStatus", () => {
			this.getDroppedCards();
			this.throwDiceDisabled();
			this.showThrowCardsModal();
		});
	},

	beforeDestroy() {
		clearInterval(this.interval);
	},
};
</script>

<style scoped></style>

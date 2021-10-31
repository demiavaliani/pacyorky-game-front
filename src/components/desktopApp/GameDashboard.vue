<template>
	<b-container
		id="game-dashboard"
		class="d-flex flex-column justify-content-center align-items-center h-75"
	>
		<b-row class="d-flex justify-content-center">
			<b-col cols="auto" class="d-flex flex-column pr-4">
				<div class="middle-gif"></div>

				<b-button
					@click="
						showCreateRoomModal = !showCreateRoomModal;
						triggerCreateRoomModalChildComponent();
					"
					class="game-btns mt-5"
				>
					<p style="color: white" class="mb-0">
						{{ $ml.get("create_new_room") }}
					</p>
				</b-button>
			</b-col>

			<b-col cols="auto" class="d-flex flex-column pl-4">
				<p style="color: #35838d">
					{{ $ml.get("active_games_list") }}
				</p>

				<div
					class="d-flex flex-column justify-content-start flex-grow-1 active-games-list px-3 py-1"
				>
					<div>
						<ActiveRoomsGraph
							v-for="item in getActiveRoomsAndSortByPlayersCountAsc"
							:key="item.id"
							:displayRoomName="true"
							:activePlayersCountFromActiveRoomsGraph="item.playersCount"
							:activeRoomNameFromActiveRoomsGraph="item.name"
							:currentRoomFromActiveRoomsGraph="item"
							:class="currentRoomId == item.id ? 'animate-room-class' : ''"
							@current-room-click="
								currentRoom = $event;
								currentRoomId = $event.id;
								roomSelected = true;
							"
						></ActiveRoomsGraph>
					</div>
				</div>

				<div id="tooltip-trigger" class="mt-5">
					<b-button
						id="join-room"
						@click="showJoinRoomModal = !showJoinRoomModal"
						class="game-btns join"
						style="background-color: white; border: 4px solid #35838d"
						:disabled="roomSelected === false"
					>
						<p class="mb-0">
							{{ $ml.get("join") }}
						</p>
					</b-button>

					<b-tooltip
						target="tooltip-trigger"
						triggers="hover"
						noninteractive
						custom-class="my-tooltip"
						:disabled="disabled"
						>{{ $ml.get("please_add_new_game") }}</b-tooltip
					>
				</div>
			</b-col>
		</b-row>

		<CreateRoomModal
			:isModalShown="showCreateRoomModal"
			@close="showCreateRoomModal = !showCreateRoomModal"
			ref="createRoomModalChildComponent"
			@update-active-rooms-graph="updateActiveRoomsGraph"
		>
		</CreateRoomModal>

		<JoinRoomModal
			:isModalShown="showJoinRoomModal"
			:currentRoom="currentRoom"
			@close="showJoinRoomModal = !showJoinRoomModal"
			@update-active-rooms-graph="updateActiveRoomsGraph"
		>
		</JoinRoomModal>
	</b-container>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/api";
import ActiveRoomsGraph from "./ActiveRoomsGraph";
import CreateRoomModal from "../modals/CreateRoomModal.vue";
import JoinRoomModal from "../modals/JoinRoomModal";

export default {
	name: "GameDashboard",

	components: {
		ActiveRoomsGraph,
		CreateRoomModal,
		JoinRoomModal,
	},

	data() {
		return {
			showCreateRoomModal: false,
			showJoinRoomModal: false,
			currentRoom: {
				players: [],
			},
			currentRoomId: 0,
			roomSelected: false,
			disabled: true,
		};
	},

	computed: {
		...mapState({
			game: "gameState",
			activeRooms: "listOfActiveRooms",
		}),

		getActiveRoomsAndSortByPlayersCountAsc() {
			return this.activeRooms
				.sort((a, b) => {
					var roomA = a.playersCount;
					var roomB = b.playersCount;
					if (roomB < roomA) {
						return -1;
					}
					if (roomB > roomA && roomB < 4) {
						return 1;
					}
					return 0;
				})
				.slice(0, 6);
		},
	},

	methods: {
		triggerCreateRoomModalChildComponent() {
			this.$refs.createRoomModalChildComponent.randomNamePicker();
		},

		updateActiveRoomsGraph() {
			setInterval(() => {
				this.$store.dispatch("setRoomAction");
			}, 1000);
		},

		checkGame() {
			if (this.game) {
				if (this.game.status !== "FINISHED" && this.game.status !== "CANCELLED") {
					this.$router.push({ name: "boardGame", params: { id: this.game.id } });
				}
				if (this.game.status === "FINISHED" || this.game.status === "CANCELLED") {
					api.leaveRoom().then();
				}
			}
		},
	},

	watch: {
		getActiveRoomsAndSortByPlayersCountAsc: {
			immediate: true,
			async handler() {
				if (this.getActiveRoomsAndSortByPlayersCountAsc.length > 0) {
					try {
						this.currentRoomId = await this.getActiveRoomsAndSortByPlayersCountAsc[0].id;
						this.currentRoom = await this.getActiveRoomsAndSortByPlayersCountAsc[0];
						this.roomSelected = true;
						this.disabled = true;
					} catch (error) {
						this.roomSelected = false;
						this.disabled = false;
					}
				}
			},
		},
	},

	async created() {
		this.updateActiveRoomsGraph();
		await this.$store.dispatch("setGameAction");
		await this.$store.dispatch("setDevicePlayerIdAction");
		this.checkGame();
	},
};
</script>

<style scoped>
.my-tooltip {
	opacity: 1 !important;
}

::v-deep .tooltip-inner {
	color: white;
	background-color: #5a6268;
}

::v-deep .arrow::before {
	border-top-color: #5a6268 !important;
}

p {
	font-size: max(0.73vw, 15px);
	font-family: "Montserrat";
	color: black;
}

.game-btns {
	box-sizing: border-box;
	height: max(2.7vw, 42px);
	border-radius: 10px;
	border: 0;
	background-color: #5f9da5;
}

.game-btns.join {
	width: 100%;
}

.validation-def-style {
	font-size: 90%;
	margin-bottom: 0;
	position: absolute;
	top: 355px;
	color: #dc3545;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
		"Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
		"Segoe UI Symbol", "Noto Color Emoji";
}

.active-games-list {
	box-sizing: border-box;
	width: max(17vw, 217.4px);
	border: 1px solid #35838d;
	border-radius: 10px;
}

.middle-gif {
	width: max(24vw, 237px);
	height: max(15vw, 202px);
	border: 1px solid #35838d;
	border-radius: 10px;
}

.animate-room-class {
	border: 1px solid;
	border-color: #5f9da5;
	border-radius: 10px;
	font-weight: 700;
}

@media (min-width: 768px) and (max-width: 991.98px) {
	.middle-gif {
		box-sizing: border-box;
		width: 300px;
		height: 250px;
		border: 1px solid #35838d;
		border-radius: 10px;
	}

	.active-games-list {
		width: 280px;
	}

	.validation-def-style {
		font-size: 75%;
		top: 253px;
	}
}

@media (min-width: 992px) and (max-width: 1199.98px) {
	p {
		font-size: 18px;
		font-family: "Montserrat";
		color: black;
	}

	.game-btns {
		height: 55px;
	}

	.game-btns.join {
		width: 350px;
		align-self: center;
	}

	.middle-gif {
		box-sizing: border-box;
		width: 450px;
		height: 300px;
		border: 1px solid #35838d;
		border-radius: 10px;
	}

	.active-games-list {
		width: 350px;
		align-self: center;
	}

	.validation-def-style {
		font-size: 90%;
		top: 304px;
	}
}

@media (min-device-width: 1440px) and (max-device-width: 1440px) {
	.middle-gif {
		height: 255px;
	}

	.active-games-list {
		width: 260px;
	}

	.validation-def-style {
		font-size: 75%;
		top: 259px;
	}
}

@media (min-device-width: 1536px) and (max-device-width: 1536px) {
	.middle-gif {
		height: 213px;
	}

	.active-games-list {
		width: 260px;
	}

	.validation-def-style {
		font-size: 75%;
		top: 217px;
	}
}
</style>

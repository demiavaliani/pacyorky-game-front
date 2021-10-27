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
						<!--
							"@current-room-click" sets "currentRoomId" to the "$event.id". "$event" is the room object
							passed from "ActiveRoomsGraph". That event is triggered when any of the item is clicked.
							":class" attribute assigns "animate-room-class" CSS class to each "ActiveRoomsGraph" item IF:
							"currentRoomId" from data is same as "item.id" from v-for loop below.
						-->
						<!--
							"@current-room-click" also sets the "currentRoom" from data to the room object from
							"ActiveRoomsGraph". This object is later passed to the "JoinRoom Modal".
						 -->
						<!--
							"@current-room-click" also sets "roomSelected" to true. "roomSelected" value is used by
							"join-room" button. If "roomSelected" is true, meaning the room item was clicked,
							the "join-room" button will be active, otherwise it will be disabled.
						  -->
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
					<!--
						tooltip below will be disabled if "disabled" data attribute is true.
						"disabled" attribute by default is false, in case there are no rooms available.
						If there is a room available, "disabled" attribute is adjusted by
						"getActiveRoomsAndSortByPlayersCountAsc" watcher.
					 -->
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
		/*
		using ref="createRoomModalChildComponent" on "CreateRoomModal" we can call "randomNamePicker()"
		method from parent component to child.
		*/
		triggerCreateRoomModalChildComponent() {
			this.$refs.createRoomModalChildComponent.randomNamePicker();
		},

		updateActiveRoomsGraph() {
			this.$store.dispatch("setRoomAction");
		},
	},

	watch: {
		/*
		"getActiveRoomsAndSortByPlayersCountAsc" watcher selects a default room item before any click.

		First, TRY block is executed, if there is a room available ->
		"currentRoomId" is set to get "animate-room-class" CSS class, giving it selection effect;
		"currentRoom" is set so that the default room object can be passed to "JoinRoomModal";
		"roomSelected" is set to true to enable the "join-room" button;
		"disabled" is set to true to disable the tooltip;

		IF no room is available, CATCH block is executed ->
		"roomSelected is set to false to disable the "join-room" button;
		*/
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
						console.log(error);
					}
				}
			},
		},
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

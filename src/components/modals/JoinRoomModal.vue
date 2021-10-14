<template>
	<b-modal
		centered
		no-close-on-backdrop
		size="lg"
		v-model="isModalShown"
		header-class="justify-content-end pb-0 modal-header"
		footer-class="justify-content-center modal-footer"
	>
		<template #modal-header>
			<b-button @click="onClose" class="removeDefaultButtonStyle">
				<img src="@/assets/game-dashboard/modal-close-x.svg" />
			</b-button>
		</template>

		<b-container fluid>
			<b-row cols="1" class="d-flex align-items-center justify-content-center text-center">
				<b-col class="mb-5">
					<p style="color: #35838D; font-size: 22px;">{{ currentRoom.name }}</p>
				</b-col>

				<b-col class="mb-2">
					<p>{{ $ml.get("players_count_in_room") }}</p>
				</b-col>

				<b-col class="d-flex justify-content-center mb-2">
					<div v-for="item in currentRoom.players.length" style="width: 30px;">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.6 27.2" class="men-img">
							<path
								d="M 4.8,0 C 5.52745,0 6.22511,0.28657 6.73949,0.796669 7.25388,1.30677 7.54286,1.99861 7.54286,2.72 7.54286,3.44139 7.25388,4.13323 6.73949,4.64333 6.22511,5.15343 5.52745,5.44 4.8,5.44 4.07255,5.44 3.37489,5.15343 2.86051,4.64333 2.34612,4.13323 2.05714,3.44139 2.05714,2.72 2.05714,1.99861 2.34612,1.30677 2.86051,0.796669 3.37489,0.28657 4.07255,0 4.8,0 Z M 2.74286,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 9.31102,8.10677 9.6,8.79861 9.6,9.52 V 17 H 7.54286 V 27.2 H 2.05714 V 17 H 0 V 9.52 C 0,8.79861 0.288979,8.10677 0.803365,7.59667 1.31775,7.08657 2.01541,6.8 2.74286,6.8 Z"
								fill="black"
							/>
						</svg>
					</div>
				</b-col>

				<b-col class="mb-4">
					<p>{{ currentRoom.players.length }}</p>
				</b-col>

				<b-col class="mb-2">
					<p>{{ $ml.get("max_time_per_turn") }}</p>
				</b-col>

				<b-col>
					<p>???</p>
				</b-col>
			</b-row>
		</b-container>

		<template #modal-footer="{ ok }">
			<b-button @click="onJoinRoom" class="submitGameCreateBtn mb-5 mt-4">
				<p style="color: white" class="my-0">
					{{ $ml.get("join_room") }}
				</p>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import api from "@/api/api";

export default {
	name: "JoinRoomModal",

	props: {
		isModalShown: false,
		currentRoom: {},
	},

	data() {
		return {};
	},

	methods: {
		onClose() {
			this.$emit("close");
		},

		onJoinRoom() {
			api.joinRoom(this.currentRoom.id).then(response => {
				if (response) {
					this.$emit("update-active-rooms-graph");
					this.$router.push("board-game");
					this.$emit("close");
				}
			});
		},
	},
};
</script>

<style scoped>
p {
	margin-bottom: 0;
	font-size: max(0.73vw, 15px);
	font-family: "Montserrat";
	color: #747474;
}

.removeDefaultButtonStyle {
	border: 0;
	background-color: transparent !important;
	box-shadow: none !important;
}

::v-deep .modal-header {
	border-color: transparent;
}

::v-deep .modal-footer {
	border-color: transparent;
}

.men-img {
	width: 12px;
}

.submitGameCreateBtn {
	width: 345px;
	height: 56px;
	border-radius: 10px;
	border: 0;
	background-color: #5f9da5;
}
</style>

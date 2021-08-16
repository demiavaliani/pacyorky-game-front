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
			<b-button @click="onClose" class="remove-default-button-style">
				<img src="@/assets/game-dashboard/modal-close-x.svg" />
			</b-button>
		</template>

		<b-container fluid>
			<b-row cols="2" class="d-flex align-items-center justify-content-center">
				<b-col cols="8">
					<p>{{ $ml.get("play_with_computer") }}</p>
					<p v-if="playWithComputerState" class="validation-def-style">
						Please select one.
					</p>
				</b-col>
				<b-col cols="2">
					<b-form-radio-group class="d-flex justify-content-around">
						<b-form-radio
							id="tick"
							@change="tickActive = 'tick'"
							v-model="roomForm.withComputer"
							value="true"
							v-bind:class="tickActiveObj"
							name="playwithcomputerselector"
						></b-form-radio>
						<b-form-radio
							id="x"
							@change="tickActive = 'x'"
							v-model="roomForm.withComputer"
							value="false"
							v-bind:class="xActiveObj"
							name="playwithcomputerselector"
						></b-form-radio>
					</b-form-radio-group>
				</b-col>

				<b-col cols="12" class="mb-5"></b-col>

				<b-col cols="8">
					<div class="w-75">
						<p>{{ $ml.get("choose_players_count") }}</p>
						<p v-if="roomCapacityState" class="validation-def-style">
							Please choose the room capacity.
						</p>
					</div>
				</b-col>
				<b-col cols="2" class="d-flex justify-content-around align-items-center">
					<b-row class="d-flex justify-content-center pt-2">
						<b-col cols="2" class="px-0 d-flex justify-content-center">
							<b-button @click="capacityDecrease" class="remove-default-button-style">
								<img src="@/assets/game-dashboard/component-minus.svg" />
							</b-button>
						</b-col>
						<b-col cols="3" class="px-0 d-flex justify-content-center">
							<div class="d-flex align-items-center men-img">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.6 27.2" width="100%">
									<path
										d="M 4.8,0 C 5.52745,0 6.22511,0.28657 6.73949,0.796669 7.25388,1.30677 7.54286,1.99861 7.54286,2.72 7.54286,3.44139 7.25388,4.13323 6.73949,4.64333 6.22511,5.15343 5.52745,5.44 4.8,5.44 4.07255,5.44 3.37489,5.15343 2.86051,4.64333 2.34612,4.13323 2.05714,3.44139 2.05714,2.72 2.05714,1.99861 2.34612,1.30677 2.86051,0.796669 3.37489,0.28657 4.07255,0 4.8,0 Z M 2.74286,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 9.31102,8.10677 9.6,8.79861 9.6,9.52 V 17 H 7.54286 V 27.2 H 2.05714 V 17 H 0 V 9.52 C 0,8.79861 0.288979,8.10677 0.803365,7.59667 1.31775,7.08657 2.01541,6.8 2.74286,6.8 Z"
										fill="black"
									/>
								</svg>
							</div>
						</b-col>
						<b-col cols="2" class="px-0 d-flex justify-content-center">
							<b-button @click="capacityIncrease" class="remove-default-button-style ">
								<img src="@/assets/game-dashboard/component-plus.svg" />
							</b-button>
						</b-col>
						<b-col cols="12">
							<p class="pt-1" style="text-align: center;">
								{{ roomForm.capacity }}
							</p>
						</b-col>
					</b-row>
				</b-col>

				<b-col cols="12" class="mb-3 mt-4"></b-col>

				<b-col cols="8">
					<div class="w-75">
						<p>{{ $ml.get("choose_max_time_per_turn") }}</p>
					</div>
				</b-col>
				<b-col cols="2" class="d-flex justify-content-around align-items-center">
					<b-button class="remove-default-button-style">
						<img src="@/assets/game-dashboard/component-minus.svg" />
					</b-button>
					<div>
						{{ maxTimePerTurn }}
					</div>
					<b-button class="remove-default-button-style">
						<img src="@/assets/game-dashboard/component-plus.svg" />
					</b-button>
				</b-col>

				<b-col cols="12" class="mb-5"></b-col>

				<b-col cols="7">
					<b-form-input
						v-model="roomForm.name"
						:state="roomNameState"
						:placeholder="$ml.get('room_name')"
						size="lg"
					></b-form-input>
					<b-form-invalid-feedback>
						Name must be 3-11 characters long.
					</b-form-invalid-feedback>
					<b-form-valid-feedback>
						Looks Good.
					</b-form-valid-feedback>
				</b-col>
			</b-row>
		</b-container>

		<template #modal-footer="{ ok }">
			<b-button
				:disabled="fullFormValidity == false"
				@click="onCreateRoom"
				class="submit-game-create-btn mb-5 mt-4"
			>
				<p style="color: white" class="my-0">
					{{ $ml.get("create_new_room") }}
				</p>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import api from "@/api/api";

export default {
	name: "CreateRoomModal",

	props: {
		isModalShown: false,
	},

	data() {
		return {
			maxTimePerTurn: 0,

			roomForm: {
				capacity: 0,
				withComputer: null,
				privateRoom: true,
				password: "",
				name: "",
			},

			tickActive: undefined,
		};
	},

	computed: {
		tickActiveObj() {
			return {
				"tick-active": this.tickActive === "tick",
			};
		},

		xActiveObj() {
			return {
				"x-active": this.tickActive === "x",
			};
		},

		roomNameState() {
			return this.roomForm.name.length > 2 && this.roomForm.name.length <= 11;
		},

		roomCapacityState() {
			return this.roomForm.capacity < 1;
		},

		playWithComputerState() {
			return this.roomForm.withComputer === null ? true : false;
		},

		fullFormValidity() {
			if (
				this.roomNameState == false ||
				this.roomCapacityState == true ||
				this.playWithComputerState == true
			) {
				return false;
			} else return true;
		},
	},

	methods: {
		onClose() {
			this.$emit("close");
		},

		onCreateRoom() {
			if (this.roomForm.name) {
				api.createRoom(this.roomForm).then((response) => {
					if (response) {
						this.$emit("update-active-rooms-graph");
						this.$emit("close");
					}
				});
			}
		},

		capacityIncrease() {
			if (this.roomForm.capacity < 8) {
				this.roomForm.capacity++;
			}
		},

		capacityDecrease() {
			if (this.roomForm.capacity > 0) {
				this.roomForm.capacity--;
			}
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

.remove-default-button-style {
	border: 0;
	background-color: transparent !important;
	box-shadow: none !important;
}

.validation-def-style {
	color: #dc3545;
	font-size: 80%;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
		"Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
		"Segoe UI Symbol", "Noto Color Emoji";
}

.men-img {
	width: 12px;
}

::v-deep .modal-header {
	border-color: transparent;
}

::v-deep .modal-footer {
	border-color: transparent;
}

::v-deep .custom-control {
	padding-left: 0;
	margin-right: 0;
}

::v-deep .custom-control-label {
	width: 32px;
	height: 32px;
}

::v-deep .custom-control-label::before {
	top: 0;
	left: 0;
	width: 32px;
	height: 32px;
	border: 0;
	box-shadow: none;
}

::v-deep .custom-control-label::after {
	top: 0;
	left: 0;
	width: 32px;
	height: 32px;
	background-image: none !important;
}

::v-deep #tick ~ .custom-control-label::before {
	background: url("../../assets/game-dashboard/component-tick.svg") no-repeat;
}

::v-deep #x ~ .custom-control-label::before {
	background: url("../../assets/game-dashboard/component-x.svg") no-repeat;
}

.tick-active {
	content: url("../../assets/game-dashboard/component-tick-active.svg");
}

.x-active {
	content: url("../../assets/game-dashboard/component-x-active.svg");
}

.submit-game-create-btn {
	width: 345px;
	height: 56px;
	border-radius: 10px;
	border: 0;
	background-color: #5f9da5;
}
</style>

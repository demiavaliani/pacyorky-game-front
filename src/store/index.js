import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api"
import roomModule from "./modules/roomModule"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		roomModule
	},

	state: {
		modalStatus: false,
		errorCode: "",
		listOfActiveRooms: [],
		gameState: {},
		devicePlayerId: "",

	},

	getters: {
	},

	actions: {
		getGamesByIdAction() {
			api.getGamesById().then(response => {
			})
		},

		setModalStatusAction(context, status) {
			context.commit("setModalStatusMutation", status);
		},

		setErrorCodeAction(context, errorCode) {
			context.commit("setErrorCodeMutation", errorCode);
		},

		setRoomAction(context) {
			api.getRooms().then(response => {
				context.commit("setRoomMutation", response)
			})
		},

		setGameAction(context) {
			return api.getGame().then(response => {
				context.commit("setGameMutation", response)
				return response
			})
		},

		setDevicePlayerIdAction(context) {
			api.getDevicePlayerId().then(response => {
				context.commit("setDevicePlayerIdMutation", response)
			})
		}
	},

	mutations: {
		setModalStatusMutation(state, status) {
			state.modalStatus = status;
		},

		setErrorCodeMutation(state, errorCode) {
			state.errorCode = errorCode;
		},

		setRoomMutation(state, room) {
			state.listOfActiveRooms = room;
		},

		setGameMutation(state, game) {
			state.gameState = game;
		},

		setDevicePlayerIdMutation(state, id) {
			state.devicePlayerId = id;
		}
	},
})

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
    },

    getters: {
        modalStatusGetter(state) {
            return state.modalStatus;
        },

        errorCodeGetter(state) {
            return state.errorCode;
        },

        listOfActiveRoomsGetter(state) {
            return state.listOfActiveRooms;
        }
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

        setRoomAction(context, room) {
            api.getRooms().then(response => {
                context.commit("setRoomMutation", response)
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
        }
    },
})

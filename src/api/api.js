import axios from "axios"

export default {

	async getRooms() {
		try {
			return await axios.get("api/rooms/get");
		} catch (error) { }
	},

	async getGamesById(id) {
		try {
			return await axios.get(`api/rooms/get/${id}`);
		} catch (error) { }
	},

	async createRoom(roomObj) {
		try {
			return await axios.post("api/rooms/add", roomObj);
		} catch (error) { }
	},

	async joinRoom(id) {
		try {
			return await axios.post(`api/rooms/join/${id}`);
		} catch (error) { }
	},

	async getDevicePlayerId(res) {
		try {
			return await axios.get("api/player/id");
		} catch (error) { }
	},

	async getGame() {
		try {
			return await axios.get("api/game");
		} catch (error) { }
	},

	async throwDice() {
		try {
			return await axios.post("api/game/throw");
		} catch (error) { }
	},

	async throwCards(droppedCards) {
		try {
			return await axios.post("api/game/step", droppedCards);
		} catch (error) { }
	},

	async vote(voteInt) {
		try {
			return await axios.post("api/game/vote", voteInt);
		} catch (error) { }
	},

	async leaveRoom() {
		try {
			return await axios.delete("api/rooms/left");
		} catch (error) { }
	}

}

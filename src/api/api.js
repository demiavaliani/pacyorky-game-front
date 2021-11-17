import axios from "axios"

export default {

	async getRooms() {
		try {
			return await axios.get("/api/v2/rooms/get");
		} catch (error) { }
	},

	async getGamesById(id) {
		try {
			return await axios.get(`/api/v1/rooms/get/${id}`);
		} catch (error) {
		}
	},

	async createRoom(roomObj) {
		try {
			return await axios.post("/api/v1/rooms/add", roomObj);
		} catch (error) { }
	},

	async joinRoom(id) {
		try {
			return await axios.post(`/api/v1/rooms/join/${id}`);
		} catch (error) { }
	},

	async getDevicePlayerId(res) {
		try {
			return await axios.get("/api/v1/player/id");
		} catch (error) { }
	},

	async getGame(id) {
		try {
			return await axios.get(`/api/v1/game`);
		} catch (error) { }
	},

	async throwDice() {
		try {
			return await axios.post("/api/v1/game/throw");
		} catch (error) { }
	},

	async startGame() {
		try {
			return await axios.post("/api/v1/game/start");
		} catch (error) { }
	},

	async throwCards(droppedCards) {
		try {
			return await axios.post("/api/v1/game/step", droppedCards);
		} catch (error) { }
	},

	async vote(voteInt) {
		try {
			return await axios.post("/api/v1/game/vote", voteInt);
		} catch (error) { }
	},

	async leaveRoom() {
		try {
			return await axios.delete("/api/v1/rooms/left");
		} catch (error) { }
	},

    async attachAgoraId(uid) {
        try {
            return await axios.get("/api/v1/moderate/agoraId?agoraId="+uid);
        } catch (error) { }
    }

}

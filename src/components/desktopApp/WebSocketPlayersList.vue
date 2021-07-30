<template>
	<div id="main-content" class="container">
		<label for="connect">WebSocket connection:</label>
		<button
			id="connect"
			class="btn btn-default"
			type="submit"
			:disabled="connected == true"
			@click="connect"
		>
			Connect
		</button>
	</div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

export default {
	name: "websocketdemo",
	data() {
		return {
			received_messages: [],
			send_message: null,
			connected: false,
			stompClient: null,
		};
	},
	methods: {
		//baeldung
		// connect() {
		// 	var socket = new SockJS("/api/connect");
		// 	this.stompClient = Stomp.over(socket);
		// 	this.stompClient.connect({}, function(frame) {
		// 		console.log("Connected: " + frame);
		// 		this.stompClient.subscribe("/topic/games", function(messageOutput) {
		// 			showMessageOutput(JSON.parse(messageOutput.body));
		// 		});
		// 	});
		// },

		//kojotdev
		connect() {
			var socket = new SockJS("/api/connect");
			this.stompClient = Stomp.over(socket);
			this.stompClient.connect(
				{},
				(frame) => {
					console.log(frame);
				},
				(error) => {
					console.log(error);
				}
			);
		},

		// connect() {
		// 	this.socket = new SockJS("/api/connect");
		// 	this.stompClient = Stomp.over(this.socket);
		// 	this.stompClient.connect(
		// 		{},
		// 		(frame) => {
		// 			this.connected = true;
		// 			console.log(frame);
		// 			this.stompClient.subscribe("/topic/games", (tick) => {
		// 				console.log(tick);
		// 				this.received_messages.push(JSON.parse(tick.body).content);
		// 			});
		// 		},
		// 		(error) => {
		// 			console.log(error);
		// 			this.connected = false;
		// 		}
		// 	);
		// },
	},
	mounted() {
		// this.connect();
	},
};
</script>
<style scoped=""></style>

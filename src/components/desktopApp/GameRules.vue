<template>
	<b-container class="container d-flex flex-column align-items-center">
		<div class="rules mt-md-5 mb-md-5 mt-xl-3 mb-xl-4">
			<img src="@/assets/navbar/game-rules/game-rules-bird.png" />
			<p>
        {{$ml.get("game_rules_text")}}
      </p>
		</div>

		<b-button
			class="w-md-25 back-to-home-btn d-flex justify-content-center align-items-center"
			to="/"
		>
			<p class="mb-0">
				{{ $ml.get("go_to_home_page") }}
			</p>
		</b-button>
	</b-container>
</template>

<script>
export default {
	name: "GameRules",

	components: {},

	data() {
		return {};
	},

	computed: {},

	methods: {},
};
</script>

<style scoped>
.container {
	width: 57vw;
}

p {
	font-family: "Montserrat";
}

img {
	width: 15vw;
	float: left;
}

.rules {
	height: 57vh;
	overflow-y: auto;
}

.back-to-home-btn {
	width: max(200px, 15vw);
	height: 6vh;
	border: 0;
	border-radius: 10px;
	background-color: #5f9da5;
}

@media (min-device-width: 1537px) {
	.rules {
		height: 45vh;
		margin-top: 100px !important;
		margin-bottom: 60px !important;
	}
}
</style>

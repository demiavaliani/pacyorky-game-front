<template>
	<div id="main-div">
		<div>
			<img src="@/assets/board-game/board-game-noframe.svg" usemap="#image-map" />

			<map name="image-map">
				<area @click="numClick('14')" alt="14" href="#" coords="88,232,24" shape="circle" />
				<area @click="numClick('13')" alt="13" href="#" coords="128,508,24" shape="circle" />
				<area @click="numClick('15')" alt="15" href="#" coords="235,74,24" shape="circle" />
			</map>
		</div>

		<div class="menu-card">
			<!-- <img src="@/assets/cards/character/baba_docka.png" /> -->
		</div>
	</div>
</template>

<script>
import ImageMap from "image-map";

export default {
	name: "BoardGame",

	data() {
		return {};
	},

	methods: {
		numClick(number) {
			console.log(`Number ${number} clicked!`);
		},
	},

	mounted() {
		ImageMap("img[usemap]");
	},

	beforeUpdate() {
		ImageMap("img[usemap]");
	},
};
</script>

<style scoped>
#main-div {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
}

.menu-card {
	width: 300px;
	height: 400px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07),
		0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275),
		0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725),
		0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

img {
	width: 50vw;
}
</style>

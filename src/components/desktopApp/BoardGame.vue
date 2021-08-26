<template>
	<div id="main-div">
		<img src="@/assets/board-game/board-game-noframe.svg" usemap="#image-map" />

		<map name="image-map">
			<area @click="numClick('14')" alt="14" href="#" coords="88,232,24" shape="circle" />
			<area @click="numClick('13')" alt="13" href="#" coords="128,508,24" shape="circle" />
			<area @click="numClick('15')" alt="15" href="#" coords="235,74,24" shape="circle" />
		</map>
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
};
</script>

<style scoped>
img {
	display: block;
	margin: auto;
}
</style>

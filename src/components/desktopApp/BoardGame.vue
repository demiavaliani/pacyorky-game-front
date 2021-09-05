<template>
	<div id="main-div">
		<b-row class="board-game-row mt-3">
			<b-col>
				<div>
					<img
						src="@/assets/board-game/board-game-noframe.svg"
						class="board-game-img"
						usemap="#image-map"
					/>

					<map name="image-map">
						<area @click="numClick('14')" alt="14" href="#" coords="88,232,24" shape="circle" />
						<area @click="numClick('13')" alt="13" href="#" coords="128,508,24" shape="circle" />
						<area @click="numClick('15')" alt="15" href="#" coords="235,74,24" shape="circle" />
					</map>
				</div>
			</b-col>
		</b-row>

		<b-row class="menu-card-row mt-4">
			<b-col>
				<!-- Bottom menu card -->
				<div class="menu-card">
					<b-row class="container">
						<!-- Left wing -->
						<b-col md="auto" class="text-center pl-0">
							<img src="@/assets/cards/character/baba_docka.png" class="character-card-img" />
						</b-col>
						<!-- Right wing -->
						<b-col>
							<b-row class="right-wing-row justify-content-center">
								<!-- Card with zheton points -->
								<b-col md="auto" class="d-flex flex-column justify-content-between">
									<div class="zheton-card">
										<b-row class="justify-content-center align-items-center">
											<b-col>
												<div style="line-height: 0 !important;">
													<img src="@/assets/board-game/zheton.png" class="zheton-img" />
												</div>
											</b-col>
											<b-col>
												<p>0</p>
											</b-col>
										</b-row>
									</div>
									<div>
										<svg
											class="men-img"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 149.60001 27.200001"
											width="120.60001"
											height="autp"
										>
											<path
												d="M 4.8,0 C 5.52745,0 6.22511,0.28657 6.73949,0.796669 7.25388,1.30677 7.54286,1.99861 7.54286,2.72 7.54286,3.44139 7.25388,4.13323 6.73949,4.64333 6.22511,5.15343 5.52745,5.44 4.8,5.44 4.07255,5.44 3.37489,5.15343 2.86051,4.64333 2.34612,4.13323 2.05714,3.44139 2.05714,2.72 2.05714,1.99861 2.34612,1.30677 2.86051,0.796669 3.37489,0.28657 4.07255,0 4.8,0 Z M 2.74286,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 9.31102,8.10677 9.6,8.79861 9.6,9.52 V 17 H 7.54286 V 27.2 H 2.05714 V 17 H 0 V 9.52 C 0,8.79861 0.288979,8.10677 0.803365,7.59667 1.31775,7.08657 2.01541,6.8 2.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(1),
												}"
											/>
											<path
												d="m 24.8,0 c 0.72745,0 1.42511,0.28657 1.93949,0.796669 0.51439,0.510101 0.80337,1.201941 0.80337,1.923331 0,0.72139 -0.28898,1.41323 -0.80337,1.92333 C 26.22511,5.15343 25.52745,5.44 24.8,5.44 24.07255,5.44 23.37489,5.15343 22.86051,4.64333 22.34612,4.13323 22.05714,3.44139 22.05714,2.72 c 0,-0.72139 0.28898,-1.41323 0.80337,-1.923331 C 23.37489,0.28657 24.07255,0 24.8,0 Z m -2.05714,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 29.31102,8.10677 29.6,8.79861 29.6,9.52 V 17 H 27.54286 V 27.2 H 22.05714 V 17 H 20 V 9.52 C 20,8.79861 20.288979,8.10677 20.803365,7.59667 21.31775,7.08657 22.01541,6.8 22.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(2),
												}"
											/>
											<path
												d="m 44.8,0 c 0.72745,0 1.42511,0.28657 1.93949,0.796669 0.51439,0.510101 0.80337,1.201941 0.80337,1.923331 0,0.72139 -0.28898,1.41323 -0.80337,1.92333 C 46.22511,5.15343 45.52745,5.44 44.8,5.44 44.07255,5.44 43.37489,5.15343 42.86051,4.64333 42.34612,4.13323 42.05714,3.44139 42.05714,2.72 c 0,-0.72139 0.28898,-1.41323 0.80337,-1.923331 C 43.37489,0.28657 44.07255,0 44.8,0 Z m -2.05714,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 49.31102,8.10677 49.6,8.79861 49.6,9.52 V 17 H 47.54286 V 27.2 H 42.05714 V 17 H 40 V 9.52 C 40,8.79861 40.288979,8.10677 40.803365,7.59667 41.31775,7.08657 42.01541,6.8 42.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(3),
												}"
											/>
											<path
												d="m 64.8,0 c 0.72745,0 1.42511,0.28657 1.93949,0.796669 0.51439,0.510101 0.80337,1.201941 0.80337,1.923331 0,0.72139 -0.28898,1.41323 -0.80337,1.92333 C 66.22511,5.15343 65.52745,5.44 64.8,5.44 64.07255,5.44 63.37489,5.15343 62.86051,4.64333 62.34612,4.13323 62.05714,3.44139 62.05714,2.72 c 0,-0.72139 0.28898,-1.41323 0.80337,-1.923331 C 63.37489,0.28657 64.07255,0 64.8,0 Z m -2.05714,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 69.31102,8.10677 69.6,8.79861 69.6,9.52 V 17 H 67.54286 V 27.2 H 62.05714 V 17 H 60 V 9.52 C 60,8.79861 60.288979,8.10677 60.803365,7.59667 61.31775,7.08657 62.01541,6.8 62.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(4),
												}"
											/>
											<path
												d="m 84.8,0 c 0.72745,0 1.42511,0.28657 1.93949,0.796669 0.51439,0.510101 0.80337,1.201941 0.80337,1.923331 0,0.72139 -0.28898,1.41323 -0.80337,1.92333 C 86.22511,5.15343 85.52745,5.44 84.8,5.44 84.07255,5.44 83.37489,5.15343 82.86051,4.64333 82.34612,4.13323 82.05714,3.44139 82.05714,2.72 c 0,-0.72139 0.28898,-1.41323 0.80337,-1.923331 C 83.37489,0.28657 84.07255,0 84.8,0 Z m -2.05714,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 89.31102,8.10677 89.6,8.79861 89.6,9.52 V 17 H 87.54286 V 27.2 H 82.05714 V 17 H 80 V 9.52 C 80,8.79861 80.288979,8.10677 80.803365,7.59667 81.31775,7.08657 82.01541,6.8 82.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(5),
												}"
											/>
											<path
												d="m 104.8,0 c 0.72745,0 1.42511,0.28657 1.93949,0.796669 0.51439,0.510101 0.80337,1.201941 0.80337,1.923331 0,0.72139 -0.28898,1.41323 -0.80337,1.92333 C 106.22511,5.15343 105.52745,5.44 104.8,5.44 c -0.72745,0 -1.42511,-0.28657 -1.93949,-0.79667 -0.51439,-0.5101 -0.80337,-1.20194 -0.80337,-1.92333 0,-0.72139 0.28898,-1.41323 0.80337,-1.923331 C 103.37489,0.28657 104.07255,0 104.8,0 Z m -2.05714,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 109.31102,8.10677 109.6,8.79861 109.6,9.52 V 17 h -2.05714 v 10.2 h -5.48572 V 17 H 100 V 9.52 c 0,-0.72139 0.28898,-1.41323 0.80337,-1.92333 C 101.31775,7.08657 102.01541,6.8 102.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(6),
												}"
											/>
											<path
												d="m 124.8,0 c 0.72745,0 1.42511,0.28657 1.93949,0.796669 0.51439,0.510101 0.80337,1.201941 0.80337,1.923331 0,0.72139 -0.28898,1.41323 -0.80337,1.92333 C 126.22511,5.15343 125.52745,5.44 124.8,5.44 c -0.72745,0 -1.42511,-0.28657 -1.93949,-0.79667 -0.51439,-0.5101 -0.80337,-1.20194 -0.80337,-1.92333 0,-0.72139 0.28898,-1.41323 0.80337,-1.923331 C 123.37489,0.28657 124.07255,0 124.8,0 Z m -2.05714,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 129.31102,8.10677 129.6,8.79861 129.6,9.52 V 17 h -2.05714 v 10.2 h -5.48572 V 17 H 120 V 9.52 c 0,-0.72139 0.28898,-1.41323 0.80337,-1.92333 C 121.31775,7.08657 122.01541,6.8 122.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(7),
												}"
											/>
											<path
												d="m 144.8,0 c 0.72745,0 1.42511,0.28657 1.93949,0.796669 0.51439,0.510101 0.80337,1.201941 0.80337,1.923331 0,0.72139 -0.28898,1.41323 -0.80337,1.92333 C 146.22511,5.15343 145.52745,5.44 144.8,5.44 c -0.72745,0 -1.42511,-0.28657 -1.93949,-0.79667 -0.51439,-0.5101 -0.80337,-1.20194 -0.80337,-1.92333 0,-0.72139 0.28898,-1.41323 0.80337,-1.923331 C 143.37489,0.28657 144.07255,0 144.8,0 Z m -2.05714,6.8 h 4.11428 c 0.72745,0 1.42511,0.28657 1.9395,0.79667 C 149.31102,8.10677 149.6,8.79861 149.6,9.52 V 17 h -2.05714 v 10.2 h -5.48572 V 17 H 140 V 9.52 c 0,-0.72139 0.28898,-1.41323 0.80337,-1.92333 C 141.31775,7.08657 142.01541,6.8 142.74286,6.8 Z"
												v-bind:class="{
													'player-active': fillMan(8),
												}"
											/>
										</svg>
									</div>
								</b-col>
								<!-- Dice column -->
								<b-col md="auto" class="text-center">
									<div class="text-center dice-div">
										<img src="@/assets/board-game/dice.svg" class="dice-img" />
									</div>
									<b-button class="dice-text-btn">
										<p>{{ $ml.get("roll_the_dice") }}</p>
									</b-button>
								</b-col>
								<!-- Info sign -->
								<b-col md="auto" class="info-sign-col pr-0">
									<b-button class="info-sign-btn pt-0 pr-0">
										<img src="@/assets/board-game/info-sign.svg" class="info-sign-img" />
									</b-button>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
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

		fillMan(position) {
			return this.activePlayersCountFromActiveRoomsGraph >= position;
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
* {
	box-sizing: content-box;
}
#main-div {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.right-wing-row {
	justify-content: flex-end !important;
}

p {
	font-family: Amatic_SC;
	font-size: 18px;
	margin-bottom: 0;
	text-align: center;
}

.menu-card p {
	font-size: 18px;
	white-space: nowrap;
	color: black;
}

.dice-text-btn p {
	font-size: 15px;
}

.men-img {
	fill: #c4c4c4;
}

.player-active {
	fill: black;
}

.board-game-img {
	width: 56vw;
}

.menu-card {
	padding: 10px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07),
		0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275),
		0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725),
		0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

.character-card-img {
	width: 5vw;
	border-radius: 20px;
}

.zheton-card {
	width: 6vw;
	height: 7vh;
	border: 2px solid #f0f1f1;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

.zheton-img {
	width: 1.6vw;
}

.dice-div {
	margin-bottom: 12px;
}

.dice-img {
	width: 3vw;
}

.dice-text-btn {
	padding: 5px 10px 5px;
	border: 1px solid #5f9da5;
	border-radius: 15px;
	background-color: white;
}

.dice-text-btn:active {
	background-color: white !important;
}

.info-sign-col {
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
}

.info-sign-btn {
	border: 0;
	background-color: transparent;
}

.info-sign-btn:hover {
	border: 0;
	background-color: transparent;
}

.info-sign-btn:active {
	border: 0 !important;
	background-color: white !important;
}

.info-sign-btn:focus {
	outline: none !important;
	box-shadow: none !important;
	background-color: white;
}

.info-sign-img {
	width: 30px;
}

@media (min-width: 768px) and (max-width: 991.98px) {
	.board-game-row {
		margin-top: 30px !important;
	}

	.menu-card-row {
		margin-top: 100px !important;
	}

	.menu-card p {
		font-size: 25px;
	}

	.dice-text-btn p {
		font-size: 23px;
	}

	.board-game-img {
		width: 90vw;
	}

	.character-card-img {
		width: 11vw;
	}

	.zheton-card {
		width: 11vw;
		height: 4.5vh;
	}

	.zheton-img {
		width: 4.5vw;
	}

	.dice-img {
		width: 6vw;
	}

	.dice-text-btn {
		padding: 2px 8px 2px;
	}
}
@media (min-width: 992px) and (max-width: 1199.98px) {
}
@media (min-device-width: 1400px) and (max-device-width: 1440px) {
}
@media (min-device-width: 1536px) and (max-device-width: 1536px) {
	/* #main-div {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}

.menu-card {
	padding: 5px;
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
	width: 55vw;
}

.menu-card img {
	width: 7vw;
	border-radius: 20px;
} */
}
</style>

<template>
	<b-container class="container d-flex flex-column align-items-center">
		<div class="rules mt-3 mb-4">
			<img src="@/assets/navbar/game-rules/game-rules-bird.png" />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis arcu etiam duis amet
				lectus. Turpis enim, egestas tortor pulvinar tellus metus, cursus arcu. Facilisis id viverra
				lorem viverra in. Id eu molestie aliquet non euismod nec. Pellentesque nisl sem tellus
				phasellus aliquet vulputate at. Cras aliquam sed ullamcorper lectus arcu, tempus, vel leo.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit sit feugiat malesuada congue
				ornare eu in. Ullamcorper in nec varius sem venenatis. Sit neque nullam imperdiet amet
				mauris eu sed. Arcu ultricies ipsum, iaculis lacus nisi, fringilla semper. Gravida molestie
				nec, lectus adipiscing purus nunc porta orci, quam. Fermentum nulla sed in libero urna.
				Nulla nullam aliquam felis, in in aliquet. Pretium, neque diam blandit suspendisse id
				aliquam scelerisque. Arcu tortor, odio venenatis lobortis a sit.
			</p>
			<p>
				Neque in vitae viverra integer est varius. Iaculis fermentum nisl, potenti venenatis.
				Sollicitudin scelerisque pulvinar scelerisque tortor habitasse tellus. Integer eu bibendum
				pharetra orci eget. Dui turpis tincidunt ultricies ornare pulvinar neque pellentesque nunc.
				Luctus porta mi et integer scelerisque. Tellus tellus enim nam semper varius sed. Commodo
				pellentesque quis id posuere et senectus in. Eros consectetur lorem egestas in donec leo.
				Sed mi vel tellus tellus congue. Accumsan gravida augue velit enim aenean id amet amet
				iaculis. Sapien velit dolor, adipiscing vulputate laoreet libero, purus etiam porta. Sed
				aliquam ut aliquam consequat mi nisi, tortor, felis quis. Et quis eu accumsan, eu ut id eu
				viverra. Nunc hendrerit gravida orci augue turpis nullam.
			</p>
			<p>
				Nulla imperdiet dignissim sed eu. Habitasse amet diam sit dictum vel enim. A mollis euismod
				nulla ac amet, ultricies sed orci, viverra. Fringilla enim lectus a donec interdum molestie.
				Imperdiet odio vitae mus nibh amet proin erat integer amet. Ac a molestie sit purus ut
				vulputate duis dictum.
			</p>
			<p>Odio aliquam, et mauris nullam pharetra cum. Lorem in diam elit aenean nulla eu.</p>
		</div>

		<b-button class="w-25" to="/"> {{ $ml.get("go_to_home_page") }} </b-button>
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

img {
	width: 15vw;
	float: left;
}

.rules {
	height: 57vh;
	overflow-y: scroll;
}
</style>

<template>
	<div id="nav-bar">
		<b-container>
			<b-navbar toggleable="md">
				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav class="w-100 d-flex justify-content-center align-items-center">
						<b-row class="w-100 justify-content-center">
							<b-col cols="auto">
								<b-nav-item>
									<b-link to="/">
										<p>{{ $ml.get("home") }}</p>
									</b-link>
								</b-nav-item>
							</b-col>

							<b-col cols="auto">
								<b-nav-item>
									<b-link to="/game-description">
										<p>{{ $ml.get("game_description") }}</p>
									</b-link>
								</b-nav-item>
							</b-col>

							<b-col cols="auto">
								<b-nav-item>
									<b-link to="/game-rules">
										<p>{{ $ml.get("game_rules") }}</p>
									</b-link>
								</b-nav-item>
							</b-col>

							<b-col cols="auto">
								<b-nav-item target="_blank" href="https://pacyorky.ee/#game">
										<p>{{ $ml.get("board_game") }}</p>
								</b-nav-item>
							</b-col>

							<b-col cols="auto">
								<div class="d-flex">
                  <b-dropdown :text="$ml.current">
                    <b-dropdown-item v-for="lang in $ml.list" v-if="lang!==$ml.current" :key="lang" @click="$ml.change(lang)">
                      {{lang}}
                    </b-dropdown-item>
                  </b-dropdown>
								</div>
							</b-col>
						</b-row>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</b-container>
	</div>
</template>

<script>
export default {
	name: "NavBar",
};
</script>

<style scoped>
#navbar {
	background-color: #ffffff;
}

[class^="col"] {
	display: flex;
	justify-content: center;
}

p {
	margin-bottom: 0;
	font-family: "Montserrat";
	font-size: max(13px, 0.73vw);
	text-transform: uppercase;
	color: black;
}

::v-deep .btn.dropdown-toggle {
	border: 0;
	font-size: max(13px, 0.73vw);
	background-color: transparent !important;
	font-family: "Montserrat";
	color: black !important;
}
</style>

<template>
	<div id="main-div">
		<div id="snow" style="position: absolute; width: 100vw; height: 100vh"></div>

		<div id="overlay">
			<progress value="0"></progress>
		</div>

		<div
			v-for="player in playersInGame"
			:key="player.id"
			v-if="game && game.players && game.status === 'STARTED'"
			:id="'player-character-' + player.character.name"
			class="player-character"
			:style="inited ? '' : 'opacity: 0'"
			style="pointer-events: none"
		>
			<img
				:src="require('@/assets/cards/moving_characters/' + player.character.name + '.png')"
				style="pointer-events: none"
			/>
		</div>

		<GameLogic
			ref="gameLogic"
			@start-game-btn-disabled="startGameBtnDisabled = $event"
			@throw-dice-disabled="diceBtnDisabled = $event"
			@show-throw-cards-modal="showThrowCardsModalBtnDisabledTemporary = false"
			@dropped-cards="populateVoteCardDecks($event)"
			@can-vote="canVote = true"
			@show-game-ended-modal="gameEndedModalVisible = true"
			@show-step-time-out-modal="stepTimeOutModalVisible = true"
			@game-waiting-player-not-in-game="gameState = 'game-not-started'"
			@game-started-player-not-in-game="gameState = 'spectator'"
			@game-finished-or-cancelled="gameState = 'game-finished-cancelled'"
			@player-in-game="gameState = 'default'"
			class="game-logic"
		>
		</GameLogic>

		<b-container fluid class="h-100">
			<b-row class="justify-content-between h-100">
				<b-col cols="2" class="d-flex justify-content-start align-content-between py-3 left-side h-100 ">
					<b-row cols="1" class="align-content-between">
						<b-col>
							<b-button to="/game-dashboard" v-if="gameState === 'game-not-started'">
								<p>
									{{ $ml.get("go_to_home_page") }}
								</p>
							</b-button>
						</b-col>

						<b-col>
							<RTCClient
								v-if="
									game &&
										currentDevicePlayer &&
										currentDevicePlayer.voiceToken &&
										currentDevicePlayer.voiceToken !== ''
								"
								:token="currentDevicePlayer.voiceToken"
								:channel="String(game.id)"
								:uid="currentDevicePlayer.id"
						/></b-col>

						<b-col>
							<div class="game-controls-box" style="min-height: 300px">
								<b-row class="d-flex flex-column justify-content-between flex-nowrap h-100">
									<b-col class="text-center flex-grow-0">
										<p v-if="!game.step"></p>
										<p v-else-if="isCurrentPlayer">
											{{ $ml.get("my_turn") }}
										</p>
										<p v-else-if="!isCurrentPlayer">
											{{ $ml.get("current_player") }}
											{{ $ml.get(this.game.step.currentPlayer.character.name) }}
										</p>
									</b-col>

									<b-col class="d-flex flex-grow-0 flex-column-reverse">
										<div
											class="d-flex justify-content-center align-items-center flex-grow-1 flex-column"
											v-if="game.step"
										>
											<b-button
												v-if="isCurrentPlayer && game.step.status === 'WAITING_DICE'"
												@click="callThrowDice"
												:disabled="diceBtnDisabled"
												class="throw-dice-btn"
											>
												<p>{{ $ml.get("throw_dice") }}</p>
											</b-button>
											<b-button
												v-if="game.step.status === 'WAITING_VOTE'"
												@click="voteModalVisible = true"
												:disabled="!canVote"
												class="throw-dice-btn"
											>
												<p>{{ $ml.get("WAITING_VOTE") }}</p>
											</b-button>
											<b-button
												class="throw-dice-btn mr-3"
												:disabled="showThrowCardsModalBtnDisabled"
												@click="throwCardsModalVisible = true"
												v-else-if="isCurrentPlayer && game.step.status === 'WAITING_CARD'"
											>
												<p>{{ $ml.get("throw_cards") }}</p>
											</b-button>

											<img
												:src="diceUrl"
												v-if="game.step.counter"
												:style="game.capacity > 4 ? 'width : 50%' : ''"
												style="margin-top: 5px"
											/>
										</div>

										<div
											class="d-flex justify-content-center align-items-center flex-grow-1"
											v-if="game && game.status === 'WAITING'"
										>
											<b-button
												@click="callStartGame"
												:disabled="startGameBtnDisabled"
												class="throw-dice-btn"
											>
												<p>{{ $ml.get("start_game") }}</p>
											</b-button>
										</div>

										<div
											class="d-flex justify-content-center align-items-center flex-grow-1"
											v-if="!isCurrentPlayer && game.step"
										>
											<p>
												{{ $ml.get(this.game.step.status) }}
											</p>
										</div>
										<div
											class="d-flex justify-content-center align-items-center flex-grow-1"
											v-else-if="game && game.status && game.status !== 'STARTED'"
										>
											<p>
												{{ $ml.get("GAME_" + this.game.status) }}
											</p>
										</div>
									</b-col>

									<b-col class="d-flex flex-column flex-grow-0">
										<img class="mb-2" width="34px" src="@/assets/board-game/timer.svg" />

										<svg
											class="timer"
											viewBox="0 0 229 12"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect class="timer-rect" y="0.833008" height="11" rx="5.5" fill="#04944F" />
										</svg>
									</b-col>
								</b-row>
							</div>
						</b-col>
					</b-row>
				</b-col>

				<b-col cols="4" class="d-flex align-items-center">
					<div class="board-game-row">
						<img
							id="board"
							class="board-game-img"
							:src="boardLanguage"
							usemap="#image-map"
							style="pointer-events: auto"
							@load="getBoardPosition"
						/>

						<map name="image-map">
							<area alt="101" href="" data-name="day" coords="513,682,19" shape="circle" />
							<area alt="106" href="" data-name="svjatvechir" coords="558,670,21" shape="circle" />
							<area alt="107" href="" data-name="rizdvo" coords="607,691,20" shape="circle" />
							<area alt="113" href="" data-name="malanki" coords="571,731,20" shape="circle" />
							<area alt="114" href="" data-name="vasilja" coords="545,775,19" shape="circle" />
							<area alt="118" href="" data-name="golodna_kutja" coords="597,790,20" shape="circle" />
							<area alt="119" href="" data-name="vodohresha" coords="642,764,20" shape="circle" />
							<area alt="201" href="" data-name="day" coords="696,726,23" shape="circle" />
							<area alt="215" href="" data-name="stritennja" coords="702,676,20" shape="circle" />
							<area alt="216" href="" data-name="maslenica" coords="737,639,23" shape="circle" />
							<area alt="217" href="" data-name="day" coords="795,654,22" shape="circle" />
							<area alt="301" href="" data-name="day" coords="847,600,22" shape="circle" />
							<area alt="314" href="" data-name="javdohi" coords="828,545,20" shape="circle" />
							<area alt="322" href="" data-name="sorok_svjatih" coords="890,537,20" shape="circle" />
							<area alt="330" href="" data-name="oleksi" coords="863,485,20" shape="circle" />
							<area alt="407" href="" data-name="blagoveshinnja" coords="900,411,20" shape="circle" />
							<area alt="408" href="" data-name="verbna_nedelja" coords="860,376,20" shape="circle" />
							<area alt="409" href="" data-name="velikden" coords="903,337,20" shape="circle" />
							<area alt="410" href="" data-name="day" coords="857,306,22" shape="circle" />
							<area alt="505" href="" data-name="ljalja" coords="825,256,19" shape="circle" />
							<area alt="506" href="" data-name="jurija" coords="779,228,21" shape="circle" />
							<area alt="522" href="" data-name="mikolaja_leto" coords="771,179,20" shape="circle" />
							<area alt="523" href="" data-name="trijcja" coords="723,162,20" shape="circle" />
							<area alt="601" href="" data-name="day" coords="678,122,23" shape="circle" />
							<area alt="602" href="" data-name="day" coords="625,142,21" shape="circle" />
							<area alt="603" href="" data-name="day" coords="596,97,22" shape="circle" />
							<area alt="604" href="" data-name="day" coords="543,121,23" shape="circle" />
							<area alt="701" href="" data-name="day" coords="475,108,23" shape="circle" />
							<area alt="707" href="" data-name="ivana_kupala" coords="425,148,20" shape="circle" />
							<area alt="712" href="" data-name="petra_i_pavla" coords="371,118,20" shape="circle" />
							<area alt="802" href="" data-name="illi" coords="309,155,21" shape="circle" />
							<area alt="814" href="" data-name="makovia" coords="295,213,20" shape="circle" />
							<area alt="819" href="" data-name="velikii_spas" coords="240,225,20" shape="circle" />
							<area alt="901" href="" data-name="day" coords="188,290,23" shape="circle" />
							<area
								alt="927"
								href=""
								data-name="vozdvizhennja_hrista"
								coords="210,336,20"
								shape="circle"
							/>
							<area alt="928" href="" data-name="day" coords="151,370,22" shape="circle" />
							<area alt="1014" href="" data-name="pokrova" coords="148,440,19" shape="circle" />
							<area alt="1015" href="" data-name="day" coords="132,487,22" shape="circle" />
							<area alt="1016" href="" data-name="day" coords="181,509,22" shape="circle" />
							<area alt="1017" href="" data-name="day" coords="141,557,22" shape="circle" />
							<area alt="1101" href="" data-name="day" coords="193,597,22" shape="circle" />
							<area alt="1121" href="" data-name="mihajla" coords="200,652,20" shape="circle" />
							<area alt="1122" href="" data-name="day" coords="255,639,22" shape="circle" />
							<area alt="1123" href="" data-name="day" coords="276,698,22" shape="circle" />
							<area alt="1204" href="" data-name="vvedenja" coords="335,724,19" shape="circle" />
							<area alt="1207" href="" data-name="katerini" coords="359,764,20" shape="circle" />
							<area alt="1213" href="" data-name="andria" coords="415,768,20" shape="circle" />
							<area alt="1219" href="" data-name="mikolaja_zima" coords="449,733,20" shape="circle" />
						</map>
					</div>
				</b-col>

				<b-col cols="5" class="right-side py-3 h-100">
					<b-row cols="1" class="justify-content-end align-items-between h-100">
						<b-col>
							<b-row class="d-flex justify-content-end align-items-center">
								<b-col cols="auto">
									<b-dropdown :text="$ml.current">
										<b-dropdown-item
											v-for="lang in $ml.list"
											v-if="lang !== $ml.current"
											:key="lang"
											@click="
												$ml.change(lang);
												currentLanguage = $ml.current.toLowerCase();
											"
										>
											<img
												class="w-25 m-2"
												:src="require('@/assets/navbar/' + lang + '.svg')"
											/>{{ lang }}
										</b-dropdown-item>
									</b-dropdown>
								</b-col>

								<b-col cols="auto">
									<p class="room-name">
										{{ $ml.get("room_name_room") }} “{{ game.name || roomDetails.name }}”
									</p>
								</b-col>

								<b-col cols="auto" v-if="gameState === 'default'">
									<b-button @click="leaveRoom()" :disabled="endGameBtnDisabled">
										<p>{{ $ml.get("end_game") }}</p>
									</b-button>
								</b-col>

								<b-col cols="auto" v-else-if="gameState === 'game-not-started'">
									<b-button @click="joinRoom()" :disabled="joinRoomBtnDisabled">
										<p>{{ $ml.get("join_room") }}</p>
									</b-button>
								</b-col>

								<b-col
									cols="auto"
									v-else-if="gameState === 'spectator' || gameState === 'game-finished-cancelled'"
								>
									<b-button to="/game-dashboard">
										<p>{{ $ml.get("go_to_home_page") }}</p>
									</b-button>
								</b-col>
							</b-row>
						</b-col>

						<b-col class="d-flex justify-content-end">
							<ActiveRoomsGraph
								v-if="game"
								class="active-rooms-graph"
								:currentRoomFromActiveRoomsGraph="game"
								:displayRoomName="false"
								:activePlayersCountFromActiveRoomsGraph="game.players ? game.players.length : 0"
							></ActiveRoomsGraph>

							<ActiveRoomsGraph
								v-else-if="roomDetails.players"
								class="active-rooms-graph"
								:currentRoomFromActiveRoomsGraph="roomDetails"
								:displayRoomName="false"
								:activePlayersCountFromActiveRoomsGraph="roomDetails.players.length"
							></ActiveRoomsGraph>
						</b-col>

						<b-col class="d-flex justify-content-end">
							<div class="my-cards-box">
								<b-row class="d-flex justify-content-start align-items-start h-100 mx-auto">
									<b-col cols="11" class="text-center pr-0">
										<p>{{ $ml.get("deck") }}</p>
									</b-col>

									<b-col cols="1" class="d-flex px-0">
										<img src="@/assets/board-game/info-sign.svg" width="18" />
									</b-col>

									<b-col cols="12" class="first-row-deck">
										<b-row class="cards mx-auto">
											<b-col
												class="p-0"
												style="width: 60px; height: 82px;"
												v-for="card in dishesDeck"
											>
												<img :src="require('@/assets/cards/dishes/' + card.name + '.png')" />
											</b-col>
										</b-row>
									</b-col>

									<b-col cols="12">
										<b-row class="cards mx-auto">
											<b-col
												class="p-0"
												style="width: 60px; height: 82px;"
												v-for="card in ritualsDeck"
											>
												<img :src="require('@/assets/cards/rituals/' + card.name + '.png')" />
											</b-col>
										</b-row>
									</b-col>

									<b-col cols="12">
										<b-row class="cards mx-auto">
											<b-col
												class="p-0"
												style="width: 60px; height: 82px;"
												v-for="card in stuffDeck"
											>
												<img :src="require('@/assets/cards/stuff/' + card.name + '.png')" />
											</b-col>
										</b-row>
									</b-col>
								</b-row>
							</div>
						</b-col>

						<b-col class="d-flex justify-content-end align-items-end">
							<div class="my-progress-box">
								<b-row class="h-100">
									<b-col cols="6" class="left h-100 character-anchor">
										<img
											v-if="currentDevicePlayer && currentDevicePlayer.character"
											class="character-img w-100 h-100"
											:src="require('@/assets/cards/character/' + playerCharacter + '.png')"
										/>
									</b-col>

									<b-col cols="6" class="d-flex flex-column justify-content-between right">
										<p>{{ $ml.get("my_character") }}</p>

										<p class="mt-5">{{ $ml.get("my_happiness") }}</p>

										<b-row class="d-flex justify-content-center align-items-center happiness">
											<b-col cols="5" class="px-0">
												<img src="@/assets/board-game/zheton.png" />
											</b-col>
											<b-col cols="auto" class="px-2">
												<p>-</p>
											</b-col>
											<b-col cols="2" class="px-0">
												<p>{{ playerHappiness }}</p>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
							</div>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</b-container>

		<InGameModal :modalVisible="throwCardsModalVisible" :footerHidden="false" :headerHidden="true">
			<template v-slot:upper-half>
				<div class="mx-1" v-for="card in dishesDeck">
					<img
						:src="require('@/assets/cards/dishes/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToThrow')"
					/>
				</div>

				<div class="mx-1" v-for="card in ritualsDeck">
					<img
						:src="require('@/assets/cards/rituals/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToThrow')"
					/>
				</div>

				<div class="mx-1" v-for="card in stuffDeck">
					<img
						:src="require('@/assets/cards/stuff/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToThrow')"
					/>
				</div>
			</template>

			<template v-slot:footer>
				<b-button @click="callThrowCards()">
					<p v-bind:style="{ color: 'white', fontSize: '22px' }">
						{{ $ml.get("throw_cards") }}
					</p>
				</b-button>
				<b-button @click="throwCardsModalVisible = false">
					<p v-bind:style="{ color: 'white', fontSize: '22px' }">
						{{ $ml.get("close") }}
					</p>
				</b-button>
			</template>
		</InGameModal>

		<InGameModal :modalVisible="voteModalVisible" :footerHidden="false" :headerHidden="true">
			<template v-slot:upper-half>
				<div class="mx-1" v-for="card in dishesDeckForVote">
					<img
						:src="require('@/assets/cards/dishes/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToVote')"
					/>
				</div>

				<div class="mx-1" v-for="card in ritualsDeckForVote">
					<img
						:src="require('@/assets/cards/rituals/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToVote')"
					/>
				</div>

				<div class="mx-1" v-for="card in stuffDeckForVote">
					<img
						:src="require('@/assets/cards/stuff/' + card.name + '.png')"
						@click="chooseCardsForAction(card.id, $event, 'cardsToVote')"
					/>
				</div>
			</template>

			<template v-slot:footer>
				<b-button @click="callVote()">
					<p v-bind:style="{ color: 'white', fontSize: '22px' }">
						{{ $ml.get("WAITING_VOTE") }}
					</p>
				</b-button>
				<b-button @click="voteModalVisible = false">
					<p v-bind:style="{ color: 'white', fontSize: '22px' }">
						{{ $ml.get("close") }}
					</p>
				</b-button>
			</template>
		</InGameModal>

		<GameEndedModal
			v-if="game && game.players && (game.status === 'FINISHED' || game.status === 'CANCELLED')"
			:modalVisible="gameEndedModalVisible"
			:footerHidden="false"
			:headerHidden="true"
		>
			<template v-slot:upper-half>
				<b-row class="d-flex justify-content-center">
					<b-col cols="12" class="my-2">
						<p
							v-bind:style="{
								fontFamily: 'Montserrat',
								fontWeight: '500',
								fontSize: '35px',
							}"
						>
							{{ $ml.get("game_ended") }}
						</p>
					</b-col>

					<b-col cols="3" class="my-2" v-for="player in game.players" :key="player.id">
						<img :src="require('@/assets/cards/character/' + player.character.name + '.png')" />
						<p style="font-size: 26px">
							{{ $ml.get(player.character.name) }}
						</p>
						<p style="font-size: 24px">{{ $ml.get("happiness") }} - {{ player.happiness }}</p>
					</b-col>
				</b-row>
			</template>

			<template v-slot:footer>
				<b-button @click="gameEndedModalVisible = false">
					<p
						v-bind:style="{
							color: 'white',
							fontFamily: 'Montserrat',
							fontWeight: '400',
							fontSize: '18px',
						}"
					>
						OK
					</p>
				</b-button>
			</template>
		</GameEndedModal>

		<InGameModal :modalVisible="stepTimeOutModalVisible" :footerHidden="false" :headerHidden="true">
			<template v-slot:upper-half>
				<p
					v-bind:style="{
						color: '#E15465',
						fontFamily: 'Montserrat',
						fontWeight: '500',
						fontSize: '35px',
					}"
				>
					{{ $ml.get("step_time_over") }}
				</p>
			</template>

			<template v-slot:footer>
				<b-button @click="stepTimeOutModalVisible = false">
					<p
						v-bind:style="{
							color: 'white',
							fontFamily: 'Montserrat',
							fontWeight: '400',
							fontSize: '18px',
						}"
					>
						OK
					</p>
				</b-button>
			</template>
		</InGameModal>

		<InGameModal :modalVisible="dayDescription" :footerHidden="false" :headerHidden="true">
			<template v-slot:upper-half>
				<div class="flex-column">
					<p
						v-bind:style="{
							fontFamily: 'Montserrat',
						}"
					>
						{{ $ml.get("day_" + modalDay) }}
					</p>
				</div>
			</template>

			<template v-slot:footer>
				<b-button @click="dayDescription = false">Close</b-button>
			</template>
		</InGameModal>

		<InGameModal :modalVisible="birthdayModalVisible" :footerHidden="false" :headerHidden="true">
			<template v-slot:upper-half>
				<img
					@click="chooseBirthdayCards('dishes', $event)"
					class="mx-1 dishes"
					:src="require('@/assets/cards/dishes/dishes.png')"
				/>
				<img
					@click="chooseBirthdayCards('rituals', $event)"
					class="mx-1 rituals"
					:src="require('@/assets/cards/rituals/rituals.png')"
				/>
				<img
					@click="chooseBirthdayCards('stuff', $event)"
					class="mx-1 stuff"
					:src="require('@/assets/cards/stuff/stuff.png')"
				/>
			</template>

			<template v-slot:footer>
				<b-button @click="submitBirthdayCard">
					<p v-bind:style="{ color: 'white', fontSize: '22px' }">
						Take
					</p>
				</b-button>
			</template>
		</InGameModal>
	</div>
</template>

<script>
import api from "@/api/api";
import * as imageMapResize from "@/plugins/imageMapResizer.min.js";
import { mapState } from "vuex";
import GameLogic from "./GameLogic";
import ActiveRoomsGraph from "./ActiveRoomsGraph.vue";
import InGameModal from "../modals/InGameModal.vue";
import GameEndedModal from "../modals/GameEndedModal.vue";
import RTCClient from "./agora/RTCClient";
import * as Snowfall from "../../plugins/snowfall/snowfall.js";

export default {
	name: "BoardGame",

	components: {
		RTCClient,
		GameLogic,
		ActiveRoomsGraph,
		InGameModal,
		GameEndedModal,
	},

	data() {
		return {
			boardX: "",
			boardY: "",
			adjustedCoordX: "",
			adjustedCoordY: "",
			inited: false,
			diceRolledTemporary: "",
			diceRolled: "initial",

			cardsToThrow: [],
			cardsToVote: [],
			dishesDeckForVote: [],
			ritualsDeckForVote: [],
			stuffDeckForVote: [],

			dishesDeck: [],
			ritualsDeck: [],
			stuffDeck: [],

			throwCardsModalVisible: false,
			showThrowCardsModalBtnDisabledTemporary: false,
			showThrowCardsModalBtnDisabled: false,
			voteModalVisible: false,
			canVote: false,
			gameEndedModalVisible: false,
			stepTimeOutModalVisible: false,

			diceBtnDisabled: true,
			startGameBtnDisabled: true,
			endGameBtnDisabled: false,
			joinRoomBtnDisabled: false,

			modalDay: "day",
			dayDescription: false,

			gameState: "",
			intervalDice: "",
			diceUrl: "",

			seasonNumber: 0,
			snow: Object,

			currentLanguage: "",
			playersInGame: [],
			currentDevicePlayer: {},
			roomDetails: Object,

			birthdayCardsArray: [],
			birthdayModalVisible: false,
		};
	},

	computed: {
		...mapState({
			game: "gameState",
			devicePlayerId: "devicePlayerId",
		}),

		playerHappiness() {
			return this.currentDevicePlayer.happiness;
		},

		playerCharacter() {
			return this.currentDevicePlayer.character.name;
		},

		isCurrentPlayer() {
			if (this.game.step && this.currentDevicePlayer.id === this.game.step.currentPlayer.id) {
				return true;
			}
		},

		boardLanguage() {
			let boardSrc = require(`../../assets/board-game/board-${this.currentLanguage}.svg`);
			return boardSrc;
		},
	},

	methods: {
		chooseCardsForAction(id, ev, actionArray) {
			let elementStyle = ev.target.style;

			if (!this[actionArray].includes(id)) {
				this[actionArray].push(id);

				elementStyle.position = "relative";
				elementStyle.bottom = "30px";
			} else {
				let cardIndexToRemove = this[actionArray].indexOf(id);
				this[actionArray].splice(cardIndexToRemove, 1);

				elementStyle.position = "static";
				elementStyle.bottom = "0";
			}
		},

		chooseBirthdayCards(cardType, ev) {
			let elementStyle = ev.target.style;

			if (this.birthdayCardsArray.length == 0) {
				elementStyle.position = "relative";
				elementStyle.bottom = "30px";

				this.birthdayCardsArray.push(cardType);
			} else if (this.birthdayCardsArray.length > 0 && this.birthdayCardsArray.includes(cardType)) {
				elementStyle.position = "static";
				elementStyle.bottom = "0";

				this.birthdayCardsArray.pop();
			} else {
				this.birthdayCardsArray.push(cardType);

				elementStyle.position = "relative";
				elementStyle.bottom = "30px";

				let previousElem = document.getElementsByClassName(this.birthdayCardsArray[0]);

				previousElem[0].style.position = "static";
				previousElem[0].style.bottom = "0";

				this.birthdayCardsArray.shift();
			}
		},

		submitBirthdayCard() {
			this.birthdayModalVisible = false;
			this.$refs.gameLogic.pickBirthdayCard(this.birthdayCardsArray[0]);
		},

		callThrowDice() {
			this.diceBtnDisabled = true;
			this.showThrowCardsModalBtnDisabled = true;
			this.$refs.gameLogic.throwDice();
		},

		callStartGame() {
			this.startGameBtnDisabled = true;
			this.$refs.gameLogic.startGame();
		},

		callThrowCards() {
			this.$refs.gameLogic.throwCards(this.cardsToThrow);
			this.cardsToThrow = [];
			this.throwCardsModalVisible = false;
			this.showThrowCardsModalBtnDisabled = true;
		},

		populateVoteCardDecks(thrownCards) {
			this.dishesDeckForVote = thrownCards.filter((card) => card.cardType === 1);
			this.ritualsDeckForVote = thrownCards.filter((card) => card.cardType === 2);
			this.stuffDeckForVote = thrownCards.filter((card) => card.cardType === 3);
		},

		callVote() {
			this.$refs.gameLogic.vote(this.cardsToVote);
			this.cardsToVote = [];
			this.voteModalVisible = false;
			this.canVote = false;
		},

		leaveRoom() {
			this.endGameBtnDisabled = true;
			this.joinRoomBtnDisabled = false;
			api.leaveRoom().then();
		},

		joinRoom() {
			this.joinRoomBtnDisabled = true;
			this.endGameBtnDisabled = false;
			api.joinRoom(this.$route.params.id).then(() => this.$store.dispatch("setGameAction"));
		},

		getBoardPosition() {
			let elem = document.querySelector("#board");
			let board = elem.getBoundingClientRect();
			this.boardX = board.x;
			this.boardY = board.y;

			imageMapResize();
		},

		adjustImgMapCoords(players) {
			if (this.game && players && this.game.status === "STARTED") {
				for (let player of players) {
					let elem = document.querySelector(`area[alt='${player.currentDay.deskOrder}']`);
					let coordsAttr = elem.getAttribute("coords");
					let coordsAttrArray = coordsAttr.split(",");

					let playerFigure = document.getElementById("player-character-" + player.character.name);
					if (playerFigure) {
						let elementWidth = playerFigure.getBoundingClientRect().width;
						let elementHeight = playerFigure.getBoundingClientRect().height;

						if (this.diceRolled === "initial" || this.diceRolled === "each-roll") {
							this.adjustedCoordX = this.boardX + parseFloat(coordsAttrArray[0]);
							this.adjustedCoordY = this.boardY + parseFloat(coordsAttrArray[1]);

							playerFigure.style.left = `${this.adjustedCoordX - elementWidth / 2}px`;
							playerFigure.style.top = `${this.adjustedCoordY - coordsAttrArray[2] - elementHeight}px`;

							this.inited = true;
						}

						if (this.isCurrentPlayer && this.diceRolled == "each-roll") {
							this.seasonChanged();
							this.diceRolled = "unset";
						}
					}
				}
			}
		},

		areaClick() {
			let area = document.getElementsByTagName("area");

			area.forEach(() => {
				addEventListener("click", (event) => {
					event.preventDefault();
					let dayName = event.target.dataset.name;
					if (!dayName) {
						return;
					}
					if (dayName === "day") {
						if (this.game && this.game.players) {
							if (
								this.game.step &&
								this.game.step.currentPlayer &&
								this.game.step.currentPlayer.currentDay &&
								this.game.step.currentPlayer.currentDay.holiday &&
								this.game.step.currentPlayer.currentDay.deskOrder == event.target.alt
							) {
								dayName = this.game.step.currentPlayer.currentDay.name;
							} else if (
								this.currentDevicePlayer.currentDay &&
								this.currentDevicePlayer.currentDay.holiday &&
								this.currentDevicePlayer.currentDay.deskOrder == event.target.alt
							) {
								dayName = this.currentDevicePlayer.currentDay.name;
							} else {
								let players = this.game.players.filter(
									(player) =>
										player.currentDay &&
										player.currentDay.deskOrder == event.target.alt &&
										player.currentDay.holiday
								);
								if (players.length > 0) {
									dayName = players[0].currentDay.name;
								}
							}
						}
					}
					this.modalDay = dayName;
					this.dayDescription = true;
				});
			});
		},

		loaderProgress() {
			let progress = document.querySelector("progress");
			let images = require.context("../../assets/board-game/", true);
			progress.max = images.keys().length;

			images.keys().forEach((key) => {
				let img = new Image();
				img.src = require("../../assets/board-game/" + key.replace("./", ""));
				img.onload = () => {
					progress.value++;
					if (progress.value === images.keys().length) {
						document.getElementById("overlay").style.display = "none";
						this.getBoardPosition();
					}
				};
			});
		},

		diceAnimate() {
			let count = 0;

			if (this.game && this.game.step.counter != null) {
				this.intervalDice = setInterval(() => {
					if (count >= 30) {
						clearInterval(this.intervalDice);
						this.diceUrl = require("@/assets/board-game/dice-" +
							this.game.step.counter +
							"-" +
							(this.game.capacity > 4 ? 2 : 1) +
							".svg");
						this.diceRolled = "each-roll";
						this.adjustImgMapCoords([this.game.step.currentPlayer]);
						if (this.showThrowCardsModalBtnDisabledTemporary == false) {
							this.showThrowCardsModalBtnDisabled = false;
						}
					} else {
						count++;
						let random = Math.floor(Math.random() * 6) + 1;
						this.diceUrl = require("@/assets/board-game/dice-" +
							random +
							"-" +
							(this.game.capacity > 4 ? 2 : 1) +
							".svg");
					}
				}, 100);
			}
		},

		timerAnimate(startAt) {
			let actionTimeUtc = new Date(startAt).toUTCString();
			let currentTimeUtc = new Date().toUTCString();
			let msTillAction = Math.abs(Date.parse(actionTimeUtc) - Date.parse(currentTimeUtc));
			let timerRect = document.querySelector(".timer-rect");

			timerRect.animate([{ width: "229px" }, { width: "0" }], {
				duration: msTillAction,
				fill: "forwards",
			});
		},

		makeItSnow(season) {
			let snowflake = document.querySelector("#snow");
			snowflake.style.opacity = 1;

			$("#snow").snowfall({
				flakeCount: 70,
				image: require(`../../assets/board-game/${season}.svg`),
				minSize: 10,
				maxSize: 20,
				minSpeed: 1,
				maxSpeed: 2,
				shadow: false,
			});

			setTimeout(() => {
				if (snowflake) {
					let snowflakeOpacityInterval = setInterval(() => {
						if (snowflake.style.opacity == 0) {
							snowflake.querySelectorAll("img").forEach((item) => item.remove());
							clearInterval(snowflakeOpacityInterval);
						} else {
							snowflake.style.opacity = snowflake.style.opacity - 0.1;
						}
					}, 300);
				}
			}, 8000);
		},

		seasonChanged() {
			if (this.isCurrentPlayer && this.currentDevicePlayer.currentDay.deskOrder != null) {
				let day = this.currentDevicePlayer.currentDay.deskOrder;

				switch (true) {
					case day >= 301 && day <= 523:
						if (this.seasonNumber < 301 || this.seasonNumber > 523) {
							this.seasonNumber = day;
							this.makeItSnow("spring");
						}
						break;
					case day >= 601 && day <= 819:
						if (this.seasonNumber < 601 || this.seasonNumber > 819) {
							this.seasonNumber = day;
							this.makeItSnow("summer");
						}
						break;
					case day >= 901 && day <= 1123:
						if (this.seasonNumber < 901 || this.seasonNumber > 1123) {
							this.seasonNumber = day;
							this.makeItSnow("autumn");
						}
						break;
					case day >= 1204 && day <= 1219:
						if (this.seasonNumber < 1204 || this.seasonNumber > 1219) {
							this.seasonNumber = day;
							this.makeItSnow("winter");
						}
						break;
				}
			}
		},

		setRoomDetails() {
			this.$store.dispatch("getGamesByIdAction", this.$route.params.id).then((response) => {
				this.roomDetails = response;
			});
		},
	},

	watch: {
		game: {
			handler: function() {
				if (this.game && this.game.players && this.devicePlayerId) {
					this.currentDevicePlayer = this.game.players.filter(
						(player) => player.id == this.devicePlayerId
					)[0];
				}

				if (Object.keys(this.currentDevicePlayer).length) {
					let deck = this.currentDevicePlayer.deck;

					this.dishesDeck = deck.filter((card) => card.cardType === 1);
					this.ritualsDeck = deck.filter((card) => card.cardType === 2);
					this.stuffDeck = deck.filter((card) => card.cardType === 3);
				}

				if (this.game && this.game.status === "STARTED" && this.game.players) {
					if (this.playersInGame.length === 0 || this.playersInGame.length !== this.game.players.length) {
						this.playersInGame = this.game.players;
						setTimeout(() => this.adjustImgMapCoords(this.playersInGame), 500);
					}
				}
			},
			deep: true,
		},

		"game.startAt": function() {
			if (this.game.status === "WAITING") {
				this.timerAnimate(this.game.startAt);
			}
		},

		"game.nextStepAt": function() {
			if (this.game.status === "STARTED" && this.game.nextStepAt) {
				this.timerAnimate(this.game.nextStepAt);
			}
		},

		"game.step.counter": function() {
			if (this.game && this.game.step && this.game.step.counter != null) {
				if (this.isCurrentPlayer) {
					this.diceAnimate();
				} else {
					this.diceUrl = require("@/assets/board-game/dice-" +
						this.game.step.counter +
						"-" +
						(this.game.capacity > 4 ? 2 : 1) +
						".svg");
					this.diceRolled = "each-roll";
					this.adjustImgMapCoords([this.game.step.currentPlayer]);
				}
			}
		},

		"currentDevicePlayer.currentDay.holiday": function() {
			if (
				this.currentDevicePlayer &&
				this.currentDevicePlayer.currentDay &&
				(this.currentDevicePlayer.currentDay.name == "yangel" ||
					this.game.step.currentPlayer.currentDay.name == "urodini")
			) {
				console.log("current holiday", this.game.step.currentPlayer.currentDay.name);
				console.log("YESSS, IT'S MY BIRTHDAY TODAY!!!");
				this.birthdayModalVisible = true;
			}
		},
	},

	created() {
		this.currentLanguage = this.$ml.current.toLowerCase();
	},

	mounted() {
		this.setRoomDetails();
		this.areaClick();
		this.loaderProgress();
	},
};
</script>

<style scoped>
* {
	box-sizing: border-box;
}

#main-div {
	height: 100vh;
	background: #f0f8ff url("../../assets/home-page/background-patterns.png") no-repeat center;
	background-size: 100vw;
}

#overlay {
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: white;
	z-index: 999;
}

progress {
	appearance: none;
	width: 300px;
	height: 10px;
}

::-webkit-progress-bar {
	background-color: #cecece;
	border-radius: 50px;
}

::-webkit-progress-value {
	background-color: #00ea40;
	border-radius: 50px;
}

p {
	margin-bottom: 0;
	font-family: "Amatic_SC";
	line-height: 1;
	color: black;
}

.board-game-row {
	position: relative;
}

.board-game-row img {
	position: relative;
	width: 50vw;
	z-index: 1;
}

.left-side .col:first-child button p,
.left-side .col:first-child a p {
	font-family: "Montserrat";
	font-size: 18px;
}

.game-controls-box {
	width: 287px;
	height: 272px;
	padding: 20px 30px 35px 30px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07), 0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275), 0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725), 0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

.game-controls-box p {
	font-size: 32px;
}

.throw-dice-btn {
	border: 1px solid #5f9da5;
	border-radius: 10px;
	background-color: white;
}

.throw-dice-btn p {
	font-size: 20px;
}

.timer-rect {
	width: 229px;
}

.right-side p {
	font-size: 40px;
}

.right-side button p {
	font-family: "Montserrat";
	font-size: 18px;
}

.right-side a p {
	font-family: "Montserrat";
	font-size: 18px;
}

.room-name {
	display: -webkit-box;
	width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

::v-deep .men-img {
	width: 10vw;
}

.my-cards-box {
	width: 10vw;
	height: 380px;
	padding: 10px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07), 0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275), 0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725), 0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

.my-cards-box p {
	font-size: 35px;
}

.my-cards-box .cards {
	height: 90px;
}

.my-cards-box .cards img {
	width: 60px;
}

.cards .p-0:hover img {
	position: absolute;
	width: 10vw;
	left: -75px;
	bottom: 100px;
	z-index: 9999;
}

.character-anchor:hover img {
	position: absolute;
	width: 17vw !important;
	height: 20vw !important;
	left: -75px;
	bottom: 100px;
	z-index: 9999;
}

.first-row-deck .p-0:hover img {
	bottom: 60px;
}

.cards :nth-child(2) {
	position: absolute;
	top: 15px;
	left: 55px;
}

.cards > :nth-child(1) {
	position: absolute;
	top: 27px;
}

.my-progress-box {
	width: 329px;
	height: 180px;
	padding: 10px 30px 10px 30px;
	border: 1px solid #e4e4e4;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0px 100px 80px rgba(205, 205, 205, 0.07), 0px 88.2875px 33.4221px rgba(205, 205, 205, 0.0503198),
		0px 56.1188px 17.869px rgba(205, 205, 205, 0.0417275), 0px 30.0624px 10.0172px rgba(205, 205, 205, 0.035),
		0px 13.7171px 5.32008px rgba(205, 205, 205, 0.0282725), 0px 4.3807px 2.21381px rgba(205, 205, 205, 0.0196802);
}

.my-progress-box p {
	font-size: 22px;
	text-align: center;
}

.happiness img {
	width: 55px;
}

.happiness p {
	font-size: 33px;
}

.player-character {
	position: absolute;
	top: 450px;
	z-index: 2;
	transition-duration: 1s;
	transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
}
::v-deep .btn.dropdown-toggle {
	border: 0;
	font-size: max(13px, 0.73vw);
	background-color: transparent !important;
	font-family: "Montserrat";
	color: black !important;
}

@media (min-width: 768px) and (max-width: 991.98px) {
}
@media (min-width: 992px) and (max-width: 1199.98px) {
}
@media (min-device-width: 1400px) and (max-device-width: 1440px) {
}
@media (min-device-width: 1536px) and (max-device-width: 1536px) {
}
</style>

<!-- <template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-row v-if="game.started">
          <b-col>
            <b-row>Сейчас ходит игрок:
              {{ thisPlayer && game.currentPlayer.id === thisPlayer.id ? 'Вы' : game.currentPlayer.name }}
            </b-row>
            <b-row>Следующий ход через: {{ beforeNextStep >= 0 ? beforeNextStep : 0 }}</b-row>
            <b-row>На кубике: {{ game.counter }}</b-row>
            <b-row v-if="thisPlayer">Ваше счастье: {{ thisPlayer.happiness }}</b-row>
            <b-row v-if="thisPlayer">Вы находитесь на позиции: {{ thisPlayer.currentDay.deskOrder }} название:
              {{ thisPlayer.currentDay.name }}
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <p v-if="beforeGame > 0">Игра начнется в {{ game.startAt | formatDate }}</p>
          <p v-if="beforeGame > 0">через: {{ beforeGame }}</p>
        </b-row>
        <b-row>
          <b-button v-if="!playerInGame() && beforeGame > 0 && players.length < 5" @click="joinGame" class="w-auto">
            {{ $ml.get('join') }}
          </b-button>
          <b-button v-if="playerInGame()" @click="exitGame" class="w-auto">{{ $ml.get('exit') }}</b-button>
        </b-row>
        <b-row>
          <b-col><img style="height: auto; width: 100%" :src="require('@/assets/pole/pole.png')"></b-col>
          <b-col v-if="false"><img style="height: auto; width: 100%"
                                   :src="require('@/assets/cards/character/rubashka.png')"></b-col>
          <b-col>
            <b-row>
              <b-col class="m-3" style="display: flex; justify-content: center; align-items: center"><img
                  style="height: auto; width: 50%" :src="require('@/assets/cards/stuff/rubashka.png')"></b-col>
              <b-col class="m-3" style="display: flex; justify-content: center; align-items: center"><img
                  style="height: auto; width: 50%" :src="require('@/assets/cards/dishes/rubashka.png')"></b-col>
            </b-row>
            <b-row>
              <b-col class="m-3" style="display: flex; justify-content: center; align-items: center"><img
                  style="height: auto; width: 50%" :src="require('@/assets/cards/holiday/rubashka.png')"></b-col>
              <b-col class="m-3" style="display: flex; justify-content: center; align-items: center"><img
                  style="height: auto; width: 50%" :src="require('@/assets/cards/rituals/rubashka.png')"></b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="playersCards.character.name">
            Character
            <img
                style="height: auto; width: 50%"
                :src="getUrl('character', playersCards.character.name)">
          </b-col>
          <b-col v-if="playersCards.dishes.length > 0">
            dishes
            <img v-for="dish in playersCards.dishes" style="height: auto; width: 50%"
                 :src="getUrl('dishes', dish.name)">
          </b-col>
          <b-col v-if="playersCards.stuff.length > 0">
            stuff
            <img v-for="stuff in playersCards.stuff"
                 style="height: auto; width: 50%"
                 :src="getUrl('stuff', stuff.name)">
          </b-col>
          <b-col v-if="playersCards.rituals.length > 0">
            rituals
            <img v-for="ritual in playersCards.rituals"
                 style="height: auto; width: 50%"
                 :src="getUrl('rituals', ritual.name)">
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "GameDesktop",
  data: function () {
    return {
      gameId: 0,
      game: {},
      playersCards: {
        dishes: [],
        rituals: [],
        stuff: [],
        character: {}
      },
      beforeGame: 0,
      intervalVal: undefined,
      thisPlayer: undefined,
      beforeNextStep: 0,
      players: []
    }
  },
  mounted() {
    this.gameId = this.$route.params.id;
    let self = this;
    this.intervalVal = setInterval(function () {
      axios.get('/api/games/' + self.gameId).then(response => {
        self.game = response.data;
        self.beforeGame = self.getCounter(self.game.startAt);
        self.beforeNextStep = self.getCounter(self.game.nextStepAt);
        if (self.beforeGame < 0 && !self.game.started) {
          self.startGame();
        }
        if (self.game.started) {
          let playerId = self.$cookies.get('player');
          if (playerId) {
            let player = self.game.players.filter(player1 => player1.id === playerId)[0];
            self.initPlayer(player)
          }
        }
        if (self.beforeNextStep < 0) {
          self.nextStep();
        }
      })
    }, 1000)
  },
  methods: {
    getCounter: function (time) {
      return Math.floor((new Date(time).getTime() / 1000) - (new Date().getTime() / 1000));
    },
    nextStep: function () {
      axios.get('/api/game/' + this.gameId + '/next');
    },
    startGame: function () {
      axios.get('/api/game/' + this.gameId + '/start').then(res => {
        if (!res.data) {
          return;
        }
        this.initPlayer(res.data)
        this.$cookies.set('player', res.data.id);
      })
    },
    getUrl: function (path, name) {
      return require('@/assets/cards/' + path + '/' + name + '.png')
    },
    initPlayersCard: function () {
      this.playersCards = {
        dishes: [],
        rituals: [],
        stuff: [],
        character: {}
      }
    },
    initPlayer: function (data) {
      this.thisPlayer = data;
      this.initPlayersCard();
      this.playersCards.character = data.character;
      let playerDeck = data.deck;
      for (let field in this.playersCards) {
        for (let card of playerDeck) {
          if (card.cardType.toLowerCase() === field) {
            this.playersCards[field].push(card);
          }
        }
      }
    },
    joinGame: function () {
      axios.post('/api/game/' + this.gameId);
    },
    exitGame: function () {
      axios.delete('/api/game/' + this.gameId);
    },
    playerInGame: function () {
      this.players = this.game.players;
      if (this.players.length === 0) return false;
      const id = this.$cookies.get('playerid');
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].id === id) return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>

</style> -->

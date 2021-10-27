<!-- <template>
  <b-container fluid class="d-flex flex-column">
    <div class="d-flex justify-content-around">
      <b-jumbotron class="m-3" style="width: 30%" v-if="hasGames" v-for="game in games" :key="game.id">
        <p>{{$ml.get('name')}}: {{game.name}}</p>
        <p>{{$ml.get('capacity')}}: {{game.capacity}}</p>
        <p>{{$ml.get('current_players')}}: {{game.players.length}}</p>
        <router-link class="btn btn-secondary" :to="'/game/'+game.id">{{$ml.get('join')}}</router-link>
      </b-jumbotron>
      <div v-if="!hasGames">
        <h1>{{ $ml.get('please_add_new_game') }}</h1>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <b-button @click="openModal" class="w-auto">{{ $ml.get('add_new_game') }}</b-button>
    </div>
    <b-modal v-model="modalShow" centered hide-footer>
      <template v-slot:modal-header="{ close }">
        <b-button class="ms-auto" variant="light" @click="closeModal">
          <b-icon icon="x"></b-icon>
        </b-button>
      </template>
      <div>
        <div>
          <b-form-group :label="$ml.get('capacity')" label-for="capacity">
            <b-form-input id="capacity" v-model="creationRequest.capacity" type="number"></b-form-input>
          </b-form-group>
          <b-form-group :label="$ml.get('with_computer')" label-for="with-computer">
            <b-form-checkbox id="with-computer" v-model="creationRequest.withComputer"
                             type="checkbox"></b-form-checkbox>
          </b-form-group>
          <b-form-group :label="$ml.get('private')" label-for="private">
            <b-form-checkbox id="private" v-model="creationRequest.privateRoom" type="checkbox"></b-form-checkbox>
          </b-form-group>
          <b-form-group v-if="creationRequest.privateRoom" :label="$ml.get('password')" label-for="password">
            <b-form-input id="password" v-model="creationRequest.password"></b-form-input>
          </b-form-group>
          <b-form-group :label="$ml.get('name')" label-for="name">
            <b-form-input id="name" v-model="creationRequest.name"></b-form-input>
          </b-form-group>
        </div>
        <div>
          <b-button @click="addGame">save</b-button>
          <b-button @click="closeModal">cancel</b-button>
        </div>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Games",
  data: function () {
    return {
      games: [],
      creationRequest: {},
      modalShow: false,
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    hasGames: function () {
      return this.games.length > 0;
    }
  },
  methods: {
    openModal: function () {
      this.modalShow = true;
      this.initRequest();
    },
    closeModal: function () {
      this.modalShow = false;
    },
    addGame: function () {
      axios.post('/api/games', this.creationRequest).then(() => {
        this.closeModal();
        this.init();
      })
          .catch(res => {
            console.log(res)
          })
    },
    init: function () {
      axios.get('/api/games').then(response => {
        this.games = response.data
      });
    },
    initRequest: function () {
      this.creationRequest = {
        capacity: 5,
        withComputer: false,
        privateRoom: false,
        password: '',
        name: ''
      }
    }
  }
}
</script>

<style scoped>
.jumbotron {
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  background-color: var(--bs-light);
  border-radius: .3rem;
}
</style> -->

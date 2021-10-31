import Vue from 'vue'
import { MLanguage, MLCreate, MLInstaller } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
	initial: 'Ukrainian',
	save: process.env.NODE_ENV === 'production',
	languages: [
		new MLanguage('Ukrainian').create({
			"": "",
			please_add_new_game: 'В данный момент игр нет. Добавьте новую',
			home: 'главная',
			games: 'Игры',
			capacity: 'Размер комнаты',
			with_computer: 'Игра с компьютером',
			private: 'Приватная комната',
			password: 'Пароль',
			name: 'Название',
			current_players: 'Игроков сейчас',
			create_new_room: "создать комнату",
			join: "присоедениться",
			INTERNAL_SERVER_ERROR: 'Произошла ошибка сервера. Пожалуйста, перезагрузите страницу!',
			CAPACITY_LIMIT_REACHED: 'Достигнуто максимальное количество игроков',
			PLAYER_ALREADY_IN_GAME: 'Игрок уже в игре',
			about_project: "о проекте",
			game_description: "описание игры",
			game_rules: "правила игры",
			board_game: "настольная игра",
			start_game: "начать игру",
			contacts: "контакты",
			sponsors: "нас поддерживают",
			home_page_text_middle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
			copyright_footer: "©2021 Українське Земляцтво Сілламяе «Водограй»",
			active_games_list: "Список созданных комнат",
			play_with_computer: "желаю играть с компьютером",
			choose_players_count: "выбирете желаемое количество играков в комнате",
			choose_max_time_per_turn: "выбирете максимальное время отведенное на ход (мин)",
			players_count_in_room: "в этой комнате играет",
			max_time_per_turn: "максимальное время отведенное на ход (мин)",
			room_name: "впишите название комнаты тут",
			go_to_home_page: "перейти на главную",
			go_back_to_home_page: "вернуться на главную",
			min_2_players_in_the_room: "В комнате должно быть минимум 2 игрока",
			name_3_11_characters_long: "Имя должно состоять из 3–11 символов",
			red_room: "Красная комната",
			kyiv: "Киев",
			kharkiv: "Харьков",
			odesa: "Одесса",
			myrhorod: "Миргород",
			dnipro: "Днепр",
			donetsk: "Донецк",
			zaporizhia: "Запорожье",
			zhovkva: "Жолква",
			bakota: "Бакота",
			yalta: "Ялта",
			uzhhorod: "Ужгород",
			lviv: "Львов",
			slavske: "Славское",
			mykolaiv: "Николаев",
			mariupol: "Мариуполь",
			luhansk: "Луганск",
			sevastopol: "Севастополь",
			vinnytsia: "Винница",
			makiivka: "Макеевка",
			poltava: "Полтава",
			roll_the_dice: "бросить кости",
			my_turn: "мій ход",
			throw_dice: "бросить кости",
			throw_cards: "сбросить карты",
			room_name_room: "кімната",
			end_game: "залишити гру",
			game_ended: "Игра завершена!",
			deck: "комора",
			my_character: "мій герой",
			my_happiness: "моє щастя",
			step_time_over: "Ваше время истекло!",
			switching_step: "Переход хода",
			WAITING_VOTE: "Голосуем",
			WAITING_DICE: "Бросок кубика",
			WAITING_CARD: "Выбираем карты",
			FINISHED: "Ход окончен",
			GAME_WAITING: "Ожидаем начала игры",
			GAME_FINISHED: "Игра окончена",
			GAME_CANCELLED: "Игра отменена",
			game_description_text: "about lalala",
			game_rules_text: "game rules lalalala",
			day_svjatvechir: 'holiday description',
			day_rizdvo: 'holiday description',
			day_malanki: 'holiday description',
			day_vasilja: 'holiday description',
			day_golodna_kutja: 'holiday description',
			day_vodohresha: 'holiday description',
			day_stritennja: 'holiday description',
			day_maslenica: 'holiday description',
			day_javdohi: 'holiday description',
			day_sorok_svjatih: 'holiday description',
			day_oleksi: 'holiday description',
			day_blagoveshinnja: 'holiday description',
			day_verbna_nedelja: 'holiday description',
			day_velikden: 'holiday description',
			day_ljalja: 'holiday description',
			day_jurija: 'holiday description',
			day_mikolaja_leto: 'holiday description',
			day_trijcja: 'holiday description',
			day_ivana_kupala: 'holiday description',
			day_petra_i_pavla: 'holiday description',
			day_illi: 'holiday description',
			day_makovia: 'holiday description',
			day_velikii_spas: 'holiday description',
			day_vozdvizhennja_hrista: 'holiday description',
			day_pokrova: 'holiday description',
			day_mihajla: 'holiday description',
			day_vvedenja: 'holiday description',
			day_katerini: 'holiday description',
			day_andria: 'holiday description',
			day_mikolaja_zima: 'holiday description',
			day_vechornici: 'holiday day description',
			day_yarmarok: 'holiday day description',
			day_yangel: 'holiday day description',
			day_vesillja: 'holiday day description',
			day_urodini: 'holiday day description',
			day_vhodini: 'holiday day description',
			day_buden: 'holiday day description',
			day_day: 'day not defined',
			close: 'zakrit',
			back_to_room_list: "к списку комнат",
			exit: 'Выйти из игры',
			join_room: 'войти в комнату',
		}),
	]
})
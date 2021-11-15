<template>
	<b-modal
		v-model="modalStatus"
		@hidden="modalHidden"
		:hide-header-close="true"
		footer-class="justify-content-center"
		no-close-on-esc
		no-close-on-backdrop
	>
		<b-container fluid>
			<div class="d-block text-center">
				<h4>{{ $ml.get(errorCode) }}</h4>
			</div>
		</b-container>

		<template #modal-footer>
			<b-button @click="modalHidden">
				<p class="mb-0 text-center">
					{{ $ml.get("close") }}
				</p>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "ErrorModal",

	data() {
		return {};
	},

	computed: {
		...mapState({
			modalStatus: "modalStatus",
			errorCode: "errorCode",
		}),
	},

	methods: {
		modalHidden() {
			this.$store.dispatch("setModalStatusAction", false);
		},
	},
};
</script>

<style scoped>
::v-deep .modal-header,
::v-deep .modal-footer {
	border-color: transparent;
}

::v-deep button {
	width: 160px;
	height: 40px;
	border: 0;
	border-radius: 20px;
	background-color: #35838d;
}
</style>

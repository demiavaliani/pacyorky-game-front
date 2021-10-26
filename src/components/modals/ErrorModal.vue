<template>
	<b-modal v-model="modalStatus" @hidden="modalHidden" ok-only>
		<b-container fluid>
			<div class="d-block text-center">
				<h3>Hello from My Modal!</h3>
				<h4>Error happened: {{ $ml.get(errorCode) }}</h4>
			</div>
		</b-container>
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

<style scoped></style>

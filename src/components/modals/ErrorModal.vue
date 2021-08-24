<template>
	<div>
		<b-modal v-model="modalStatus" @hidden="modalHidden">
			<div class="d-block text-center">
				<h3>Hello from My Modal!</h3>
				<h4>Error happened: {{ $ml.get(errorCode) }}</h4>
			</div>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: "ErrorModal",

	data() {
		return {
			modalStatus: false,
			errorCode: "",
		};
	},

	computed: {
		getModalStatus(status) {
			return this.$store.state.modalStatus;
		},

		getErrorCode(error_code) {
			return this.$store.state.errorCode;
		},
	},

	methods: {
		modalHidden() {
			this.$store.dispatch("setModalStatusAction", false);
		},
	},

	watch: {
		getModalStatus(status) {
			this.modalStatus = status;
		},

		getErrorCode(error_code) {
			this.errorCode = error_code;
		},
	},
};
</script>

<style scoped></style>

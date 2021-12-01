<template>
	<b-modal
		v-model="modalVisible"
		:hide-footer="footerHidden"
		:hide-header-close="headerCloseHidden"
		:hide-header="headerHidden"
		no-close-on-esc
		no-close-on-backdrop
		size="custom-size"
		centered
		ok-only
	>
		<b-container fluid>
			<b-row class="d-flex flex-column text-center">
				<b-col class="d-flex flex-row justify-content-center">
					<slot name="upper-half"> </slot>
				</b-col>
			</b-row>
		</b-container>

		<template #modal-footer>
			<slot name="footer"></slot>
		</template>
	</b-modal>
</template>

<script>
export default {
	name: "InGameModal",

	props: {
		modalVisible: { required: false },
		footerHidden: { required: false },
		headerCloseHidden: { required: false },
		headerHidden: { required: false },
	},

	data() {
		return {};
	},

	methods: {},
};
</script>

<style scoped>
::v-deep .modal-dialog {
	justify-content: center;
	max-width: none;
}

::v-deep .modal-custom-size {
	width: 50vw;
}

::v-deep .modal-content {
	border-radius: 10px;
}

::v-deep img {
	width: 100%;
}

::v-deep .modal-header {
	border-color: transparent;
}

::v-deep .modal-footer {
	display: flex;
	justify-content: center;
	border-color: transparent;
}

::v-deep button {
	width: 160px;
	height: 40px;
	border: 0;
	border-radius: 20px;
	background-color: #35838d;
}

::v-deep .close {
	background-color: transparent;
}

::v-deep a {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 270px;
	height: 40px;
	border: 0;
	border-radius: 20px;
	background-color: #35838d;
}
</style>

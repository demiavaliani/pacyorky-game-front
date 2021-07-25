<template>
	<b-container class="fixed-bottom" id="main-footer">
		<b-row class="mb-1">
			<b-col cols="4">
				<b-row cols="1">
					<b-col class="mb-1">
						<img
							src="@/assets/pacyorky-logo.png"
							class="pacyorky-logo-footer"
							style="width: 210px;"
						/>
					</b-col>
				</b-row>
			</b-col>

			<b-col class="d-flex align-items-end">
				<b-row class="d-flex align-items-center">
					<b-col lg="3" md="6" order-md="1" order-lg="0" class="py-md-1">
						<p class="text-uppercase">{{ $ml.get("about_project") }}</p>
					</b-col>

					<b-col lg="3" md="6" order-md="2" order-lg="0" class="py-md-1">
						<p class="text-uppercase">{{ $ml.get("contacts") }}</p>
					</b-col>

					<b-col lg="4" md="6" order-md="7" order-lg="0" class="py-md-1">
						<p class="text-uppercase">{{ $ml.get("sponsors") }}</p>
					</b-col>

					<div class="w-100"></div>

					<b-col lg="3" md="6" order-md="3" order-lg="0" class="py-md-1">
						<p>pacyorky.ee</p>
					</b-col>

					<b-col lg="3" md="6" order-md="4" order-lg="0" class="py-md-1">
						<p>info@pacyorky.ee</p>
					</b-col>

					<b-col lg="6" md="6" order-md="8" order-lg="0" class="py-md-1">
						<b-row class="align-items-center">
							<b-col cols="6" class="text-center">
								<img src="@/assets/footer/ministry.svg" class="ministry-logo" />
							</b-col>

							<b-col cols="3" class="text-center">
								<img src="@/assets/footer/integratsiooni.svg" class="integratsiooni-logo" />
							</b-col>

							<b-col cols="3" class="text-center">
								<img src="@/assets/footer/vodograi.png" class="vodograi-logo" />
							</b-col>
						</b-row>
					</b-col>

					<b-col lg="3" md="6" order-md="5" order-lg="0" class="py-md-1">
						<p>vodograi.ee</p>
					</b-col>

					<b-col lg="3" md="6" order-md="6" order-lg="0" class="py-md-1">
						<b-row>
							<b-col class="pr-1">
								<img src="@/assets/footer/footer-facebook.svg" style="width: 25px;" />
							</b-col>

							<b-col class="px-1">
								<img src="@/assets/footer/footer-share.svg" style="width: 20px;" />
							</b-col>

							<b-col class="pl-1">
								<img src="@/assets/footer/footer-email.svg" style="width: 25px;" />
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</b-col>
		</b-row>

		<b-row class="mb-3">
			<b-col>
				<p style="font-size: 11px;">
					{{ $ml.get("copyright_footer") }}
				</p>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	name: "MainFooter",
};
</script>

<style scoped>
p {
	margin-bottom: 0;
	font-family: "Montserrat";
	font-size: max(13px, 0.73vw);
}

@media (max-width: 991.98px) {
	.ministry-logo {
		width: 110px;
	}

	.integratsiooni-logo {
		width: 40px;
	}

	.vodograi-logo {
		width: 40px;
	}
}

@media (min-width: 992px) {
	.ministry-logo {
		width: 150px;
	}

	.integratsiooni-logo {
		width: 50px;
	}

	.vodograi-logo {
		width: 50px;
	}
}
</style>

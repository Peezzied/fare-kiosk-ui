<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {
	IonPage,
	IonContent,
	IonGrid,
	IonIcon,
	IonRow,
	IonCol,
	IonButton,
	IonBadge,
	onIonViewWillEnter,
} from "@ionic/vue";
import { locationSharp } from "ionicons/icons";

import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import StepIndicator from "@/components/StepIndicator.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import placesNova from "@/data/places_nova.json";
import placesMalinta from "@/data/places_malinta.json";
import prices from "@/data/price_params.json";
import { useSound } from "@vueuse/sound";
import enterSound from "@/assets/sounds/enter.wav";

const { play } = useSound(enterSound, { volume: 0.5 });		
enum passengerOptions {
	regular,
	senior,
	pwd,
	student,
}
interface PassengerOptions {
	type: string;
	discount: keyof typeof passengerOptions;
}

const route = useRoute();
const router = useRouter();
const i18n = useI18n();
const passenger: PassengerOptions[] = [
	{
		type: i18n.t("regular"),
		discount: "regular",
	},
	{
		type: i18n.t("pwd"),
		discount: "pwd",
	},
	{
		type: i18n.t("senior"),
		discount: "senior",
	},
	{
		type: i18n.t("student"),
		discount: "student",
	},
];

const selectedPassenger = computed(() => {
	return passenger.find((p) => p.discount === route.query.passenger);
});

const priceCalc = (passenger: keyof typeof passengerOptions): number => {
	const origin = placesMalinta.find((o) => o.name === route.query.origin) ?? {
		distance_km: 0,
	};
	const destination = placesMalinta.find(
		(o) => o.name === route.query.destination
	) ?? { distance_km: 0 };

	console.log("origin, destination", origin, destination);

	const km = Math.abs(origin.distance_km - destination.distance_km);
	console.log("km", km);

	const price = prices.find((p) => p.max_km >= km);
	console.log("price", price);

	// Ensure default value to prevent undefined error
	const regularPrice = price?.regular ?? 0;
	const discount = price?.discount_ratio ?? 0;

	// Return 0 if passenger is undefined
	if (passenger === undefined) return 0;

	const finalPrice =
		passenger === "regular"
			? regularPrice
			: regularPrice - regularPrice * discount;

	return Math.ceil(finalPrice);
};

const updatePassenger = (passengerType: keyof typeof passengerOptions) => {
	router.replace({
		query: {
			...route.query,
			passenger: passengerType,
			fare: priceCalc(passengerType),
		}, // Call priceCalc()
	});
};

onIonViewWillEnter(() => {
	updatePassenger("regular");
});
</script>

<template>
	<ion-page>
		<header-comp></header-comp>
		<ion-content :fullscreen="true">
			<ion-grid class="grid-container">
				<ion-row class="ion-justify-content-center">
					<ion-col size="12" class="space-y details">
						<div class="text-mont text-medium ion-color-secondary">
							<ion-badge
								class="text-mont text-bold text-xl ion-text-uppercase"
								style="background-color: #1b83de"
								>{{ selectedPassenger?.type }}</ion-badge
							>
							<div
								class="text-Xxl"
								style="
									line-height: 1.2;
									display: flex;
									align-items: center;
									white-space: pre;
								"
							>
								<span class="muted">Total Fare: </span
								><span>₱{{ route.query.fare }}</span>
								<!-- <ion-skeleton-text v-if="" :animated="true" class="skeleton"></ion-skeleton-text> -->
							</div>
						</div>
						<div
							class="text-4xl text-mont text-medium route-container ion-color-secondary"
						>
							<!-- <span class="muted">Route: </span> -->
							<span class="inline text-bold text-mont">
								<ion-icon
									:icon="locationSharp"
									color="tertiary-1-variant"
									class="text-6xl"
								/><span>{{ route.query.origin }}</span>
							</span>
							<span style="opacity: 0.85"> to </span>
							<span class="inline text-bold text-mont">
								<ion-icon
									:icon="locationSharp"
									color="tertiary-2-variant"
									class="text-6xl"
								/>
								<span>{{ route.query.destination }}</span>
							</span>
						</div>
						<!-- fare -->
					</ion-col>
				</ion-row>
				<ion-row class="ion-justify-content-center">
					<ion-col size="12" class="space-y">
						<h1
							class="text-body ion-color-secondary text-4xl text-medium"
						>
							Select Passenger:
						</h1>
						<div class="passengers" style="margin-top: 1.5em">
							<ion-button
								color="secondary"
								shape="round"
								size="large"
								style="letter-spacing: 0.5px"
								v-for="(i, index) in passenger"
								:class="[
									'text-mont text-2xl',
									i.discount == route.query.passenger
										? 'ion-color-warning text-medium border-sel'
										: '',
								]"
								:key="index"
								@click="updatePassenger(i.discount)"
							>
								{{ i.type }}
							</ion-button>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
		<footer-comp
			:to="
				(r) => {
					play();

					console.log(route.query);
					r.push({ name: 'transaction', query: { ...route.query } });
				}
			"
		>
			<step-indicator></step-indicator>
		</footer-comp>
	</ion-page>
</template>

<style scoped>
.grid-container {
	display: grid;
	justify-content: center; /* Centers horizontally */
	align-content: center; /* Centers vertically */
	height: 100%;
}
.center-content {
	display: grid;
	place-items: center;
	height: 100%;
}

.inline {
	display: inline-flex;
	align-items: center;
	/* gap: 6px; */
}
.route-container {
	display: flex;
	white-space: pre;
	/* vertical-align: middle; */
	align-items: center;
	margin-top: 5px;
}
.details {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}
.muted {
	opacity: 0.75;
}
.passengers {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}
.border {
	--border-color: var(--ion-color-base);
	--border-style: solid;
	--border-width: 0.5rem;
	--box-shadow: 0;
}
.border-sel {
	--border-color: var(--ion-color-warning);
	--border-style: solid;
	--border-width: 0.5rem;
	border-radius: 10em;
	box-shadow: 0 0 20px -11px var(--ion-color-warning);
	transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.skeleton {
	display: inline-block;
	width: 13%;
	height: 1em;
}
</style>

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
	IonSkeletonText
} from "@ionic/vue";
import { locationSharp } from "ionicons/icons";

import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import StepIndicator from "@/components/StepIndicator.vue";
// const props = defineProps<

// >()
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

const updatePassenger = (passengerType: keyof typeof passengerOptions) => {
	router.replace({
		query: { ...route.query, passenger: passengerType },
	});
};


</script>

<template>
	<ion-page>
		<header-comp></header-comp>
		<ion-content class="center-content">
			<ion-grid>
				<!-- destination -->
				<ion-row class="ion-justify-content-center">
					<ion-col size="11" class="space-y details">
						<div class="text-mont text-medium ion-color-secondary">
							<ion-badge
								class="text-mont text-bold text-xl ion-text-uppercase" style="background-color: #1B83DE;"
								>{{ selectedPassenger?.type }}</ion-badge
							>
							<div class="text-7xl" style="line-height: 1.2; display: flex; align-items: center; white-space: pre;">
								<span class="muted">Total Fare: </span
								><span>₱{{}}</span>
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
					<ion-col size="11" class="space-y">
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
									'text-mont text-2xl border',
									i.discount == route.query.passenger
										? 'border-sel'
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
					console.log(route.query);
					r.push({ name: 'transaction', query: { ...route.query } });
				}
			"

		><step-indicator></step-indicator></footer-comp>
	</ion-page>
</template>

<style scoped>
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
	--border-width: 7px;
	--box-shadow: 0;
}
.border-sel {
	--border-color: var(--ion-color-warning);
	--border-style: solid;
	--border-width: 7px;
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

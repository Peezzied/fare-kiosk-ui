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
} from "@ionic/vue";
import { locationSharp } from "ionicons/icons";

import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import coinImg from "@/assets/images/insert-coin.png"
import billImg from "@/assets/images/insert-bill.png"
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

</script>

<template>
	<ion-page>
		<header-comp></header-comp>
		<ion-content :fullscreen="true">
			<ion-grid class=" grid-container">
				<!-- destination -->
				<ion-row >
					<ion-col size="11" class="space-y details">
						<div class="text-mont text-medium ion-color-secondary">
							<ion-badge
								class="text-mont text-bold text-2xl ion-text-uppercase"
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
						<div class="img-container space-y">
							<img :src="coinImg" alt="" />
							<p
								class="text-2xl ion-text-center instruction text-mont text-medium ion-color-secondary flicker"
							>
								{{ $t("transaction") }}
							</p>
							<img :src="billImg" alt="" />
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
		<footer-comp
			:to="
				(r) => {
					console.log(route.query);
					r.push({ name: 'complete', query: { ...route.query } });
				}
			"
			:disabled="true"
		>
			<ion-button @click="router.push('/')" color="warning" shape="round" fill="outline" size="large" class="text-2xl text-mont text-medium cancel-btn">Cancel transaction</ion-button>
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
	--border-width: 5px;
}
.border-sel {
	--border-color: #1b83de;
	--border-style: solid;
	--border-width: 5px;
	border-radius: 10em;
	box-shadow: 0 0 20px -2px var(--ion-color-primary);
	transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.img-container {
	display: flex;
	justify-content: center; /* Center images horizontally */
	align-items: center; /* Align images vertically */
	gap: 4em;
	flex-direction: row;
	flex-wrap: nowrap;
}

.img-container img {
	height: 250px; /* Set a fixed height */
	width: auto; /* Maintain aspect ratio */
	object-fit: cover; /* Prevent distortion */
}

.img-container img:last-of-type {
	transform: scale(1.4);
}

.instruction {
	max-width: 18em;
}
@keyframes flicker {
	0% {
		opacity: 1;
	}
	/* 25% { opacity: 0.6; } */
	50% {
		opacity: 0.2;
		filter: brightness(0);
	}
	/* 75% { opacity: 0.8; } */
	100% {
		opacity: 1;
	}
}

.flicker {
	animation: flicker 1.4s infinite;
}
.cancel-btn {
	--border-width: 4px;
	--ion-color-primary: #1b83de;
	--padding-inline: 3em;
	--padding-start: var(--padding-inline);
	--padding-end: var(--padding-inline);
}
</style>

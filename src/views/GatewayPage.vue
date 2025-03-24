<script setup lang="ts">
import { useRoute } from "vue-router";
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
const passenger: PassengerOptions[] = [
	{
		type: "Regular",
		discount: "regular",
	},
	{
		type: "Person with Disability",
		discount: "pwd",
	},
	{
		type: "Senior Citizen",
		discount: "senior",
	},
	{
		type: "Student",
		discount: "student",
	},
];
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
							<ion-badge class="text-mont text-bold text-xl"
								>REGULAR</ion-badge
							>
							<div class="text-7xl" style="line-height: 1.2">
								<span class="muted">Total Fare: </span
								><span>₱{{}}</span>
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
							<span> to </span>
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
								class="text-mont text-2xl"
								style="letter-spacing: 0.5px"
								v-for="(i, index) in passenger"
								:key="index"
							>
								{{ i.type }}
							</ion-button>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
		<footer-comp to=""></footer-comp>
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
</style>

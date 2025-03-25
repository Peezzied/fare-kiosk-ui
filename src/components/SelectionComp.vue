<script setup lang="ts">
import {
	IonPage,
	IonContent,
	IonGrid,
	IonCol,
	IonRow,
	IonButton,
	IonIcon,
} from "@ionic/vue";
import { locationSharp } from "ionicons/icons";
import { getLastWord, removeLastWord } from "@/utils/lastWord";
import places from "@/data/places.json";
import { routeType } from "@/utils/routeType";
import { useRoute, useRouter } from "vue-router";

import FooterComp from "./FooterComp.vue";
import HeaderComp from "./HeaderComp.vue";
import { onMounted, ref } from "vue";

const router = useRouter();
const route = useRoute();

const optionStart = ref<number>();

const props = defineProps<{
	selectionType: routeType;
	to: string;
}>();

const selectLocation = (loc: string) => {
	switch (props.selectionType) {
		case "origin":
			router.push({ name: props.to, query: { origin: loc } });
			break;

		case "destination":{
			const passenger = route.query.passenger || 'regular'
			router.push({
				name: props.to,
				query: { ...route.query, destination: loc, passenger: passenger },
			});

			break;
		}
	}
};

onMounted(() => {
	if (props.selectionType == "destination" && route.query.origin) {
		optionStart.value = places.findIndex(
			(item) => item.name === route.query.origin
		);
	}
});
</script>

<template>
	<ion-page>
		<header-comp></header-comp>
		<ion-content :fullscreen="true">
			<ion-grid class="">
				<!-- <ion-row class="ion-justify-content-center ion-text-center">
					<ion-col size="12">
						<h1
							class="ion-color-primary text-display ion-text-uppercase text-2xl shadow-1"
						>
							{{ $t("display") }}
						</h1>
					</ion-col>
				</ion-row> -->
				<ion-row class="ion-justify-content-center">
					<ion-col size="11">
						<div class="info space-y">
							<h2
								class="text-5xl text-body text-medium text-italic ion-color-secondary shadow-1"
							>
								{{ removeLastWord($t(selectionType)) }}
								<span
									style="font-style: normal"
									:class="[
										'text-bold',
										selectionType == 'origin'
											? 'ion-color-tertiary-1-variant'
											: 'ion-color-tertiary-2-variant',
									]"
								>
									{{ getLastWord($t(selectionType)) }}</span
								>.
							</h2>
							<h2
								class="text-2xl text-mont text-medium location ion-color-secondary"
								v-if="route.query.origin"
							>
								<ion-icon
									:icon="locationSharp"
									color="tertiary-1-variant"
									class="text-4xl"
								></ion-icon>
								<span>{{ route.query.origin }}</span>
								<!-- <span> TO </span>
								<span>{{route.query.destination}}</span> -->
							</h2>
						</div>
						<div class="button-container">
							<ion-button
								:color="
									selectionType == 'origin'
										? 'tertiary-1'
										: 'tertiary-2'
								"
								v-for="(poi, index) in places"
								:disabled="
									optionStart !== undefined
										? index <= optionStart
										: false
								"
								:key="index"
								shape="round"
								size="small"
								style="letter-spacing: 0.3px"
								:class="[
									'text-2xl custom-button text-mont',
									selectionType == 'origin'
										? 'text-white'
										: 'text-black',
								]"
								@click="selectLocation(poi.name)"
								>{{ poi.name }}</ion-button
							>
						</div>
					</ion-col>
				</ion-row>
				<!-- <ion-row class="ion-justify-content-center">
					<ion-col class="navigation space-y">
						<div class="ion-activatable ripple-parent circle">
							<ion-icon
								class="text-7xl"
								color="secondary"
								:icon="chevronBackSharp"
							></ion-icon>
							<ion-ripple-effect></ion-ripple-effect>
						</div>
						<div class="ion-activatable ripple-parent circle">
							<ion-icon
								class="text-7xl"
								color="secondary"
								:icon="chevronForwardSharp"
							></ion-icon>
							<ion-ripple-effect></ion-ripple-effect>
						</div>
					</ion-col>
				</ion-row> -->
			</ion-grid>
		</ion-content>
		<footer-comp :to="(r)=>{
			r.push(to)
		}"></footer-comp>
	</ion-page>
</template>

<style scoped>
.grid-container {
	display: grid;
	justify-content: center; /* Centers horizontally */
	align-content: center; /* Centers vertically */
	height: 100vh;
}

.button-container {
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		minmax(300px, 1fr)
	); /* Responsive columns */
	gap: 10px;
	/* grid-auto-rows: 1fr;  */
}

.custom-button {
	display: flex; /* Ensures text is centered properly */
	align-items: center; /* Align text vertically */
	justify-content: center;
	text-align: center;
}

.info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.location {
	display: flex;
	align-items: center;
	gap: 5px;
}
</style>

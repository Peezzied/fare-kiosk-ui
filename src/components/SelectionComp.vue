<script setup lang="ts">
import {
	IonPage,
	IonContent,
	IonGrid,
	IonCol,
	IonRow,
	IonButton,
	IonIcon,
	IonRippleEffect,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonFooter,
} from "@ionic/vue";
import {
	chevronBackSharp,
	chevronForwardSharp,
	locationSharp,
} from "ionicons/icons";
import { getLastWord, removeLastWord } from "@/utils/lastWord";
import places from "@/data/places.json";
import { routeType } from "@/utils/routeType";
import { useRoute, useRouter } from "vue-router";
import ToasterComp from "./ToasterComp.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps<{
	selectionType: routeType;
	to: string;
}>();

const selectLocation = (loc: string) => {
	switch (props.selectionType) {
		case "origin":
			router.push({ name: props.to, query: { origin: loc } });
			break;

		case "destination":
			if (route.query.origin != loc) {
				router.push({
					name: props.to,
					query: { ...route.query, destination: loc },
				});
			}
			break;
	}
};
</script>

<template>
	<ion-page>
		<ion-header class="ion-no-border">
			<ion-toolbar>
				<ion-title
					class="space-t ion-text-center ion-color-primary text-display ion-text-uppercase text-2xl shadow-1"
					>{{ removeLastWord($t("display")) }}</ion-title
				>
			</ion-toolbar>
		</ion-header>
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
								class="text-2xl text-body location ion-color-secondary"
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
								:key="index"
								shape="round"
								size="small"
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
		<ion-footer class="ion-no-border">
			<ion-toolbar>
				<ion-row class="ion-justify-content-center">
					<ion-col size="11" class="navigation space-b">
						<div class="ion-activatable ripple-parent circle">
							<ion-icon
								class="text-7xl"
								color="secondary"
								:icon="chevronBackSharp"
								@click="router.back()"
							></ion-icon>
							<ion-ripple-effect></ion-ripple-effect>
						</div>
						<div class="ion-activatable ripple-parent circle">
							<ion-icon
								class="text-7xl"
								color="secondary"
								:icon="chevronForwardSharp"
								@click="router.push(to)"
							></ion-icon>
							<ion-ripple-effect></ion-ripple-effect>
						</div>
					</ion-col>
				</ion-row>
			</ion-toolbar>
		</ion-footer>
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
.navigation {
	display: flex;
	justify-content: space-between;
}
.info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.ripple-parent {
	position: relative;
	overflow: hidden;
	display: flex;
	padding: 12px;
	/* border: 1px solid #ddd; */
}
.circle {
	/* width: 90px; */
	/* height: 90px; */
	border-radius: 50%;
}
.location {
	display: flex;
	align-items: center;
	gap: 5px;
}
</style>

<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-grid class="ion-text-center center-grid grid-container">
				<ion-row class="ion-justify-content-center">
					<ion-col size="11">
						<h1
							class="ion-color-primary text-display ion-text-uppercase text-7xl shadow"
						>
							{{ $t("display") }}
						</h1>
					</ion-col>
				</ion-row>
				<ion-row class="ion-justify-content-center space-y">
					<ion-col size="11">
						<h2 class="ion-color-secondary text-body text-4xl">
							Language/Wika:
						</h2>
						<div class="flex space-y">
							<div
								v-for="(lang, index) in languages"
								:key="index"
							>
								<ion-button
									color="secondary"
									shape="round"
									size="large"
									expand="block"
									class="text-mont text-3xl"
									@click="changeLanguage(lang.code)"
									style="min-width: 400px"
									>{{ lang.lang }}</ion-button
								>
							</div>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import i18n from "@/i18n";
import {
	IonContent,
	IonPage,
	IonGrid,
	IonRow,
	IonCol,
	IonButton,
} from "@ionic/vue";

import { useRouter } from "vue-router";

const router = useRouter();

type SupportedLocale = keyof typeof i18n.global.messages.value;
// const currentLang = computed(() => route.params.lang as SupportedLocale);
const changeLanguage = (lang: SupportedLocale) => {
	router.push({
		name: "origin",
		params: { lang },
	});
	// console.log(lang)
};

interface locale {
	lang: string;
	code: SupportedLocale;
}

const languages: locale[] = [
	{
		lang: "English",
		code: "en",
	},
	{
		lang: "Filipino",
		code: "fil",
	},
];
</script>

<style scoped>
/* @import "tailwindcss"; */
ion-button {
	letter-spacing: 1px;
}

h1 {
	line-height: 1;
}

.flex {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

.grid-container {
	display: grid;
	justify-content: center; /* Centers horizontally */
	align-content: center; /* Centers vertically */
	height: 100vh;
}
</style>

<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-grid  class="ion-text-center center-grid grid-container">
				<ion-row class="ion-justify-content-center">
          <ion-col size="11">
            <h1 class="ion-color-primary text-display ion-text-uppercase text-7xl">{{ $t("display") }}</h1>
          </ion-col>
        </ion-row>
				<ion-row class="ion-justify-content-center space-y">
          <ion-col size="11">
            <h2 class="ion-color-secondary text-body text-4xl">Language/Wika:</h2>
            <div class="flex space-y">
              <template v-for="(lang, index) in languages" :key="index">
                <ion-button color="secondary" shape="round" size="small" expand="small" class="text-body text-4xl ion-text-capitalize" style="min-width: 400px;">{{ lang.lang }}</ion-button>
              </template>
            </div>
          </ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";

const languages = [
	{
		lang: "English",
	},
	{
		lang: "Filipino",
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
  text-shadow: 2px 2px #ff0000;
  text-shadow: 1px 4px 8px rgba(0,0,0,.1);
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

.space-y {
  margin: 1.5em 0px;
}


</style>

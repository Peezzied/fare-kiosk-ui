<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonCol, IonRow, onIonViewDidEnter } from "@ionic/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const router = useRouter();
const textArray = computed(() => {
	return t("thanks")
		.split("! ")
		.map((sentence) => sentence.trim());
});

onIonViewDidEnter(() => {
	setTimeout(() => {
		router.push({ name: "home" }); // or use { path: "/" } if you don't use named routes
	}, 6000); // 15 seconds
});
</script>

<template>
	<ion-page>
		<ion-content >
			<ion-grid>
				<ion-row class="ion-justify-content-center">
					<ion-col size="6" class="container">
						<h1
							class="ion-text-center text-display text-bold text-3xl ion-text-uppercase shadow ion-color-primary"
						>
							{{ $t("display") }}
						</h1>
						<div class="thanks space-y">
                            <h2 class="ion-color-secondary text-3xl text-body text-bold" v-for="(text, index) in textArray" :key="index">{{ text}}</h2>
                        </div>
					</ion-col>
					<ion-col size="5">
                        <img src="@/assets/images/transpo.gif" alt="">
                    </ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<style scoped>
.thanks {
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    transform: translateX(5em) scaleX(-1);
    /* transform: scaleX(-1); */
    scale: 1.4;
    
}
</style>

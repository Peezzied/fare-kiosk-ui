<script setup lang="ts">
import { removeLastWord } from '@/utils/lastWord';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
</script>


<template>
	<ion-header class="ion-no-border">
		<ion-toolbar>
			<ion-title
				class="space-t ion-text-center ion-color-primary text-display ion-text-uppercase text-2xl shadow-1"
				>{{ removeLastWord($t("display")) }}</ion-title
			>
		</ion-toolbar>
	</ion-header>
</template>

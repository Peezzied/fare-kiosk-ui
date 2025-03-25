<script setup lang="ts">
import { chevronBackSharp, chevronForwardSharp } from "ionicons/icons";
import { Router, useRouter } from "vue-router";
import {
	IonFooter,
	IonToolbar,
	IonRow,
	IonCol,
	IonRippleEffect,
	IonIcon,
} from "@ionic/vue";

const router = useRouter();

defineProps<{
	to: (to: Router) => void;
}>();

</script>

<template>
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
							@click="to(router)"
						></ion-icon>
						<ion-ripple-effect></ion-ripple-effect>
					</div>
				</ion-col>
			</ion-row>
		</ion-toolbar>
	</ion-footer>
</template>

<style scoped>
.navigation {
	display: flex;
	justify-content: space-between;
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
</style>

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
	IonButton,
} from "@ionic/vue";
const router = useRouter();

defineProps<{
	to: (to: Router) => void;
	disabled?: boolean;
}>();


</script>

<template>
	<ion-footer class="ion-no-border">
		<ion-toolbar>
			<ion-row class="ion-justify-content-center">
				<ion-col size="11" class="navigation space-b">
					<ion-button
						@click="router.back()"
						color="secondary"
						fill="clear"
						shape="round"
						class="ion-activatable ripple-parent circle"
					>
						<ion-icon
							slot="icon-only"
							class="text-7xl"
							color="secondary"
							:icon="chevronBackSharp"
						></ion-icon>
						<ion-ripple-effect></ion-ripple-effect>
					</ion-button>
					<slot></slot>
					<ion-button
						:disabled="false || disabled"
						@click="to(router)"
						color="secondary"
						fill="clear"
						shape="round"
						class="ion-activatable ripple-parent circle"
					>
						<ion-icon
							slot="icon-only"
							class="text-7xl"
							color="secondary"
							:icon="chevronForwardSharp"
						></ion-icon>
						<!-- <ion-ripple-effect></ion-ripple-effect> -->
					</ion-button>
				</ion-col>
			</ion-row>
		</ion-toolbar>
	</ion-footer>
</template>

<style scoped>
.navigation {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.ripple-parent {
	padding: 12px;
	/* border: 1px solid #ddd; */
}
.circle {
	/* width: 90px; */
	/* height: 90px; */
	border-radius: 50%;
}
</style>

<template>
	<div class="step-indicator">
		<div
			v-for="step in steps"
			:key="step.path"
			class="step"
			:class="{ active: step.step === currentStep }"
		>
			<!-- {{ step.step }} -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
	setup() {
		const route = useRoute();
		const router = useRouter();

		// Get steps from router meta
		const steps = computed(() =>
			router
				.getRoutes()
				.filter((r) => r.meta.step)
				.map((r) => ({
					step: r.meta.step,
					path: r.path,
				}))
		);

		// Get the current step
		const currentStep = computed(() => route.meta.step);

		return { steps, currentStep };
	},
});
</script>

<style scoped>
.step-indicator {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px; /* Space between circles */
	padding: 10px 0;
}

.step {
	width: 15px;
	height: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	font-weight: bold;
	color: #666;
	background: #ddd;
	border-radius: 50%; /* Makes it circular */
	transition: all 0.3s ease;
}

.step.active {
	background: #1B83DE; /* Ionic primary color */
	color: white;
}
</style>


<script setup lang="ts">
import {
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastRoot,
	ToastTitle,
} from "reka-ui";
import { ref } from "vue";

defineProps<{
	title: string;
	content: string;
}>();

// const isOpen = ref(true)
</script>

<template>
	<ToastRoot defaultOpen>
		<ToastTitle v-if="title">
			{{ title }}
		</ToastTitle>
		<ToastDescription v-if="content">
			{{ content }}
		</ToastDescription>
	
		<ToastClose aria-label="Close">
			<span aria-hidden="true">×</span>
		</ToastClose>
	</ToastRoot>
</template>

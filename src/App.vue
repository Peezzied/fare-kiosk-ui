<template>
  <ion-app>
    <ToastProvider>
      <ion-router-outlet />
    </ToastProvider>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

</script>

<style>
/* @import "tailwindcss"; */
</style>

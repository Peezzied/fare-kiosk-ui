<template>
  <ion-page>
    <!-- <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content :fullscreen="true">
      <div class="flex">
        <h1>{{ $t('display') }}</h1>
        <h2>Language/Wika:</h2>
        <div>
          <md-filled-button v-for="(lang, index) in languages" :key="index">{{lang.lang}}</md-filled-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';

const languages = [
  {
    lang: 'English',
  },
  {
    lang: 'Filipino',
  }
]
</script>

<style scoped>
@import "tailwindcss";
</style>

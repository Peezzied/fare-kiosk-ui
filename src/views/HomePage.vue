<template>
  <ion-page>
    <!-- <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content :fullscreen="true">
      <h1>{{ $t('display') }}</h1>
      <h2>Language/Wika:</h2>
      <div>
        <md-filled-button :v-for="(languages, index) in lang" :key="index"></md-filled-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
const languages = [
  {
    lang: 'en',
  },
  {
    lang: 'fil',
  }
]
</script>

<style scoped>

</style>

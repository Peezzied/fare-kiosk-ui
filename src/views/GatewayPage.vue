<script setup lang="ts">
import { useRoute } from 'vue-router';
import { IonPage, IonContent } from '@ionic/vue';
// const props = defineProps<
    
// >()

const route = useRoute()
</script>

<template>
    <ion-page>
        <ion-content>
            <!-- destination -->
            <span>{{ route.query.origin }}</span>
            <span>to</span>
            <span>{{ route.query.destination }}</span>
            <!-- fare -->
            <span>calculated fare </span><span></span>
        </ion-content>
    </ion-page>
</template>
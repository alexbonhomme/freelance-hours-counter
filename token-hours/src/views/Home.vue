<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="dark">
        <ion-title>Token Hours</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" >Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list-header color="primary">
        <ion-label>Projects</ion-label>
        <ion-button
          color="light"
          fill="outline"
          size="small"
          router-link="/project-new"
        >New project</ion-button>
      </ion-list-header>

      <ion-list>
        <ion-item router-link="/project-details">
          <ion-label>Pokémon Yellow</ion-label>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonButton
  }
});
</script>

<style scoped>

</style>
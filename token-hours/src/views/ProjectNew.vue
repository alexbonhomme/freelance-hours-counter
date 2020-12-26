<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>New project</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <form >
        <ion-item>
          <ion-label position="stacked">Token</ion-label>
          <ion-input required="true"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Description</ion-label>
          <ion-textarea></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Sold hours</ion-label>
          <ion-input type="number" required="true"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Start date</ion-label>
          <ion-datetime display-format="DD-MM-YYYY"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">End date</ion-label>
          <ion-datetime display-format="DD-MM-YYYY"></ion-datetime>
        </ion-item>

        <ion-button expand="block" @click="submit()">Save</ion-button>
      </form>
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
  IonItem,
  IonInput,
  IonTextarea,
  IonLabel,
  IonDatetime,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProjectNew',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonTextarea,
    IonLabel,
    IonDatetime,
    IonButton,
    IonButtons,
    IonBackButton
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  methods: {
    submit() {
      this.router.push('/');
    }
  }
});
</script>

<style scoped>

</style>
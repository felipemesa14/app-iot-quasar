<template>
  <div>
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="hub" color="primary"/>
      </template>
      <div class="text-h6">IoT - Internet de las cosas</div>
    </q-banner>
    <q-card class="my-card q-pa-md">
      <img
        src="https://media.istockphoto.com/photos/internet-of-things-wireless-communication-network-abstract-image-picture-id1184401187">
      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="amber" name="wb_sunny"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Luz</q-item-label>
            <q-item-label caption>{{ sensorLuz }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="opacity"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Humedad</q-item-label>
            <q-item-label caption>{{ sensorHumedad }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="device_thermostat"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Temperatura</q-item-label>
            <q-item-label caption>{{ temperatura }} &#xb0;</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="secondary" name="filter_drama"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Humedad Ambiente</q-item-label>
            <q-item-label caption>{{ humedadAmbiente }} &#xb0;</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import {getDatabase, onValue, ref} from "firebase/database";

export default defineComponent({
  name: 'ExampleComponent',
  props: {}, data() {
    return {
      humedadAmbiente: "0",
      sensorHumedad: "Poca Humedad ...",
      temperatura: "0",
      sensorLuz: "Poca Luz ..."
    };
  }, created() {
    setTimeout(() => {
      const db = getDatabase();
      const humedadAmbiente = ref(db, 'humedadAmbiente');
      onValue(humedadAmbiente, (snapshot) => {
        this.humedadAmbiente = snapshot.val();
      });

      const sensorHumedad = ref(db, 'sensorHumedad');
      onValue(sensorHumedad, (snapshot) => {
        this.sensorHumedad = snapshot.val();
      });

      const temperatura = ref(db, 'temperatura');
      onValue(temperatura, (snapshot) => {
        this.temperatura = snapshot.val();
      });

      const sensorLuz = ref(db, 'sensorLuz');
      onValue(sensorLuz, (snapshot) => {
        this.sensorLuz = snapshot.val();
      });
    }, 1000);
  }
});
</script>

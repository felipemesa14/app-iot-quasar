<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          App IoT
        </q-toolbar-title>

        <div>Juan Felipe Mesa Ocampo</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer
      elevated
      class="bg-grey-2 text-primary q-pa-md"
      color="transparent"
    >
      <q-toolbar>
        <q-tabs
          v-model="tab"
          no-caps
          dense
          inline-label
          class="absolute-bottom q-pa-sm"
        >

          <q-tab name="on"
                 class="text-positive text-center"
                 label="Encender led"
                 v-if="!ledStatus"
                 icon="highlight"
                 @click="activeInactiveLed(1)"

          />
          <q-tab name="off"
                 v-if="ledStatus"
                 label="Apagar led"
                 icon="power_off"
                 class="text-negative text-center"
                 @click="activeInactiveLed(0)"
          />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import {useDataStore} from 'stores/example-store';
import {getDatabase, ref, onValue, set} from "firebase/database";
import {defineComponent} from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  methods: {
    activeInactiveLed(status: boolean) {
      const db = getDatabase();
      set(ref(db, "ledStatus"), status);
      this.ledStatus = status;
      this.tab = status ? "on" : "off";
    },
  },
  data() {
    return {
      tab: 'on',
      ledStatus: false,
      humedadAmbiente: "0",
      sensorHumedad: "Poca humedad...",
      temperatura: "0",
      sensorLuz: "Poca Luz..."
    };
  },
  created() {
    const db = getDatabase();
    const ledStatus = ref(db, 'ledStatus');
    onValue(ledStatus, (snapshot) => {
      this.ledStatus = snapshot.val();
    });

  }
});
</script>

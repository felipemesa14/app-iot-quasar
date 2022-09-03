import {defineStore} from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    humedadAmbiente: "0",
    sensorHumedad: "No hay humedad",
    temperatura: "0",
    sensorLuz: "Poca Luz..."
  }),
  getters: {
    getHumedadAmbiente(state) {
      return state.humedadAmbiente;
    }
  },
  actions: {
    setData({
              humedadAmbiente,
              sensorHumedad,
              temperatura,
              sensorLuz
            }:
              {
                humedadAmbiente: any, sensorHumedad: any, temperatura: any, sensorLuz: any
              }) {
      this.humedadAmbiente = humedadAmbiente;
      this.sensorHumedad = sensorHumedad;
      this.temperatura = temperatura;
      this.sensorLuz = sensorLuz;
    },
  },
});

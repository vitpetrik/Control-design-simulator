<template>
  <v-row justify="center">
    <v-col cols="12" xl="12">
      <v-row justify="center">
        <v-col cols="12" sm="12" md="6" lg="4" xl="4">
          <v-card>
            <v-card-title primary-title>Zadejte parametry regulačního obvodu</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field type="number" label="K" v-model="K"></v-text-field>
              <v-text-field type="number" label="Tvz" v-model="Tvz"></v-text-field>
              <v-text-field type="number" label="Ts" v-model="Ts"></v-text-field>
              <v-text-field type="number" label="r-1" v-model="r1"></v-text-field>
              <v-text-field type="number" label="wk-1" v-model="wk1"></v-text-field>
              <v-text-field type="number" label="pocet opakovani" v-model="n"></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="8" xl="8">
          <v-card>
            <v-card-title primary-title>Grafík ❤❤</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <vue-plotly :data="positions" :layout="layout" :options="options" :auto-resize="true" ></vue-plotly>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import VuePlotly from "@statnett/vue-plotly";

export default {
  components: {
    VuePlotly
  },
  data: function() {
    return {
      data: [{ x: [1, 3], y: [2, 4] }],
      layout: {
          title: "graf"
      },
      options: {},
      K: 5,
      Tvz: 5,
      Ts: 10,
      r1: 0.2,
      wk1: 1,
      n: 25
    };
  },
  computed: {
    a() {
      return -Math.exp(-this.Tvz / this.Ts);
    },
    b() {
      return this.K * (1 - Math.exp(-this.Tvz / this.Ts));
    },
    positions() {
      let array = [{ x: [], y: [], type: 'scatter' }];
      console.log(array[0]);
      for (let i = 0; i < this.n; i++) {
        if (i == 0) {
          array[0].y.push(0);
        } else if (i == 1) {
          array[0].y.push(
            this.b * this.r1 * this.Tvz * this.wk1 -
              (this.a + this.b * this.r1 * this.Tvz - 1) * array[0].y[i - 1] +
              0
          );
        } else {
          array[0].y.push(
            this.b * this.r1 * this.Tvz * this.wk1 -
              (this.a + this.b * this.r1 * this.Tvz - 1) * array[0].y[i - 1] +
              this.a * array[0].y[i - 2]
          );
        }
        array[0].x.push(i);
      }
      return array;
    }
  }
};
</script>

<style>
</style>
<template>
  <v-app
    :style="{background: $vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}"
  >
    <v-navigation-drawer
      color="drawer_background"
      app
      v-model="drawer"
      disable-resize-watcher
      temporary
    >
      <v-list nav>
        <v-list-group no-action prepend-icon="mdi-airplane">
          <template v-slot:activator>
            <v-list-item-title>Discrete regulators</v-list-item-title>
          </template>
          <v-list-item link :to="{name: 'discrete_time'}">
            <v-list-item-icon>
              <svg width="24" height="24" :fill="$vuetify.theme.dark ? '#ffffff' : '#707070'">
                <polygon
                  points="12,6.8 0,10.8 0,17.2 5.7,17.2 5.7,12.3 12,12.3 18.3,12.3 18.3,17.2 24,17.2 24,10.8"
                />
              </svg>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Hangar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template v-slot:append>
        <v-list dense>
          <v-list-item>
            <v-select v-model="theme" label="Theme" :items="themeItems"></v-select>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar dark dense app :elevation="0" color="background">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <transition name="fade">
        <v-toolbar-title class="montserrat unselectable">Control design simulator</v-toolbar-title>
      </transition>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn icon @click="$router.go(1)">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container style="padding: 0px 15px" fluid>
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>

    <v-footer
      app
      :style="{background: $vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}"
      height="48px"
      padless
      fixed
    >
      <v-row justify="center" no-gutters>
        <v-col class="text-center montserrat unselectable" style="color: #FFFFFF" cols="12">
          <strong>Víteček Petřík</strong> 2020
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    themeItems: ["Light theme", "Dark theme", "System setting"],
  }),
  methods: {
  },
  computed: {
    theme: {
      get() {
        return this.$store.getters.theme;
      },
      set(value) {
        this.$store.commit("theme", value);
      }
    }
  }
};
</script>

<style scoped>
.v-tabs-bar.theme--dark .v-tab:not(.v-tab--active):not(.v-tab--disabled) {
  color: rgba(255, 255, 255, 1);
  opacity: 0.6;
}

.icon {
  height: 24px;
  fill: rgba(255, 255, 255, 1);
}

.no-border {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
</style>
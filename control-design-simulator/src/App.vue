<template>
  <div
    :style="{background: $vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}"
  >
    <v-fade-transition>
      <router-view ></router-view>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    themeItems: ["Dark theme", "Light theme", "System setting"],
  }),
  methods: {
    themeSettingChange(value) {
      switch (value) {
        case this.themeItems[0]:
          this.themeSwitch(true);
          break;
        case this.themeItems[1]:
          this.themeSwitch(false);
          break;
        case this.themeItems[2]:
          this.themeSwitch(
            window.matchMedia("(prefers-color-scheme: dark)").matches
          );
          break;
      }
    },
    themeSwitch(darkMode) {
      this.$vuetify.theme.dark = darkMode;
      let metaThemeColor = document.querySelector("meta[name=theme-color]");
      metaThemeColor.setAttribute("content", darkMode ? "#111111" : "#063761");
      document.body.style.backgroundColor = darkMode ? "#111111" : "#063761";
    }
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
  },
  mounted() {
    if (localStorage.theme) {
      this.theme = localStorage.theme;
    } else {
      this.theme = this.themeItems[1];
    }
    this.themeSettingChange(this.theme);

    if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      darkModeMediaQuery.addListener(() => {
        if (this.theme === this.themeItems[2])
          this.themeSwitch(darkModeMediaQuery.matches);
      });
    }
  },
  watch: {
    theme(value) {
      localStorage.theme = value;
      this.themeSettingChange(value);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in;
  transition-duration: 0.15s;
}

.fade-enter-active {
  transition-delay: 0.15s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.theme--dark.v-card {
  background-color: #151515 !important;
}

.theme--dark.v-expansion-panels .v-expansion-panel {
  background-color: #151515 !important;
}

.theme--dark.v-data-table {
  background-color: #151515 !important;
  color: #ffffff;
}

.v-tab {
  min-width: 60px !important;
}

.montserrat {
  font-family: "Montserrat", sans-serif;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.v-card__actions {
  padding: 8px 8px 16px 16px !important;
}

.v-card {
  border-radius: 10px !important;
}

.no-padding {
  padding: 0px !important;
}

.no-padding-vertical {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
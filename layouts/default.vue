<template>
  <div class="wrapper">
    <div class="content">
      <div class="columns">
        <sidenav />
        <div class="main" id="main">
          <pw-header />
          <nuxt />
          <pw-footer />
        </div>
      </div>
    </div>
  </div>
</template>

<<<<<<< HEAD
<script>
export default {
  components: {
    sidenav: () => import("~/components/layout/sidenav"),
    "pw-header": () => import("~/components/layout/header"),
    "pw-footer": () => import("~/components/layout/footer"),
  },

  beforeMount() {
=======
<style scoped lang="scss"></style>

<script lang="ts">
import Vue from 'vue';
import intializePwa from "../assets/js/pwa";
import * as version from "../.postwoman/version.json";
import { NuxtVueI18n } from 'nuxt-i18n';

export default Vue.extend({
  components: {
    logo: () => import("../components/logo.vue"),
    modal: () => import("../components/modal.vue")
  },

  methods: {
    linkActive(path: string) {
      return {
        "nuxt-link-exact-active": this.$route.path === path,
        "nuxt-link-active": this.$route.path === path
      };
    }
  },

  data() {
    return {
      // Once the PWA code is initialized, this holds a method
      // that can be called to show the user the installation
      // prompt.
      showInstallPrompt: (null as ((() => Promise<void>) | null)),
      version: {},
      showShortcuts: false,
      showSupport: false
    };
  },

  beforeMount() {
    this.version = version;

>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
    // Load theme settings
    ;(() => {
      // Apply theme from settings.
      document.documentElement.className = this.$store.state.postwoman.settings.THEME_CLASS || ""
      // Load theme color data from settings, or use default color.
      let color = this.$store.state.postwoman.settings.THEME_COLOR || "#50fa7b"
      let vibrant = this.$store.state.postwoman.settings.THEME_COLOR_VIBRANT || true
      document.documentElement.style.setProperty("--ac-color", color)
      document.documentElement.style.setProperty(
        "--act-color",
        vibrant ? "rgba(32, 33, 36, 1)" : "rgba(255, 255, 255, 1)"
      )
    })()
  },

  mounted() {
    if (process.client) {
      document.body.classList.add("afterLoad")
    }

<<<<<<< HEAD
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", this.$store.state.postwoman.settings.THEME_TAB_COLOR || "#202124")
=======
    const meta = document.querySelector("meta[name=theme-color]");

    if (meta) meta.setAttribute(
      "content",
      this.$store.state.postwoman.settings.THEME_TAB_COLOR || "#202124"
    );

    // Initializes the PWA code - checks if the app is installed,
    // etc.
    (async () => {
      this.showInstallPrompt = await intializePwa();

      let cookiesAllowed = localStorage.getItem("cookiesAllowed") === "yes";
      if (!cookiesAllowed) {
        this.$toast.show("We use cookies", {
          icon: () => "info",
          duration: 5000,
          theme: "toasted-primary",
          action: [
            {
              text: "Dismiss",
              onClick: (e, toastObject) => {
                localStorage.setItem("cookiesAllowed", "yes");
                toastObject.goAway(0);
              }
            }
          ]
        });
      }
    })();

    window.addEventListener("scroll", event => {
      let mainNavLinks = document.querySelectorAll("nav ul li a");
      let fromTop = window.scrollY;
      mainNavLinks.forEach(link => {
        let section = document.querySelector((link as any).hash);

        if (
          section &&
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("current");
        } else {
          link.classList.remove("current");
        }
      });
    });
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

    console.log(
      "%cWe ❤︎ open source!",
      "background-color:white;padding:8px 16px;border-radius:8px;font-size:32px;color:red;"
    )
    console.log(
      "%cContribute: https://github.com/liyasthomas/postwoman",
      "background-color:black;padding:4px 8px;border-radius:8px;font-size:16px;color:white;"
    )
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener)
  },
<<<<<<< HEAD
}
=======

  computed: {
    availableLocales(): NuxtVueI18n.Options.LocaleObject[] {
      const locales = this.$i18n.locales as Array<NuxtVueI18n.Options.LocaleObject>;
      if (locales) {
        return locales.filter(i => i.code !== this.$i18n.locale);
      } else return [];
    }
  }
});

>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

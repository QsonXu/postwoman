<template>
  <span class="typelink" @click="jumpToType">{{ typeString }}</span>
</template>

<style scoped lang="scss">
.typelink {
  color: var(--ac-color);
  font-family: "Roboto Mono", monospace;
  font-weight: 400;
  cursor: pointer;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    gqlType: null as any,
    // (typeName: string) => void
    jumpTypeCallback: Function,
  },

  computed: {
<<<<<<< HEAD
    typeString() {
      return this.gqlType.toString()
    },
=======
    typeString(): string {
      return (this.gqlType as any).toString();
    }
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },

  methods: {
    jumpToType() {
<<<<<<< HEAD
      this.jumpTypeCallback(this.gqlType)
    },
  },
}
=======
      this.jumpTypeCallback(this.gqlType);
    }
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

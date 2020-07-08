<template>
  <div class="field-box">
    <div class="field-title">
      {{ fieldName }}
      <span v-if="fieldArgs.length > 0">
        (
        <span v-for="(field, index) in fieldArgs" :key="index">
          {{ field.name }}:
          <typelink :gqlType="field.type" :jumpTypeCallback="jumpTypeCallback" />
          <span v-if="index !== fieldArgs.length - 1">
            ,
          </span>
        </span>
        ) </span
      >:
      <typelink :gqlType="gqlField.type" :jumpTypeCallback="jumpTypeCallback" />
    </div>
    <div class="field-desc" v-if="gqlField.description">
      {{ gqlField.description }}
    </div>

    <div class="field-deprecated" v-if="gqlField.isDeprecated">
      {{ $t("deprecated") }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.field-box {
  padding: 16px;
  margin: 4px;
  border-bottom: 1px dashed var(--brd-color);
}

.field-deprecated {
  background-color: yellow;
  color: black;
  display: inline-block;
  padding: 4px 8px;
  margin: 4px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
}

.field-desc {
  color: var(--fg-light-color);
  margin-top: 4px;
}
</style>

<<<<<<< HEAD
<script>
import typelink from "./typelink"
=======
<script lang="ts">
import Vue from "vue";
import typelink from "./typelink.vue";
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

export default Vue.extend({
  components: {
    typelink: typelink,
  },

  props: {
    gqlField: Object,
    jumpTypeCallback: Function,
  },

  computed: {
<<<<<<< HEAD
    fieldString() {
      const args = (this.gqlField.args || []).reduce(
        (acc, { name, type }, index) =>
          acc + `${name}: ${type.toString()}${index !== this.gqlField.args.length - 1 ? ", " : ""}`,
        ""
      )
      const argsString = args.length > 0 ? `(${args})` : ""
      return `${this.gqlField.name}${argsString}: ${this.gqlField.type.toString()}`
    },

    fieldName() {
      return this.gqlField.name
    },

    fieldArgs() {
      return this.gqlField.args || []
    },
  },
}
=======
    fieldString(): string {
      const args = (this.gqlField.args || []).reduce((acc: any, arg: any, index: number) => {
        return (
          acc +
          `${arg.name}: ${arg.type.toString()}${
            index !== this.gqlField.args.length - 1 ? ", " : ""
          }`
        );
      }, "");
      const argsString = args.length > 0 ? `(${args})` : "";
      return `${
        this.gqlField.name
      }${argsString}: ${this.gqlField.type.toString()}`;
    },

    fieldName(): string {
      return this.gqlField.name;
    },

    fieldArgs(): string[] {
      return this.gqlField.args || [];
    }
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

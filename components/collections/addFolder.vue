<template>
  <modal v-if="show" @close="show = false">
    <div slot="header">
      <ul>
        <li>
          <div class="flex-wrap">
            <h3 class="title">{{ $t("new_folder") }}</h3>
            <div>
              <button class="icon" @click="hideModal">
                <i class="material-icons">close</i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div slot="body">
      <ul>
        <li>
          <input
            type="text"
            v-model="name"
            :placeholder="$t('my_new_folder')"
            @keyup.enter="addNewFolder"
          />
        </li>
      </ul>
    </div>
    <div slot="footer">
      <div class="flex-wrap">
        <span></span>
        <span>
          <button class="icon" @click="hideModal">
            {{ $t("cancel") }}
          </button>
          <button class="icon primary" @click="addNewFolder">
            {{ $t("save") }}
          </button>
        </span>
      </div>
    </div>
  </modal>
</template>

<<<<<<< HEAD
<script>
import { fb } from "~/helpers/fb"

export default {
=======
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  props: {
    show: Boolean,
    collection: Object,
    collectionIndex: Number,
  },
  components: {
<<<<<<< HEAD
    modal: () => import("~/components/ui/modal"),
=======
    modal: () => import("../../components/modal.vue")
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },
  data() {
    return {
      name: undefined,
    }
  },
  methods: {
    addNewFolder() {
      this.$store.commit("postwoman/addNewFolder", {
        folder: { name: this.$data.name },
        collectionIndex: this.$props.collectionIndex,
      })
      this.hideModal()
      this.syncCollections()
    },
    syncCollections() {
      if (fb.currentUser !== null) {
        if (fb.currentSettings[0].value) {
          fb.writeCollections(JSON.parse(JSON.stringify(this.$store.state.postwoman.collections)))
        }
      }
    },
    hideModal() {
<<<<<<< HEAD
      this.$emit("hide-modal")
    },
  },
}
=======
      this.$emit("hide-modal");
    }
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

<template>
  <modal v-if="show" @close="hideModal">
    <div slot="header">
      <ul>
        <li>
          <div class="flex-wrap">
            <h3 class="title">{{ $t("edit_collection") }}</h3>
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
            :placeholder="editingCollection.name"
            @keyup.enter="saveCollection"
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
          <button class="icon primary" @click="saveCollection">
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
    editingCollection: Object,
    editingCollectionIndex: Number,
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
    syncCollections() {
      if (fb.currentUser !== null) {
        if (fb.currentSettings[0].value) {
          fb.writeCollections(JSON.parse(JSON.stringify(this.$store.state.postwoman.collections)))
        }
      }
    },
    saveCollection() {
      if (!this.$data.name) {
        this.$toast.info(this.$t("invalid_collection_name"))
        return
      }
      const collectionUpdated = {
        ...this.$props.editingCollection,
        name: this.$data.name,
      }
      this.$store.commit("postwoman/editCollection", {
        collection: collectionUpdated,
        collectionIndex: this.$props.editingCollectionIndex,
      })
      this.$emit("hide-modal")
      this.syncCollections()
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

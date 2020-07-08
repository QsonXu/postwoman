<template>
  <modal v-if="show" @close="show = false">
    <div slot="header">
      <ul>
        <li>
          <div class="flex-wrap">
            <h3 class="title">{{ $t("edit_folder") }}</h3>
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
          <input type="text" v-model="name" :placeholder="folder.name" @keyup.enter="editFolder" />
        </li>
      </ul>
    </div>
    <div slot="footer">
      <div class="flex-wrap">
        <span></span>
        <span>
<<<<<<< HEAD
          <button class="icon" @click="hideModal">
            {{ $t("cancel") }}
          </button>
          <button class="icon primary" @click="editFolder">
            {{ $t("save") }}
          </button>
=======
          <button class="icon" @click="hideModal">Cancel</button>
          <button class="icon primary" @click="editFolder">Save</button>
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
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
import Vue, { PropType } from "vue";
import { Collection, CollectionFolder as Folder } from "~/store/postwoman";

export default Vue.extend({
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  props: {
    show: Boolean,
    collection: Object as PropType<Collection>,
    collectionIndex: Number,
<<<<<<< HEAD
    folder: Object,
    folderIndex: Number,
  },
  components: {
    modal: () => import("~/components/ui/modal"),
=======
    folder: Object as PropType<Folder>,
    folderIndex: Number
  },
  components: {
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
    editFolder() {
      this.$store.commit("postwoman/editFolder", {
        collectionIndex: this.$props.collectionIndex,
        folder: { ...this.$props.folder, name: this.$data.name },
        folderIndex: this.$props.folderIndex,
      })
      this.hideModal()
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

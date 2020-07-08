<!--
TODO:
    - probably refactor and pass event arguments to modals directly without unpacking
-->

<template>
  <pw-section class="yellow" :label="$t('collections')" ref="collections">
    <addCollection :show="showModalAdd" @hide-modal="displayModalAdd(false)" />
    <editCollection
      :show="showModalEdit"
      :editingCollection="editingCollection"
      :editingCollectionIndex="editingCollectionIndex"
      @hide-modal="displayModalEdit(false)"
    />
    <addFolder
      :show="showModalAddFolder"
      :collection="editingCollection"
      :collectionIndex="editingCollectionIndex"
      @hide-modal="displayModalAddFolder(false)"
    />
    <editFolder
      :show="showModalEditFolder"
      :collection="editingCollection"
      :collectionIndex="editingCollectionIndex"
      :folder="editingFolder"
      :folderIndex="editingFolderIndex"
      @hide-modal="displayModalEditFolder(false)"
    />
    <editRequest
      :show="showModalEditRequest"
      :collectionIndex="editingCollectionIndex"
      :folderIndex="editingFolderIndex"
      :request="editingRequest"
      :requestIndex="editingRequestIndex"
      @hide-modal="displayModalEditRequest(false)"
    />
    <importExportCollections
      :show="showModalImportExport"
      @hide-modal="displayModalImportExport(false)"
    />

    <div class="flex-wrap">
      <div>
        <button class="icon" @click="displayModalAdd(true)">
          <i class="material-icons">add</i>
          <span>{{ $t("new") }}</span>
        </button>
      </div>
      <div>
        <button class="icon" @click="displayModalImportExport(true)">
          {{ $t("import_export") }}
        </button>
        <!-- <a
          href="https://github.com/liyasthomas/postwoman/wiki/Collections"
          target="_blank"
          rel="noopener"
        >
          <button class="icon" v-tooltip="'Wiki'">
            <i class="material-icons">help_outline</i>
          </button>
        </a> -->
      </div>
    </div>
    <p v-if="collections.length === 0" class="info">
      Create new collection
    </p>
    <div class="virtual-list">
      <ul>
        <li v-for="(collection, index) in collections" :key="collection.name">
          <collection
            :collection-index="index"
            :collection="collection"
            @edit-collection="editCollection(collection, index)"
            @add-folder="addFolder(collection, index)"
            @edit-folder="editFolder($event)"
            @edit-request="editRequest($event)"
          />
        </li>
        <li v-if="collections.length === 0">
          <label>Collections are empty</label>
        </li>
      </ul>
    </div>
    <nuxt-link :to="localePath('doc')" :aria-label="$t('documentation')">
      <button class="icon">
        <i class="material-icons">topic</i>
        <span>{{ $t("generate_docs") }}</span>
      </button>
    </nuxt-link>
  </pw-section>
</template>

<style scoped lang="scss">
.virtual-list {
  max-height: calc(100vh - 290px);
}

ul {
  display: flex;
  flex-direction: column;
}
</style>

<<<<<<< HEAD
<script>
import collection from "./collection"
import { fb } from "~/helpers/fb"
=======
<script lang="ts">
import Vue from "vue";
import collection from "./collection.vue";
import { Collection } from "../../store/postwoman";
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

export default Vue.extend({
  components: {
    collection,
<<<<<<< HEAD
    "pw-section": () => import("../layout/section"),
    addCollection: () => import("./addCollection"),
    addFolder: () => import("./addFolder"),
    editCollection: () => import("./editCollection"),
    editFolder: () => import("./editFolder"),
    editRequest: () => import("./editRequest"),
    importExportCollections: () => import("./importExportCollections"),
=======
    addCollection: () => import("./addCollection.vue"),
    addFolder: () => import("./addFolder.vue"),
    editCollection: () => import("./editCollection.vue"),
    editFolder: () => import("./editFolder.vue"),
    editRequest: () => import("./editRequest.vue"),
    importExportCollections: () => import("./importExportCollections.vue"),
    VirtualList: () => import("vue-virtual-scroll-list")
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },
  data() {
    return {
      showModalAdd: false,
      showModalEdit: false,
      showModalImportExport: false,
      showModalAddFolder: false,
      showModalEditFolder: false,
      showModalEditRequest: false,
<<<<<<< HEAD
      editingCollection: undefined,
      editingCollectionIndex: undefined,
      editingFolder: undefined,
      editingFolderIndex: undefined,
      editingRequest: undefined,
      editingRequestIndex: undefined,
    }
  },
  computed: {
    collections() {
      return fb.currentUser !== null
        ? fb.currentCollections
        : this.$store.state.postwoman.collections
    },
  },
  async mounted() {
    this._keyListener = function (e) {
      if (e.key === "Escape") {
        e.preventDefault()
        this.showModalAdd = this.showModalEdit = this.showModalImportExport = this.showModalAddFolder = this.showModalEditFolder = this.showModalEditRequest = false
      }
=======
      editingCollection: undefined as Collection | undefined,
      editingCollectionIndex: undefined as number | undefined,
      editingFolder: undefined as any | undefined,
      editingFolderIndex: undefined as number | undefined,
      editingRequest: undefined as any | undefined,
      editingRequestIndex: undefined as number | undefined
    };
  },
  computed: {
    collections(): Collection[] {
      return this.$store.state.postwoman.collections;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
    }
    document.addEventListener("keydown", this._keyListener.bind(this))
  },
  methods: {
<<<<<<< HEAD
    displayModalAdd(shouldDisplay) {
      this.showModalAdd = shouldDisplay
    },
    displayModalEdit(shouldDisplay) {
      this.showModalEdit = shouldDisplay
=======
    displayModalAdd(shouldDisplay: boolean) {
      this.showModalAdd = shouldDisplay;
    },
    displayModalEdit(shouldDisplay: boolean) {
      this.showModalEdit = shouldDisplay;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      if (!shouldDisplay) this.resetSelectedData()
    },
<<<<<<< HEAD
    displayModalImportExport(shouldDisplay) {
      this.showModalImportExport = shouldDisplay
    },
    displayModalAddFolder(shouldDisplay) {
      this.showModalAddFolder = shouldDisplay
=======
    displayModalImportExport(shouldDisplay: boolean) {
      this.showModalImportExport = shouldDisplay;
    },
    displayModalAddFolder(shouldDisplay: boolean) {
      this.showModalAddFolder = shouldDisplay;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      if (!shouldDisplay) this.resetSelectedData()
    },
<<<<<<< HEAD
    displayModalEditFolder(shouldDisplay) {
      this.showModalEditFolder = shouldDisplay
=======
    displayModalEditFolder(shouldDisplay: boolean) {
      this.showModalEditFolder = shouldDisplay;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      if (!shouldDisplay) this.resetSelectedData()
    },
<<<<<<< HEAD
    displayModalEditRequest(shouldDisplay) {
      this.showModalEditRequest = shouldDisplay
=======
    displayModalEditRequest(shouldDisplay: boolean) {
      this.showModalEditRequest = shouldDisplay;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      if (!shouldDisplay) this.resetSelectedData()
    },
<<<<<<< HEAD
    editCollection(collection, collectionIndex) {
      this.$data.editingCollection = collection
      this.$data.editingCollectionIndex = collectionIndex
      this.displayModalEdit(true)
      this.syncCollections()
    },
    addFolder(collection, collectionIndex) {
      this.$data.editingCollection = collection
      this.$data.editingCollectionIndex = collectionIndex
      this.displayModalAddFolder(true)
      this.syncCollections()
    },
    editFolder(payload) {
      const { collectionIndex, folder, folderIndex } = payload
      this.$data.editingCollection = collection
      this.$data.editingCollectionIndex = collectionIndex
      this.$data.editingFolder = folder
      this.$data.editingFolderIndex = folderIndex
      this.displayModalEditFolder(true)
      this.syncCollections()
    },
    editRequest(payload) {
      const { request, collectionIndex, folderIndex, requestIndex } = payload
      this.$data.editingCollectionIndex = collectionIndex
      this.$data.editingFolderIndex = folderIndex
      this.$data.editingRequest = request
      this.$data.editingRequestIndex = requestIndex
      this.displayModalEditRequest(true)
      this.syncCollections()
    },
    resetSelectedData() {
      this.$data.editingCollection = undefined
      this.$data.editingCollectionIndex = undefined
      this.$data.editingFolder = undefined
      this.$data.editingFolderIndex = undefined
      this.$data.editingRequest = undefined
      this.$data.editingRequestIndex = undefined
    },
    syncCollections() {
      if (fb.currentUser !== null) {
        if (fb.currentSettings[0].value) {
          fb.writeCollections(JSON.parse(JSON.stringify(this.$store.state.postwoman.collections)))
        }
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener)
  },
}
=======
    editCollection(collection: Collection, collectionIndex: number) {
      this.$data.editingCollection = collection;
      this.$data.editingCollectionIndex = collectionIndex;
      this.displayModalEdit(true);
    },
    addFolder(collection: Collection, collectionIndex: number) {
      this.$data.editingCollection = collection;
      this.$data.editingCollectionIndex = collectionIndex;
      this.displayModalAddFolder(true);
    },
    editFolder(payload: { collectionIndex: number, folder: any, folderIndex: number }) {
      const { collectionIndex, folder, folderIndex } = payload;
      this.$data.editingCollection = collection;
      this.$data.editingCollectionIndex = collectionIndex;
      this.$data.editingFolder = folder;
      this.$data.editingFolderIndex = folderIndex;
      this.displayModalEditFolder(true);
    },
    editRequest(payload: { request: any, collectionIndex: number, folderIndex: number, requestIndex: number }) {
      const { request, collectionIndex, folderIndex, requestIndex } = payload;
      this.$data.editingCollectionIndex = collectionIndex;
      this.$data.editingFolderIndex = folderIndex;
      this.$data.editingRequest = request;
      this.$data.editingRequestIndex = requestIndex;
      this.displayModalEditRequest(true);
    },
    resetSelectedData() {
      this.$data.editingCollection = undefined;
      this.$data.editingCollectionIndex = undefined;
      this.$data.editingFolder = undefined;
      this.$data.editingFolderIndex = undefined;
      this.$data.editingRequest = undefined;
      this.$data.editingRequestIndex = undefined;
    }
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

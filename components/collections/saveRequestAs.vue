<template>
  <modal v-if="show" @close="hideModal">
    <div slot="header">
      <ul>
        <li>
          <div class="flex-wrap">
            <h3 class="title">{{ $t("save_request_as") }}</h3>
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
          <label for="selectLabel">{{ $t("label") }}</label>
          <input
            type="text"
            id="selectLabel"
            v-model="requestData.name"
            :placeholder="defaultRequestName"
            @keyup.enter="saveRequestAs"
          />
          <label for="selectCollection">{{ $t("collection") }}</label>
          <span class="select-wrapper">
            <select type="text" id="selectCollection" v-model="requestData.collectionIndex">
<<<<<<< HEAD
              <option :key="undefined" :value="undefined" hidden disabled selected>{{
                $t("select_collection")
              }}</option>
              <option
                v-for="(collection, index) in $store.state.postwoman.collections"
=======
              <option
                :key="undefined"
                :value="undefined"
                hidden
                disabled
                selected
              >Select a Collection</option>
              <option
                v-for="(collection, index) in $store.state.postwoman
                  .collections"
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
                :key="index"
                :value="index"
              >{{ collection.name }}</option>
            </select>
          </span>
          <label for="selectFolder">{{ $t("folder") }}</label>
          <span class="select-wrapper">
            <select type="text" id="selectFolder" v-model="requestData.folderIndex">
              <option :key="undefined" :value="undefined">/</option>
<<<<<<< HEAD
              <option v-for="(folder, index) in folders" :key="index" :value="index">
                {{ folder.name }}
              </option>
=======
              <option
                v-for="(folder, index) in folders"
                :key="index"
                :value="index"
              >{{ folder.name }}</option>
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
            </select>
          </span>
          <label for="selectRequest">{{ $t("request") }}</label>
          <span class="select-wrapper">
            <select type="text" id="selectRequest" v-model="requestData.requestIndex">
              <option :key="undefined" :value="undefined">/</option>
<<<<<<< HEAD
              <option v-for="(folder, index) in requests" :key="index" :value="index">
                {{ folder.name }}
              </option>
=======
              <option
                v-for="(folder, index) in requests"
                :key="index"
                :value="index"
              >{{ folder.name }}</option>
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
            </select>
          </span>
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
          <button class="icon primary" @click="saveRequestAs">
            {{ $t("save") }}
          </button>
=======
          <button class="icon" @click="hideModal">Cancel</button>
          <button class="icon primary" @click="saveRequestAs">Save</button>
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
import Vue from "vue";
import { CollectionFolder as Folder, CollectionRequest as Request } from "~/store/postwoman";

export default Vue.extend({
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  props: {
    show: Boolean,
    editingRequest: Object,
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
      defaultRequestName: "My Request",
      requestData: {
<<<<<<< HEAD
        name: undefined,
        collectionIndex: undefined,
        folderIndex: undefined,
        requestIndex: undefined,
      },
    }
=======
        name: undefined as string | undefined,
        collectionIndex: undefined as number | undefined,
        folderIndex: undefined as number | undefined,
        requestIndex: undefined as number | undefined
      }
    };
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },
  watch: {
    "requestData.collectionIndex": function resetFolderAndRequestIndex() {
      // if user choosen some folder, than selected other collection, which doesn't have any folders
      // than `requestUpdateData.folderIndex` won't be reseted
      this.$data.requestData.folderIndex = undefined
      this.$data.requestData.requestIndex = undefined
    },
    "requestData.folderIndex": function resetRequestIndex() {
      this.$data.requestData.requestIndex = undefined
    },
    editingRequest(request) {
      this.defaultRequestName = request.label || "My Request"
    },
  },
  computed: {
<<<<<<< HEAD
    folders() {
      const userSelectedAnyCollection = this.$data.requestData.collectionIndex !== undefined
      if (!userSelectedAnyCollection) return []
=======
    folders(): Folder[] {
      const userSelectedAnyCollection =
        this.$data.requestData.collectionIndex !== undefined;
      if (!userSelectedAnyCollection) return [];
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      const noCollectionAvailable =
        this.$store.state.postwoman.collections[this.$data.requestData.collectionIndex] !==
        undefined
      if (!noCollectionAvailable) return []

      return this.$store.state.postwoman.collections[this.$data.requestData.collectionIndex].folders
    },
<<<<<<< HEAD
    requests() {
      const userSelectedAnyCollection = this.$data.requestData.collectionIndex !== undefined
      if (!userSelectedAnyCollection) return []
=======
    requests(): Request[] {
      const userSelectedAnyCollection =
        this.$data.requestData.collectionIndex !== undefined;
      if (!userSelectedAnyCollection) return [];
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      const userSelectedAnyFolder = this.$data.requestData.folderIndex !== undefined
      if (userSelectedAnyFolder) {
        const collection = this.$store.state.postwoman.collections[
          this.$data.requestData.collectionIndex
        ]
        const folder = collection.folders[this.$data.requestData.folderIndex]
        const requests = folder.requests
        return requests
      } else {
        const collection = this.$store.state.postwoman.collections[
          this.$data.requestData.collectionIndex
        ]
        const noCollectionAvailable =
          this.$store.state.postwoman.collections[this.$data.requestData.collectionIndex] !==
          undefined
        if (!noCollectionAvailable) return []

        const requests = collection.requests
        return requests
      }
    },
  },
  methods: {
    syncCollections() {
      if (fb.currentUser !== null) {
        if (fb.currentSettings[0].value) {
          fb.writeCollections(JSON.parse(JSON.stringify(this.$store.state.postwoman.collections)))
        }
      }
    },
    saveRequestAs() {
      const userDidntSpecifyCollection = this.$data.requestData.collectionIndex === undefined
      if (userDidntSpecifyCollection) {
<<<<<<< HEAD
        this.$toast.error(this.$t("select_collection"), {
          icon: "error",
        })
        return
=======
        this.$toast.error("Select a Collection", { icon: () => "error" });
        return;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
      }

      const requestUpdated = {
        ...this.$props.editingRequest,
        name: this.$data.requestData.name || this.$data.defaultRequestName,
        collection: this.$data.requestData.collectionIndex,
      }

      this.$store.commit("postwoman/saveRequestAs", {
        request: requestUpdated,
        collectionIndex: this.$data.requestData.collectionIndex,
        folderIndex: this.$data.requestData.folderIndex,
        requestIndex: this.$data.requestData.requestIndex,
      })

      this.hideModal()
      this.syncCollections()
    },
    hideModal() {
<<<<<<< HEAD
      this.$emit("hide-modal")
      this.$emit("hide-model") // for backward compatibility  // TODO: use fixed event
    },
  },
}
=======
      this.$emit("hide-modal");
      this.$emit("hide-model"); // for backward compatibility  // TODO: use fixed event
    }
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

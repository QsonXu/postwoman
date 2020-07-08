<template>
  <modal v-if="show" @close="hideModal">
    <div slot="header">
      <ul>
        <li>
          <div class="flex-wrap">
            <h3 class="title">{{ $t("edit_request") }}</h3>
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
            v-model="requestUpdateData.name"
            @keyup.enter="saveRequest"
            :placeholder="request.name"
          />
          <label for="selectCollection">{{ $t("collection") }}</label>
          <span class="select-wrapper">
            <select type="text" id="selectCollection" v-model="requestUpdateData.collectionIndex">
<<<<<<< HEAD
              <option :key="undefined" :value="undefined" hidden disabled selected>{{
                $t("current_collection")
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
              >Current Collection</option>
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
            <select type="text" id="selectFolder" v-model="requestUpdateData.folderIndex">
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
          <button class="icon primary" @click="saveRequest">
            {{ $t("save") }}
          </button>
=======
          <button class="icon" @click="hideModal">Cancel</button>
          <button class="icon primary" @click="saveRequest">Save</button>
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
import { CollectionFolder as Folder, CollectionRequest as Request } from "~/store/postwoman";

interface RequestUpdateData {
  name?: string;
  collectionIndex?: number;
  folderIndex?: number;
}

export default Vue.extend({
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  props: {
    show: Boolean,
    collectionIndex: Number,
    folderIndex: Number,
<<<<<<< HEAD
    request: Object,
    requestIndex: Number,
  },
  components: {
    modal: () => import("~/components/ui/modal"),
=======
    request: Object as PropType<Request>,
    requestIndex: Number
  },
  components: {
    modal: () => import("../../components/modal.vue")
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },
  data() {
    return <{ requestUpdateData: RequestUpdateData }>{
      requestUpdateData: {
<<<<<<< HEAD
        name: undefined,
        collectionIndex: undefined,
        folderIndex: undefined,
      },
    }
=======
        name: undefined as string | undefined,
        collectionIndex: undefined as number | undefined,
        folderIndex: undefined as number | undefined
      }
    };
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },
  watch: {
    "requestUpdateData.collectionIndex": function resetFolderIndex() {
      // if user choosen some folder, than selected other collection, which doesn't have any folders
      // than `requestUpdateData.folderIndex` won't be reseted
      this.$data.requestUpdateData.folderIndex = undefined
    },
  },
  computed: {
<<<<<<< HEAD
    folders() {
      const userSelectedAnyCollection = this.$data.requestUpdateData.collectionIndex !== undefined
      if (!userSelectedAnyCollection) return []
=======
    folders(): Folder[] {
      const userSelectedAnyCollection =
        this.$data.requestUpdateData.collectionIndex !== undefined;
      if (!userSelectedAnyCollection) return [];
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      return this.$store.state.postwoman.collections[this.$data.requestUpdateData.collectionIndex]
        .folders
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
    saveRequest() {
      const userSelectedAnyCollection = this.$data.requestUpdateData.collectionIndex !== undefined

      const requestUpdated = {
        ...this.$props.request,
        name: this.$data.requestUpdateData.name || this.$props.request.name,
        collection: userSelectedAnyCollection
          ? this.$data.requestUpdateData.collectionIndex
          : this.$props.collectionIndex,
        folder: this.$data.requestUpdateData.folderIndex,
      }

      // pass data separately to don't depend on request's collection, folder fields
      // probably, they should be deprecated because they don't describe request itself
      this.$store.commit("postwoman/editRequest", {
        requestOldCollectionIndex: this.$props.collectionIndex,
        requestOldFolderIndex: this.$props.folderIndex,
        requestOldIndex: this.$props.requestIndex,
        requestNew: requestUpdated,
        requestNewCollectionIndex: requestUpdated.collection,
        requestNewFolderIndex: requestUpdated.folder,
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

<template>
  <div>
    <div class="flex-wrap">
      <div>
        <button class="icon" @click="toggleShowChildren">
          <i class="material-icons" v-show="!showChildren">arrow_right</i>
          <i class="material-icons" v-show="showChildren">arrow_drop_down</i>
          <i class="material-icons">folder_open</i>
          <span>{{ folder.name }}</span>
        </button>
      </div>
      <v-popover>
        <button class="tooltip-target icon" v-tooltip.left="$t('more')">
          <i class="material-icons">more_vert</i>
        </button>
        <template slot="popover">
          <div>
            <button class="icon" @click="editFolder" v-close-popover>
              <i class="material-icons">edit</i>
              <span>{{ $t("edit") }}</span>
            </button>
          </div>
          <div>
            <button class="icon" @click="removeFolder" v-close-popover>
              <i class="material-icons">delete</i>
              <span>{{ $t("delete") }}</span>
            </button>
          </div>
        </template>
      </v-popover>
    </div>

    <div v-show="showChildren">
      <ul>
        <li v-for="(request, index) in folder.requests" :key="index">
          <request
            :request="request"
            :collection-index="collectionIndex"
            :folder-index="folderIndex"
            :request-index="index"
            @edit-request="
              $emit('edit-request', {
                request,
                collectionIndex,
                folderIndex,
                requestIndex: index,
              })
            "
          />
        </li>
        <li v-if="folder.requests.length === 0">
          <label>{{ $t("folder_empty") }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
}

ul li {
  display: flex;
  margin-left: 32px;
  border-left: 1px solid var(--brd-color);
}
</style>

<<<<<<< HEAD
<script>
import { fb } from "~/helpers/fb"

export default {
=======
<script lang="ts">
import Vue, { PropType } from "vue";
import { CollectionFolder as Folder, CollectionRequest as Request } from "~/store/postwoman";

export default Vue.extend({
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  props: {
    folder: Object as PropType<Folder>,
    collectionIndex: Number,
    folderIndex: Number,
  },
  components: {
<<<<<<< HEAD
    request: () => import("./request"),
=======
    request: () => import("./request.vue")
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },
  data() {
    return {
      showChildren: false,
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
    toggleShowChildren() {
      this.showChildren = !this.showChildren
    },
<<<<<<< HEAD
    selectRequest(request) {
      this.$store.commit("postwoman/selectRequest", { request })
=======
    selectRequest(request: Request) {
      this.$store.commit("postwoman/selectRequest", { request });
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
    },
    removeFolder() {
      if (!confirm("Are you sure you want to remove this folder?")) return
      this.$store.commit("postwoman/removeFolder", {
        collectionIndex: this.collectionIndex,
        folderIndex: this.folderIndex,
      })
      this.syncCollections()
    },
    editFolder() {
<<<<<<< HEAD
      this.$emit("edit-folder")
    },
  },
}
=======
      this.$emit("edit-folder");
    }
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

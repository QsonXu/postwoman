<<<<<<< HEAD:store/postwoman.js
import Vue from "vue"
=======
import Vue from "vue";
import { RequestState } from "./state";
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts

export const SETTINGS_KEYS = [
  /**
   * Whether or not to enable scrolling to a specified element, when certain
   * actions are triggered.
   */
  "SCROLL_INTO_ENABLED",

  /**
   * The CSS class that should be applied to the root element.
   * Essentially, the name of the background theme.
   */
  "THEME_CLASS",

  /**
   * The hex color code for the currently active theme.
   */
  "THEME_COLOR",

  /**
   * The hex color code for browser tab color.
   */
  "THEME_TAB_COLOR",

  /**
   * Whether or not THEME_COLOR is considered 'vibrant'.
   *
   * For readability reasons, if the THEME_COLOR is vibrant,
   * any text placed on the theme color will have its color
   * inverted from white to black.
   */
  "THEME_COLOR_VIBRANT",

  /**
   * The Ace editor theme
   */
  "THEME_ACE_EDITOR",

  /**
   * Normally, section frames are multicolored in the UI
   * to emphasise the different sections.
   * This setting allows that to be turned off.
   */
  "FRAME_COLORS_ENABLED",

  /**
   * Whether or not requests should be proxied.
   */
  "PROXY_ENABLED",

  /**
   * The URL of the proxy to connect to for requests.
   */
  "PROXY_URL",
  /**
   * The security key of the proxy.
   */
  "PROXY_KEY",

  /**
   * An array of properties to exclude from the URL.
   * e.g. 'auth'
   */
  "URL_EXCLUDES",

  /**
   * A boolean value indicating whether to use the browser extensions
   * to run the requests
   */
  "EXTENSIONS_ENABLED",
]

export interface CollectionRequest extends RequestState {
  name: string;
}

export interface CollectionFolder {
  name: string;
  requests: CollectionRequest[];
}

export interface Collection {
    name: string;
    folders: CollectionFolder[]; 
    requests: CollectionRequest[];
}
export interface CollectionState {
  settings: any;
  collections: Collection[];
  selectedRequest: RequestState | {};
  editingRequest: RequestState | {};
}

export const state = () => (<CollectionState>{
  settings: {},
  collections: [
    {
      name: "My Collection",
      folders: [],
      requests: [],
    },
  ],
  environments: [
    {
      name: "My Environment Variables",
      variables: [],
    },
  ],
  editingEnvironment: {},
  selectedRequest: {},
  editingRequest: {},
})

export const mutations = {
<<<<<<< HEAD:store/postwoman.js
  applySetting({ settings }, setting) {
    if (setting === null || !(setting instanceof Array) || setting.length !== 2) {
      throw new Error("You must provide a setting (array in the form [key, value])")
=======
  applySetting({ settings }: { settings: any }, setting: any) {
    if (
      setting === null ||
      !(setting instanceof Array) ||
      setting.length !== 2
    ) {
      throw new Error(
        "You must provide a setting (array in the form [key, value])"
      );
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts
    }

    const [key, value] = setting
    // Do not just remove this check.
    // Add your settings key to the SETTINGS_KEYS array at the
    // top of the file.
    // This is to ensure that application settings remain documented.
    if (!SETTINGS_KEYS.includes(key)) {
      throw new Error(`The settings structure does not include the key ${key}`)
    }

    settings[key] = value
  },

  removeVariables({ editingEnvironment }, value) {
    editingEnvironment.variables = value
  },

  setEditingEnvironment(state, value) {
    state.editingEnvironment = { ...value }
  },

  setVariableKey({ editingEnvironment }, { index, value }) {
    editingEnvironment.variables[index].key = value
  },

  setVariableValue({ editingEnvironment }, { index, value }) {
    editingEnvironment.variables[index].value = testValue(value)
  },

  removeVariable({ editingEnvironment }, variables) {
    editingEnvironment.variables = variables
  },

  addVariable({ editingEnvironment }, value) {
    editingEnvironment.variables.push(value)
  },

  replaceEnvironments(state, environments) {
    state.environments = environments
  },

  importAddEnvironments(state, { environments, confirmation }) {
    const duplicateEnvironment = environments.some((item) => {
      return state.environments.some((item2) => {
        return item.name.toLowerCase() === item2.name.toLowerCase()
      })
    })
    if (duplicateEnvironment) {
      this.$toast.info("Duplicate environment")
      return
    }
    state.environments = [...state.environments, ...environments]

    let index = 0
    for (let environment of state.environments) {
      environment.environmentIndex = index
      index += 1
    }
    this.$toast.info(confirmation, {
      icon: "folder_shared",
    })
  },

  removeEnvironment({ environments }, environmentIndex) {
    environments.splice(environmentIndex, 1)
  },

  saveEnvironment({ environments }, payload) {
    const { environment, environmentIndex } = payload
    const { name } = environment
    const duplicateEnvironment =
      environments.length === 1
        ? false
        : environments.some(
            (item) =>
              item.environmentIndex !== environmentIndex &&
              item.name.toLowerCase() === name.toLowerCase()
          )
    if (duplicateEnvironment) {
      this.$toast.info("Duplicate environment")
      return
    }
    environments[environmentIndex] = environment
  },

<<<<<<< HEAD:store/postwoman.js
  replaceCollections(state, collections) {
    state.collections = collections
  },

  importCollections(state, collections) {
    state.collections = [...state.collections, ...collections]
=======
  replaceCollections(state: CollectionState, collections: any[]) {
    state.collections = collections;
  },

  importCollections(state: CollectionState, collections: any[]) {
    state.collections = [...state.collections, ...collections];
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts

    let index = 0
    for (let collection of collections) {
      collection.collectionIndex = index
      index += 1
    }
  },

<<<<<<< HEAD:store/postwoman.js
  addNewCollection({ collections }, collection) {
    const { name } = collection
    const duplicateCollection = collections.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )
    if (duplicateCollection) {
      this.$toast.info("Duplicate collection")
      return
    }
=======
  addNewCollection({ collections }: { collections: Collection[] }, collection: Collection) {
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts
    collections.push({
      name: "",
      folders: [],
      requests: [],
      ...collection,
    })
  },

<<<<<<< HEAD:store/postwoman.js
  removeCollection({ collections }, payload) {
    const { collectionIndex } = payload
    collections.splice(collectionIndex, 1)
  },

  editCollection({ collections }, payload) {
    const { collection, collectionIndex } = payload
    const { name } = collection
    const duplicateCollection = collections.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )
    if (duplicateCollection) {
      this.$toast.info("Duplicate collection")
      return
    }
    collections[collectionIndex] = collection
  },

  addNewFolder({ collections }, payload) {
    const { collectionIndex, folder } = payload
=======
  removeCollection({ collections }: { collections: Collection[] }, payload: { collectionIndex: number }) {
    const { collectionIndex } = payload;
    collections.splice(collectionIndex, 1);
  },

  editCollection({ collections }: { collections: Collection[] }, payload: { collection: Collection, collectionIndex: number }) {
    const { collection, collectionIndex } = payload;
    collections[collectionIndex] = collection;
  },

  addNewFolder({ collections }: { collections: Collection[] }, payload: { collectionIndex: number, folder: any }) {
    const { collectionIndex, folder } = payload;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts
    collections[collectionIndex].folders.push({
      name: "",
      requests: [],
      ...folder,
    })
  },

<<<<<<< HEAD:store/postwoman.js
  editFolder({ collections }, payload) {
    const { collectionIndex, folder, folderIndex } = payload
    Vue.set(collections[collectionIndex].folders, folderIndex, folder)
  },

  removeFolder({ collections }, payload) {
    const { collectionIndex, folderIndex } = payload
    collections[collectionIndex].folders.splice(folderIndex, 1)
  },

  addRequest({ collections }, payload) {
    const { request } = payload
=======
  editFolder({ collections }: { collections: Collection[] }, payload: { collectionIndex: number, folder: any, folderIndex: number }) {
    const { collectionIndex, folder, folderIndex } = payload;
    Vue.set(collections[collectionIndex].folders, folderIndex, folder);
  },

  removeFolder({ collections }: { collections: Collection[] }, payload: { collectionIndex: number, folderIndex: number }) {
    const { collectionIndex, folderIndex } = payload;
    collections[collectionIndex].folders.splice(folderIndex, 1);
  },

  addRequest({ collections }: { collections: Collection[] }, payload: { request: any }) {
    const { request } = payload;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts

    // Request that is directly attached to collection
    if (request.folder === -1) {
      collections[request.collection].requests.push(request)
      return
    }

    collections[request.collection].folders[request.folder].requests.push(request)
  },

  editRequest({ collections }: { collections: Collection[] }, payload: { 
    requestOldCollectionIndex: number, 
    requestOldFolderIndex: number, 
    requestOldIndex: number,
    requestNew: any,
    requestNewCollectionIndex: number,
    requestNewFolderIndex: number
  }) {
    const {
      requestOldCollectionIndex,
      requestOldFolderIndex,
      requestOldIndex,
      requestNew,
      requestNewCollectionIndex,
      requestNewFolderIndex,
    } = payload

    const changedCollection = requestOldCollectionIndex !== requestNewCollectionIndex
    const changedFolder = requestOldFolderIndex !== requestNewFolderIndex
    const changedPlace = changedCollection || changedFolder

    // set new request
    if (requestNewFolderIndex !== undefined) {
      Vue.set(
        collections[requestNewCollectionIndex].folders[requestNewFolderIndex].requests,
        requestOldIndex,
        requestNew
      )
    } else {
      Vue.set(collections[requestNewCollectionIndex].requests, requestOldIndex, requestNew)
    }

    // remove old request
    if (changedPlace) {
      if (requestOldFolderIndex !== undefined) {
        collections[requestOldCollectionIndex].folders[requestOldFolderIndex].requests.splice(
          requestOldIndex,
          1
        )
      } else {
        collections[requestOldCollectionIndex].requests.splice(requestOldIndex, 1)
      }
    }
  },

<<<<<<< HEAD:store/postwoman.js
  saveRequestAs({ collections }, payload) {
    const { request, collectionIndex, folderIndex, requestIndex } = payload
=======
  saveRequestAs({ collections }: { collections: Collection[] }, payload: {
    request: any;
    collectionIndex: number;
    folderIndex: number;
    requestIndex: number;
  }) {
    const { request, collectionIndex, folderIndex, requestIndex } = payload;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts

    const specifiedCollection = collectionIndex !== undefined
    const specifiedFolder = folderIndex !== undefined
    const specifiedRequest = requestIndex !== undefined

    if (specifiedCollection && specifiedFolder && specifiedRequest) {
      Vue.set(collections[collectionIndex].folders[folderIndex].requests, requestIndex, request)
    } else if (specifiedCollection && specifiedFolder && !specifiedRequest) {
      const requests = collections[collectionIndex].folders[folderIndex].requests
      const lastRequestIndex = requests.length - 1
      Vue.set(requests, lastRequestIndex + 1, request)
    } else if (specifiedCollection && !specifiedFolder && specifiedRequest) {
      const requests = collections[collectionIndex].requests
      Vue.set(requests, requestIndex, request)
    } else if (specifiedCollection && !specifiedFolder && !specifiedRequest) {
      const requests = collections[collectionIndex].requests
      const lastRequestIndex = requests.length - 1
      Vue.set(requests, lastRequestIndex + 1, request)
    }
  },

<<<<<<< HEAD:store/postwoman.js
  saveRequest({ collections }, payload) {
    const { request } = payload
=======
  saveRequest({ collections }: { collections: Collection[] }, payload: { request: any }) {
    const { request } = payload;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts

    // Remove the old request from collection
    const folder =
      request.hasOwnProperty("oldFolder") && request.oldFolder >= -1
        ? request.oldFolder
        : request.folder;
    if (request.hasOwnProperty("oldCollection") && request.oldCollection > -1) {
<<<<<<< HEAD:store/postwoman.js
      const folder =
        request.hasOwnProperty("oldFolder") && request.oldFolder >= -1
          ? request.oldFolder
          : request.folder
=======
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts
      if (folder > -1) {
        collections[request.oldCollection].folders[folder].requests.splice(request.requestIndex, 1)
      } else {
        collections[request.oldCollection].requests.splice(request.requestIndex, 1)
      }
    } else if (request.hasOwnProperty("oldFolder") && request.oldFolder !== -1) {
      collections[request.collection].folders[folder].requests.splice(request.requestIndex, 1)
    }

    delete request.oldCollection
    delete request.oldFolder

    // Request that is directly attached to collection
    if (request.folder === -1) {
      Vue.set(collections[request.collection].requests, request.requestIndex, request)
      return
    }

    Vue.set(
      collections[request.collection].folders[request.folder].requests,
      request.requestIndex,
      request
    )
  },

<<<<<<< HEAD:store/postwoman.js
  removeRequest({ collections }, payload) {
    const { collectionIndex, folderIndex, requestIndex } = payload
=======
  removeRequest({ collections }: { collections: Collection[] }, payload: { collectionIndex: number, folderIndex: number, requestIndex: number }) {
    const { collectionIndex, folderIndex, requestIndex } = payload;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts

    // Request that is directly attached to collection
    if (folderIndex === -1) {
      collections[collectionIndex].requests.splice(requestIndex, 1)
      return
    }

    collections[collectionIndex].folders[folderIndex].requests.splice(requestIndex, 1)
  },

<<<<<<< HEAD:store/postwoman.js
  selectRequest(state, { request }) {
    state.selectedRequest = Object.assign({}, request)
  },
}

function testValue(myValue) {
  try {
    return JSON.parse(myValue)
  } catch (ex) {
    // Now we know it's a string just leave it as a string value.
    return myValue
=======
  selectRequest(state: CollectionState, { request }: { request: any }) {
    state.selectedRequest = Object.assign({}, request);
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:store/postwoman.ts
  }
}

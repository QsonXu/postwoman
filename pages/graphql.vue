<template>
  <div class="page">
    <div class="content">
      <div class="page-columns inner-left">
        <pw-section class="blue" :label="$t('endpoint')" ref="endpoint">
          <ul>
            <li>
              <label for="url">{{ $t("url") }}</label>
              <input
                id="url"
                type="url"
                v-model="url"
                spellcheck="false"
                @keyup.enter="getSchema()"
              />
            </li>
            <div>
              <li>
                <label for="get" class="hide-on-small-screen">&nbsp;</label>
                <button id="get" name="get" @click="getSchema">
                  {{ $t("get_schema") }}
                  <span><i class="material-icons">send</i></span>
                </button>
              </li>
            </div>
          </ul>
        </pw-section>

        <pw-section class="orange" :label="$t('headers')" ref="headers">
          <ul>
            <li>
              <div class="flex-wrap">
                <label for="headerList">{{ $t("header_list") }}</label>
                <div>
                  <button class="icon" @click="headers = []" v-tooltip.bottom="$t('clear')">
                    <i class="material-icons">clear_all</i>
                  </button>
                </div>
              </div>
              <textarea
                id="headerList"
                readonly
                v-textarea-auto-height="headerString"
                v-model="headerString"
                :placeholder="$t('add_one_header')"
                rows="1"
              ></textarea>
            </li>
          </ul>
          <ul v-for="(header, index) in headers" :key="`${header.value}_${index}`">
            <li>
              <autocomplete
                :placeholder="$t('header_count', { count: index + 1 })"
                :source="commonHeaders"
                :spellcheck="false"
                :value="header.key"
                @input="
                  $store.commit('setGQLHeaderKey', {
                    index,
                    value: $event,
                  })
                "
                autofocus
              />
            </li>
            <li>
              <input
                :placeholder="$t('value_count', { count: index + 1 })"
                :name="'value' + index"
                :value="header.value"
                @change="
                  $store.commit('setGQLHeaderValue', {
                    index,
                    value: $event.target.value,
                  })
                "
                autofocus
              />
            </li>
            <div>
              <li>
                <button
                  class="icon"
                  @click="removeRequestHeader(index)"
                  v-tooltip.bottom="$t('delete')"
                  id="header"
                >
                  <i class="material-icons">delete</i>
                </button>
              </li>
            </div>
          </ul>
          <ul>
            <li>
              <button class="icon" @click="addRequestHeader">
                <i class="material-icons">add</i>
                <span>{{ $t("add_new") }}</span>
              </button>
            </li>
          </ul>
        </pw-section>

        <pw-section class="green" :label="$t('schema')" ref="schema">
          <div class="flex-wrap">
            <label>{{ $t("schema") }}</label>
            <div v-if="schema">
              <button
                class="icon"
                @click="ToggleExpandResponse"
                ref="ToggleExpandResponse"
                v-tooltip="{
                  content: !expandResponse ? $t('expand_response') : $t('collapse_response'),
                }"
              >
                <i class="material-icons">
                  {{ !expandResponse ? "unfold_more" : "unfold_less" }}
                </i>
              </button>
              <button
                class="icon"
                @click="downloadSchema"
                ref="downloadSchema"
                v-tooltip="$t('download_file')"
              >
                <i class="material-icons">save_alt</i>
              </button>
              <button
                class="icon"
                ref="copySchemaCode"
                @click="copySchema"
                v-tooltip="$t('copy_schema')"
              >
                <i class="material-icons">content_copy</i>
              </button>
            </div>
          </div>
          <Editor
            v-if="schema"
            :value="schema"
            :lang="'graphqlschema'"
            :options="{
              maxLines: responseBodyMaxLines,
              minLines: 16,
              fontSize: '16px',
              autoScrollEditorIntoView: true,
              readOnly: true,
              showPrintMargin: false,
              useWorker: false,
            }"
          />
          <input
            v-else
            class="missing-data-response"
            :value="$t('waiting_receive_schema')"
            ref="status"
            id="status"
            name="status"
            readonly
            type="text"
          />
        </pw-section>

        <pw-section class="cyan" :label="$t('query')" ref="query">
          <div class="flex-wrap gqlRunQuery">
            <label for="gqlQuery">{{ $t("query") }}</label>
            <div>
              <button
                @click="runQuery()"
                v-tooltip.bottom="`${$t('run_query')} (${getSpecialKey()}-Enter)`"
              >
                <i class="material-icons">play_arrow</i>
              </button>
              <button
                class="icon"
                @click="copyQuery"
                ref="copyQueryButton"
                v-tooltip="$t('copy_query')"
              >
                <i class="material-icons">content_copy</i>
              </button>
              <button
                class="icon"
                @click="doPrettifyQuery"
                v-tooltip="`${$t('prettify_query')} (${getSpecialKey()}-P)`"
              >
                <i class="material-icons">photo_filter</i>
              </button>
            </div>
          </div>
          <QueryEditor
            ref="queryEditor"
            v-model="gqlQueryString"
            :onRunGQLQuery="runQuery"
            :options="{
              maxLines: responseBodyMaxLines,
              minLines: 10,
              fontSize: '16px',
              autoScrollEditorIntoView: true,
              showPrintMargin: false,
              useWorker: false,
            }"
          />
        </pw-section>

        <pw-section class="yellow" label="Variables" ref="variables">
          <Editor
            v-model="variableString"
            :lang="'json'"
            :options="{
              maxLines: 10,
              minLines: 5,
              fontSize: '16px',
              autoScrollEditorIntoView: true,
              showPrintMargin: false,
              useWorker: false,
            }"
          />
        </pw-section>

        <pw-section class="purple" label="Response" ref="response">
          <div class="flex-wrap">
            <label for="responseField">{{ $t("response") }}</label>
            <div>
              <button
                class="icon"
                @click="downloadResponse"
                ref="downloadResponse"
                v-if="response"
                v-tooltip="$t('download_file')"
              >
                <i class="material-icons">save_alt</i>
              </button>
              <button
                class="icon"
                @click="copyResponse"
                ref="copyResponseButton"
                v-if="response"
                v-tooltip="$t('copy_response')"
              >
                <i class="material-icons">content_copy</i>
              </button>
            </div>
          </div>
          <Editor
            v-if="response"
            :value="response"
            :lang="'json'"
            :lint="false"
            :options="{
              maxLines: responseBodyMaxLines,
              minLines: 10,
              fontSize: '16px',
              autoScrollEditorIntoView: true,
              readOnly: true,
              showPrintMargin: false,
              useWorker: false,
            }"
          />
          <input
            v-else
            class="missing-data-response"
            :value="$t('waiting_receive_response')"
            ref="status"
            id="status"
            name="status"
            readonly
            type="text"
          />
        </pw-section>
      </div>
      <aside class="sticky-inner inner-right">
        <pw-section class="purple" :label="$t('docs')" ref="docs">
          <section>
            <tabs ref="gqlTabs">
              <div class="gqlTabs">
                <tab
                  v-if="queryFields.length > 0"
                  :id="'queries'"
                  :label="$t('queries')"
                  :selected="true"
                >
                  <div v-for="field in queryFields" :key="field.name">
                    <gql-field :gqlField="field" :jumpTypeCallback="handleJumpToType" />
                  </div>
                </tab>

                <tab v-if="mutationFields.length > 0" :id="'mutations'" :label="$t('mutations')">
                  <div v-for="field in mutationFields" :key="field.name">
                    <gql-field :gqlField="field" :jumpTypeCallback="handleJumpToType" />
                  </div>
                </tab>

                <tab
                  v-if="subscriptionFields.length > 0"
                  :id="'subscriptions'"
                  :label="$t('subscriptions')"
                >
                  <div v-for="field in subscriptionFields" :key="field.name">
                    <gql-field :gqlField="field" :jumpTypeCallback="handleJumpToType" />
                  </div>
                </tab>

                <tab v-if="gqlTypes.length > 0" :id="'types'" :label="$t('types')" ref="typesTab">
                  <div v-for="type in gqlTypes" :key="type.name" :id="`type_${type.name}`">
                    <gql-type :gqlType="type" :jumpTypeCallback="handleJumpToType" />
                  </div>
                </tab>
              </div>
            </tabs>
          </section>

          <p
            v-if="
              queryFields.length === 0 &&
              mutationFields.length === 0 &&
              subscriptionFields.length === 0 &&
              gqlTypes.length === 0
            "
            class="info"
          >
            {{ $t("send_request_first") }}
          </p>
        </pw-section>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gqlTabs {
  max-height: calc(100vh - 192px);
  overflow: auto;
}
.gqlRunQuery {
  margin-bottom: 12px;
}
</style>

<<<<<<< HEAD
<script>
import axios from "axios"
import * as gql from "graphql"
import textareaAutoHeight from "~/directives/textareaAutoHeight"
import { commonHeaders } from "~/helpers/headers"
import AceEditor from "~/components/ui/ace-editor"
import QueryEditor from "~/components/graphql/queryeditor"
import { getPlatformSpecialKey } from "~/helpers/platformutils"
import { sendNetworkRequest } from "~/helpers/network"
=======
<script lang="ts">
import Vue from 'vue';
import axios from "axios";
import * as gql from "graphql";
import textareaAutoHeight from "../directives/textareaAutoHeight";
import AceEditor from "../components/ace-editor.vue";
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

export default Vue.extend({
  directives: {
    textareaAutoHeight,
  },
  components: {
<<<<<<< HEAD
    "pw-section": () => import("~/components/layout/section"),
    "gql-field": () => import("~/components/graphql/field"),
    "gql-type": () => import("~/components/graphql/type"),
    autocomplete: () => import("~/components/ui/autocomplete"),
    Editor: AceEditor,
    QueryEditor: QueryEditor,
    tabs: () => import("~/components/ui/tabs"),
    tab: () => import("~/components/ui/tab"),
  },
  data() {
    return {
      commonHeaders,
      queryFields: [],
      mutationFields: [],
      subscriptionFields: [],
      gqlTypes: [],
      copyButton: '<i class="material-icons">content_copy</i>',
      downloadButton: '<i class="material-icons">save_alt</i>',
=======
    "pw-section": () => import("../components/section.vue"),
    "gql-field": () => import("../components/graphql/field.vue"),
    "gql-type": () => import("../components/graphql/type.vue"),
    autocomplete: () => import("../components/autocomplete.vue"),
    Editor: AceEditor
  },
  data() {
    return {
      schemaString: "",
      commonHeaders: [
        "WWW-Authenticate",
        "Authorization",
        "Proxy-Authenticate",
        "Proxy-Authorization",
        "Age",
        "Cache-Control",
        "Clear-Site-Data",
        "Expires",
        "Pragma",
        "Warning",
        "Accept-CH",
        "Accept-CH-Lifetime",
        "Early-Data",
        "Content-DPR",
        "DPR",
        "Device-Memory",
        "Save-Data",
        "Viewport-Width",
        "Width",
        "Last-Modified",
        "ETag",
        "If-Match",
        "If-None-Match",
        "If-Modified-Since",
        "If-Unmodified-Since",
        "Vary",
        "Connection",
        "Keep-Alive",
        "Accept",
        "Accept-Charset",
        "Accept-Encoding",
        "Accept-Language",
        "Expect",
        "Max-Forwards",
        "Cookie",
        "Set-Cookie",
        "Cookie2",
        "Set-Cookie2",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Credentials",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods",
        "Access-Control-Expose-Headers",
        "Access-Control-Max-Age",
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
        "Origin",
        "Service-Worker-Allowed",
        "Timing-Allow-Origin",
        "X-Permitted-Cross-Domain-Policies",
        "DNT",
        "Tk",
        "Content-Disposition",
        "Content-Length",
        "Content-Type",
        "Content-Encoding",
        "Content-Language",
        "Content-Location",
        "Forwarded",
        "X-Forwarded-For",
        "X-Forwarded-Host",
        "X-Forwarded-Proto",
        "Via",
        "Location",
        "From",
        "Host",
        "Referer",
        "Referrer-Policy",
        "User-Agent",
        "Allow",
        "Server",
        "Accept-Ranges",
        "Range",
        "If-Range",
        "Content-Range",
        "Cross-Origin-Opener-Policy",
        "Cross-Origin-Resource-Policy",
        "Content-Security-Policy",
        "Content-Security-Policy-Report-Only",
        "Expect-CT",
        "Feature-Policy",
        "Public-Key-Pins",
        "Public-Key-Pins-Report-Only",
        "Strict-Transport-Security",
        "Upgrade-Insecure-Requests",
        "X-Content-Type-Options",
        "X-Download-Options",
        "X-Frame-Options",
        "X-Powered-By",
        "X-XSS-Protection",
        "Last-Event-ID",
        "NEL",
        "Ping-From",
        "Ping-To",
        "Report-To",
        "Transfer-Encoding",
        "TE",
        "Trailer",
        "Sec-WebSocket-Key",
        "Sec-WebSocket-Extensions",
        "Sec-WebSocket-Accept",
        "Sec-WebSocket-Protocol",
        "Sec-WebSocket-Version",
        "Accept-Push-Policy",
        "Accept-Signature",
        "Alt-Svc",
        "Date",
        "Large-Allocation",
        "Link",
        "Push-Policy",
        "Retry-After",
        "Signature",
        "Signed-Headers",
        "Server-Timing",
        "SourceMap",
        "Upgrade",
        "X-DNS-Prefetch-Control",
        "X-Firefox-Spdy",
        "X-Pingback",
        "X-Requested-With",
        "X-Robots-Tag",
        "X-UA-Compatible"
      ],
      queryFields: [] as any[],
      mutationFields: [] as any[],
      subscriptionFields: [] as any[],
      gqlTypes: [] as any[],
      responseString: "",
      copyButton: '<i class="material-icons">file_copy</i>',
      downloadButton: '<i class="material-icons">get_app</i>',
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
      doneButton: '<i class="material-icons">done</i>',
      expandResponse: false,
      responseBodyMaxLines: 16,

      settings: {
        SCROLL_INTO_ENABLED:
          typeof this.$store.state.postwoman.settings.SCROLL_INTO_ENABLED !== "undefined"
            ? this.$store.state.postwoman.settings.SCROLL_INTO_ENABLED
            : true,
      },
    }
  },
  computed: {
    url: {
<<<<<<< HEAD
      get() {
        return this.$store.state.gql.url
      },
      set(value) {
        this.$store.commit("setGQLState", { value, attribute: "url" })
      },
    },
    headers: {
      get() {
        return this.$store.state.gql.headers
      },
      set(value) {
        this.$store.commit("setGQLState", { value, attribute: "headers" })
      },
    },
    gqlQueryString: {
      get() {
        return this.$store.state.gql.query
      },
      set(value) {
        this.$store.commit("setGQLState", { value, attribute: "query" })
      },
    },
    response: {
      get() {
        return this.$store.state.gql.response
      },
      set(value) {
        this.$store.commit("setGQLState", { value, attribute: "response" })
      },
    },
    schema: {
      get() {
        return this.$store.state.gql.schema
      },
      set(value) {
        this.$store.commit("setGQLState", { value, attribute: "schema" })
      },
    },
    variableString: {
      get() {
        return this.$store.state.gql.variablesJSONString
      },
      set(value) {
        this.$store.commit("setGQLState", {
          value,
          attribute: "variablesJSONString",
        })
      },
=======
      get(): string {
        return this.$store.state.gql.url;
      },
      set(value: string) {
        this.$store.commit("setGQLState", { value, attribute: "url" });
      }
    },
    headers: {
      get(): ({ key: string, value: string })[] {
        return this.$store.state.gql.headers;
      },
      set(value: ({ key: string, value: string })[]) {
        this.$store.commit("setGQLState", { value, attribute: "headers" });
      }
    },
    variables: {
      get(): any[] {
        return this.$store.state.gql.variables;
      },
      set(value: any[]) {
        this.$store.commit("setGQLState", { value, attribute: "variables" });
      }
    },
    gqlQueryString: {
      get(): string {
        return this.$store.state.gql.query;
      },
      set(value: string) {
        this.$store.commit("setGQLState", { value, attribute: "query" });
      }
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
    },
    headerString(): string {
      const result = (this.headers as Array<{ key: string, value: string }>)
        .filter(({ key }) => !!key)
        .map(({ key, value }) => `${key}: ${value}`)
        .join(",\n")
      return result === "" ? "" : `${result}`
    },
  },
  mounted() {
    if (this.$store.state.gql.schemaIntrospection && this.$store.state.gql.schema) {
      const gqlSchema = gql.buildClientSchema(JSON.parse(this.$store.state.gql.schemaIntrospection))
      this.getDocsFromSchema(gqlSchema)
    }
  },
  methods: {
<<<<<<< HEAD
    getSpecialKey: getPlatformSpecialKey,
    doPrettifyQuery() {
      this.$refs.queryEditor.prettifyQuery()
    },
    handleJumpToType(type) {
      this.$refs.gqlTabs.selectTab(this.$refs.typesTab)
=======
    handleJumpToType(type: gql.GraphQLType) {
      const typesTab = document.getElementById("gqltypes-tab") as HTMLInputElement;
      typesTab.checked = true;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

      const rootTypeName = this.resolveRootType(type).name

      const target = document.getElementById(`type_${rootTypeName}`)
      if (target && this.settings.SCROLL_INTO_ENABLED) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    },
<<<<<<< HEAD
    resolveRootType(type) {
      let t = type
      while (t.ofType != null) t = t.ofType
      return t
    },
    copySchema() {
      this.$refs.copySchemaCode.innerHTML = this.doneButton
      const aux = document.createElement("textarea")
      aux.innerText = this.schema
      document.body.appendChild(aux)
      aux.select()
      document.execCommand("copy")
      document.body.removeChild(aux)
      this.$toast.success(this.$t("copied_to_clipboard"), {
        icon: "done",
      })
      setTimeout(() => (this.$refs.copySchemaCode.innerHTML = this.copyButton), 1000)
    },
    copyQuery() {
      this.$refs.copyQueryButton.innerHTML = this.doneButton
      const aux = document.createElement("textarea")
      aux.innerText = this.gqlQueryString
      document.body.appendChild(aux)
      aux.select()
      document.execCommand("copy")
      document.body.removeChild(aux)
      this.$toast.success(this.$t("copied_to_clipboard"), {
        icon: "done",
      })
      setTimeout(() => (this.$refs.copyQueryButton.innerHTML = this.copyButton), 1000)
    },
    copyResponse() {
      this.$refs.copyResponseButton.innerHTML = this.doneButton
      const aux = document.createElement("textarea")
      aux.innerText = this.response
      document.body.appendChild(aux)
      aux.select()
      document.execCommand("copy")
      document.body.removeChild(aux)
      this.$toast.success(this.$t("copied_to_clipboard"), {
        icon: "done",
      })
      setTimeout(() => (this.$refs.copyResponseButton.innerHTML = this.copyButton), 1000)
=======
    resolveRootType(type: any): any {
      let t = type;
      while (t.ofType && t.ofType != null) t = t.ofType;
      return t;
    },
    copySchema() {
      (this.$refs.copySchemaCode as Element).innerHTML = this.doneButton;
      const aux = document.createElement("textarea");
      aux.innerText = this.schemaString;
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$toast.success("Copied to clipboard", {
        icon: "done" as any
      });
      setTimeout(
        () => ((this.$refs.copySchemaCode as Element).innerHTML = this.copyButton),
        1000
      );
    },
    copyQuery() {
      (this.$refs.copyQueryButton as Element).innerHTML = this.doneButton;
      const aux = document.createElement("textarea");
      aux.innerText = this.gqlQueryString;
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$toast.success("Copied to clipboard", {
        icon: "done" as any
      });
      setTimeout(
        () => ((this.$refs.copyQueryButton as Element).innerHTML = this.copyButton),
        1000
      );
    },
    copyResponse() {
      (this.$refs.copyResponseButton as Element).innerHTML = this.doneButton;
      const aux = document.createElement("textarea");
      aux.innerText = this.responseString;
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$toast.success("Copied to clipboard", {
        icon: "done" as any
      });
      setTimeout(
        () => ((this.$refs.copyResponseButton as Element).innerHTML = this.copyButton),
        1000
      );
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
    },
    async runQuery() {
      const startTime = Date.now()

      // Start showing the loading bar as soon as possible.
      // The nuxt axios module will hide it when the request is made.
      this.$nuxt.$loading.start()

      this.response = this.$t("loading")
      if (this.settings.SCROLL_INTO_ENABLED) this.scrollInto("response")

      try {
<<<<<<< HEAD
        let headers = {}
        this.headers.forEach(({ key, value }) => {
          headers[key] = value
        })

        let variables = JSON.parse(this.variableString || "{}")

        const gqlQueryString = this.gqlQueryString
=======
        let headers: any = {};
        (this.headers as Array<{ key: string, value: string }>).forEach(header => {
          headers[header.key] = header.value;
        });

        let variables: any = {};
        const gqlQueryString = this.gqlQueryString;
        this.variables.forEach((variable: any) => {
          // todo: better variable type validation
          const intRex = new RegExp(`\$${variable.key}\: Int`);
          intRex.compile();
          const floatRex = new RegExp(`\$${variable.key}\: Float`);
          floatRex.compile();

          if (intRex.test(gqlQueryString)) {
            variables[variable.key] = parseInt(variable.value);
          } else if (floatRex.test(gqlQueryString)) {
            variables[variable.key] = parseFloat(variable.value);
          } else {
            variables[variable.key] = variable.value;
          }
        });
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

        const reqOptions = {
          method: "post",
          url: this.url,
          headers: {
            ...headers,
            "content-type": "application/json",
          },
<<<<<<< HEAD
          data: JSON.stringify({ query: gqlQueryString, variables }),
        }

        const data = await sendNetworkRequest(reqOptions, this.$store)
        this.response = JSON.stringify(data.data, null, 2)

        this.$nuxt.$loading.finish()
        const duration = Date.now() - startTime
        this.$toast.info(this.$t("finished_in", { duration }), {
          icon: "done",
        })
=======
          data: JSON.stringify({ query: gqlQueryString, variables })
        };

        const reqConfig = this.$store.state.postwoman.settings.PROXY_ENABLED
          ? {
              method: "post",
              url:
                this.$store.state.postwoman.settings.PROXY_URL ||
                `https://postwoman.apollotv.xyz/`,
              data: reqOptions
            }
          : reqOptions;

        const res = await axios(reqConfig as any);

        const data = this.$store.state.postwoman.settings.PROXY_ENABLED
          ? res.data
          : res;

        this.responseString = JSON.stringify(data.data, null, 2);

        this.$nuxt.$loading.finish();
        const duration = Date.now() - startTime;
        this.$toast.info(`Finished in ${duration}ms`, {
          icon: "done" as any
        });
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
      } catch (error) {
        this.response = `${error}. ${this.$t("check_console_details")}`
        this.$nuxt.$loading.finish()

<<<<<<< HEAD
        this.$toast.error(`${error} ${this.$t("f12_details")}`, {
          icon: "error",
        })
        console.log("Error", error)
=======
        this.$toast.error(error + " (F12 for details)", {
          icon: "error" as any
        });
        console.log("Error", error);
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
      }
    },

    // NOTE : schema required here is the GQL Schema document object, not the schema string
    getDocsFromSchema(schema) {
      if (schema.getQueryType()) {
        const fields = schema.getQueryType().getFields()
        const qFields = []
        for (const field in fields) {
          qFields.push(fields[field])
        }
        this.queryFields = qFields
      }

      if (schema.getMutationType()) {
        const fields = schema.getMutationType().getFields()
        const mFields = []
        for (const field in fields) {
          mFields.push(fields[field])
        }
        this.mutationFields = mFields
      }

      if (schema.getSubscriptionType()) {
        const fields = schema.getSubscriptionType().getFields()
        const sFields = []
        for (const field in fields) {
          sFields.push(fields[field])
        }
        this.subscriptionFields = sFields
      }

      const typeMap = schema.getTypeMap()
      const types = []

      const queryTypeName = schema.getQueryType() ? schema.getQueryType().name : ""
      const mutationTypeName = schema.getMutationType() ? schema.getMutationType().name : ""
      const subscriptionTypeName = schema.getSubscriptionType()
        ? schema.getSubscriptionType().name
        : ""

      for (const type in typeMap) {
        if (
          !typeMap[type].name.startsWith("__") &&
          ![queryTypeName, mutationTypeName, subscriptionTypeName].includes(typeMap[type].name) &&
          typeMap[type] instanceof gql.GraphQLObjectType
        ) {
          types.push(typeMap[type])
        }
      }
      this.gqlTypes = types
    },
    async getSchema() {
      const startTime = Date.now()

      // Start showing the loading bar as soon as possible.
      // The nuxt axios module will hide it when the request is made.
      this.$nuxt.$loading.start()

      this.schema = this.$t("loading")
      if (this.settings.SCROLL_INTO_ENABLED) this.scrollInto("schema")

      try {
        const query = JSON.stringify({
          query: gql.getIntrospectionQuery(),
        })

<<<<<<< HEAD
        let headers = {}
        this.headers.forEach(({ key, value }) => {
          headers[key] = value
        })
=======
        let headers: any = {};
        (this.headers as Array<{ key: string, value: string }>).forEach(header => {
          headers[header.key] = header.value;
        });
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e

        const reqOptions = {
          method: "post",
          url: this.url,
          headers: {
            ...headers,
            "content-type": "application/json",
          },
<<<<<<< HEAD
          data: query,
        }

        const data = await sendNetworkRequest(reqOptions, this.$store)

        const schema = gql.buildClientSchema(data.data.data)

        this.$store.commit("setGQLState", {
          value: JSON.stringify(data.data.data),
          attribute: "schemaIntrospection",
        })

        this.schema = gql.printSchema(schema, {
          commentDescriptions: true,
        })

        this.getDocsFromSchema(schema)

        this.$refs.queryEditor.setValidationSchema(schema)
        this.$nuxt.$loading.finish()
        const duration = Date.now() - startTime
        this.$toast.info(this.$t("finished_in", { duration }), {
          icon: "done",
        })
      } catch (error) {
        this.$nuxt.$loading.finish()

        this.schema = `${error}. ${this.$t("check_console_details")}`
        this.$toast.error(
          `${this.$t("graphql_introspect_failed")} ${this.$t("check_graphql_valid")}`,
          {
            icon: "error",
          }
        )
        console.log("Error", error)
=======
          data: query
        };

        // console.log(reqOptions);

        const reqConfig = this.$store.state.postwoman.settings.PROXY_ENABLED
          ? {
              method: "post",
              url:
                this.$store.state.postwoman.settings.PROXY_URL ||
                `https://postwoman.apollotv.xyz/`,
              data: reqOptions
            }
          : reqOptions;

        const res = await axios(reqConfig as any);

        const data = this.$store.state.postwoman.settings.PROXY_ENABLED
          ? res.data
          : res;

        const schema = gql.buildClientSchema(data.data.data);
        this.schemaString = gql.printSchema(schema, {
          commentDescriptions: true
        });

        const queryType = schema.getQueryType();

        if (queryType) {
          const fields = queryType.getFields();
          const qFields = [];
          for (const field in fields) {
            qFields.push(fields[field]);
          }
          this.queryFields = qFields;
        }

        const mutationType = schema.getMutationType();

        if (mutationType) {
          const fields = mutationType.getFields();
          const mFields = [];
          for (const field in fields) {
            mFields.push(fields[field]);
          }
          this.mutationFields = mFields;
        }

        const subsType = schema.getSubscriptionType();

        if (subsType) {
          const fields = subsType.getFields();
          const sFields = [];
          for (const field in fields) {
            sFields.push(fields[field]);
          }
          this.subscriptionFields = sFields;
        }

        const typeMap = schema.getTypeMap();
        const types = [];

        const queryTypeName = queryType 
          ? queryType.name
          : "";
        const mutationTypeName = mutationType 
          ? mutationType.name
          : "";
        const subscriptionTypeName = subsType 
          ? subsType.name
          : "";

        for (const type in typeMap) {
          if (
            !typeMap[type].name.startsWith("__") &&
            ![queryTypeName, mutationTypeName, subscriptionTypeName].includes(
              typeMap[type].name
            ) &&
            typeMap[type] instanceof gql.GraphQLObjectType
          ) {
            types.push(typeMap[type]);
          }
        }
        this.gqlTypes = types;

        this.$nuxt.$loading.finish();
        const duration = Date.now() - startTime;
        this.$toast.info(`Finished in ${duration}ms`, {
          icon: "done" as any
        });
      } catch (error) {
        this.$nuxt.$loading.finish();
        this.schemaString = error + ". Check console for details.";
        this.$toast.error(error + " (F12 for details)", {
          icon: "error" as any
        });
        console.log("Error", error);
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
      }
    },
    ToggleExpandResponse() {
      this.expandResponse = !this.expandResponse
      this.responseBodyMaxLines = this.responseBodyMaxLines == Infinity ? 16 : Infinity
    },
    downloadResponse() {
<<<<<<< HEAD
      const dataToWrite = this.response
      const file = new Blob([dataToWrite], { type: "application/json" })
      const a = document.createElement("a")
      const url = URL.createObjectURL(file)
      a.href = url
      a.download = `Response ${this.url} on ${Date()}.json`.replace(/\./g, "[dot]")
      document.body.appendChild(a)
      a.click()
      this.$refs.downloadResponse.innerHTML = this.doneButton
      this.$toast.success(this.$t("download_started"), {
        icon: "done",
      })
      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        this.$refs.downloadResponse.innerHTML = this.downloadButton
      }, 1000)
    },
    downloadSchema() {
      const dataToWrite = JSON.stringify(this.schema, null, 2)
      const file = new Blob([dataToWrite], { type: "application/json" })
      const a = document.createElement("a")
      const url = URL.createObjectURL(file)
      a.href = url
      a.download = `${this.url} on ${Date()}.graphql`.replace(/\./g, "[dot]")
      document.body.appendChild(a)
      a.click()
      this.$refs.downloadSchema.innerHTML = this.doneButton
      this.$toast.success(this.$t("download_started"), {
        icon: "done",
      })
      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        this.$refs.downloadSchema.innerHTML = this.downloadButton
      }, 1000)
=======
      const dataToWrite = JSON.stringify(this.schemaString, null, 2);
      const file = new Blob([dataToWrite], { type: "application/json" });
      const a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = (this.url + " on " + Date() + ".graphql").replace(
        /\./g,
        "[dot]"
      );
      document.body.appendChild(a);
      a.click();
      (this.$refs.downloadResponse as Element).innerHTML = this.doneButton;
      this.$toast.success("Download started", {
        icon: "done" as any
      });
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        (this.$refs.downloadResponse as Element).innerHTML = this.downloadButton;
      }, 1000);
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
    },
    addRequestHeader(index: number) {
      this.$store.commit("addGQLHeader", {
        key: "",
        value: "",
      })
      return false
    },
    removeRequestHeader(index: number) {
      // .slice() is used so we get a separate array, rather than just a reference
<<<<<<< HEAD
      const oldHeaders = this.headers.slice()

      this.$store.commit("removeGQLHeader", index)
      this.$toast.error(this.$t("deleted"), {
        icon: "delete",
        action: {
          text: this.$t("undo"),
          duration: 4000,
          onClick: (e, toastObject) => {
            this.headers = oldHeaders
            toastObject.remove()
          },
        },
      })
    },
    scrollInto(view) {
      this.$refs[view].$el.scrollIntoView({
        behavior: "smooth",
      })
    },
  },
  head() {
    return {
      title: `GraphQL • ${this.$store.state.name}`,
    }
  },
}
=======
      const oldHeaders = this.headers.slice();

      this.$store.commit("removeGQLHeader", index);
      this.$toast.error("Deleted", {
        icon: "delete" as any,
        duration: 4000,
        action: {
          text: "Undo",
          onClick: (e, toastObject) => {
            this.headers = oldHeaders;
            toastObject.goAway();
          }
        }
      });
      // console.log(oldHeaders);
    },
    addQueryVariable(index: number) {
      this.$store.commit("addGQLVariable", {
        key: "",
        value: ""
      });
      return false;
    },
    removeQueryVariable(index: number) {
      const oldVariables = this.variables.slice();

      this.$store.commit("removeGQLVariable", index);
      this.$toast.error("Deleted", {
        icon: "delete" as any,
        duration: 4000,
        action: {
          text: "Undo",
          onClick: (e, toastObject) => {
            this.variables = oldVariables;
            toastObject.goAway();
          }
        }
      });
      // console.log(oldVariables);
    },
    scrollInto(view: any) {
      (this.$refs[view] as Vue).$el.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

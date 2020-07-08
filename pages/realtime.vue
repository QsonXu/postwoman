<template>
  <div class="page">
    <section id="options">
      <tabs>
        <tab :id="'websocket'" :label="$t('websocket')" :selected="true">
          <websocket />
        </tab>

        <tab :id="'sse'" :label="$t('sse')">
          <sse />
        </tab>

        <tab :id="'socketio'" :label="$t('socketio')">
          <socketio />
        </tab>

        <tab :id="'mqtt'" :label="$t('mqtt')">
          <mqtt />
        </tab>
      </tabs>
    </section>
  </div>
</template>

<<<<<<< HEAD
<script>
export default {
  components: {
    "pw-section": () => import("~/components/layout/section"),
    tabs: () => import("~/components/ui/tabs"),
    tab: () => import("~/components/ui/tab"),
    websocket: () => import("~/components/realtime/websocket"),
    sse: () => import("~/components/realtime/sse"),
    socketio: () => import("~/components/realtime/socketio"),
    mqtt: () => import("~/components/realtime/mqtt"),
=======
<style scoped lang="scss">
div.log {
  margin: 4px;
  padding: 8px 16px;
  width: calc(100% - 8px);
  border-radius: 8px;
  background-color: var(--bg-dark-color);
  color: var(--fg-color);
  height: 256px;
  overflow: auto;

  &,
  span {
    font-size: 16px;
    font-family: "Roboto Mono", monospace;
    font-weight: 400;
  }

  span {
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>

<script lang="ts">
import Vue from "vue";

interface CommLog {
  payload: string; 
  source: string;
  color?: string; 
  ts?: string 
}

export default Vue.extend({
  components: {
    "pw-section": () => import("../components/section.vue")
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
  },
  head() {
    return {
<<<<<<< HEAD
      title: `Realtime • ${this.$store.state.name}`,
    }
  },
}
=======
      connectionState: false,
      url: "wss://echo.websocket.org",
      socket: null as WebSocket | null,
      communication: {
        log: [] as CommLog[],
        input: ""
      },
      connectionSSEState: false,
      server: "https://express-eventsource.herokuapp.com/events",
      sse: null as EventSource | null,
      events: {
        log: [] as CommLog[],
        input: ""
      }
    };
  },
  computed: {
    urlValid(): boolean {
      const protocol = "^(wss?:\\/\\/)?";
      const validIP = new RegExp(
        protocol +
          "(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
      );
      const validHostname = new RegExp(
        protocol +
          "(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9/])$"
      );
      return validIP.test(this.url) || validHostname.test(this.url);
    },
    serverValid(): boolean {
      const protocol = "^(https?:\\/\\/)?";
      const validIP = new RegExp(
        protocol +
          "(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
      );
      const validHostname = new RegExp(
        protocol +
          "(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9/])$"
      );
      return validIP.test(this.server) || validHostname.test(this.server);
    }
  },
  methods: {
    toggleConnection() {
      // If it is connecting:
      if (!this.connectionState) return this.connect();
      // Otherwise, it's disconnecting.
      else return this.disconnect();
    },
    connect() {
      this.communication.log = [
        {
          payload: `Connecting to ${this.url}...`,
          source: "info",
          color: "var(--ac-color)"
        }
      ];
      try {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = event => {
          this.connectionState = true;
          this.communication.log = [
            {
              payload: `Connected to ${this.url}.`,
              source: "info",
              color: "var(--ac-color)",
              ts: new Date().toLocaleTimeString()
            }
          ];
          this.$toast.success("Connected", {
            icon: "sync" as any
          });
        };
        this.socket.onerror = event => {
          this.handleError();
        };
        this.socket.onclose = event => {
          this.connectionState = false;
          this.communication.log.push({
            payload: `Disconnected from ${this.url}.`,
            source: "info",
            color: "#ff5555",
            ts: new Date().toLocaleTimeString()
          });
          this.$toast.error("Disconnected", {
            icon: "sync_disabled" as any
          });
        };
        this.socket.onmessage = event => {
          this.communication.log.push({
            payload: event.data,
            source: "server",
            ts: new Date().toLocaleTimeString()
          });
        };
      } catch (ex) {
        this.handleError(ex);
        this.$toast.error("Something went wrong!", {
          icon: "error" as any
        });
      }
    },
    disconnect() {
      if (this.socket) this.socket.close();
    },
    handleError(error?: any) {
      this.disconnect();
      this.connectionState = false;
      this.communication.log.push({
        payload: `An error has occurred.`,
        source: "info",
        color: "#ff5555",
        ts: new Date().toLocaleTimeString()
      });
      if (error !== null)
        this.communication.log.push({
          payload: error,
          source: "info",
          color: "#ff5555",
          ts: new Date().toLocaleTimeString()
        });
    },
    sendMessage() {
      const message = this.communication.input;
      if (this.socket) this.socket.send(message);
      this.communication.log.push({
        payload: message,
        source: "client",
        ts: new Date().toLocaleTimeString()
      });
      this.communication.input = "";
    },
    collapse({ target }: { target: any }) {
      const el = target.parentNode.className;
      document.getElementsByClassName(el)[0].classList.toggle("hidden");
    },
    getSourcePrefix(source: string) {
      const sourceEmojis = {
        // Source used for info messages.
        info: "\tℹ️ [INFO]:\t",
        // Source used for client to server messages.
        client: "\t👽 [SENT]:\t",
        // Source used for server to client messages.
        server: "\t📥 [RECEIVED]:\t"
      } as any;
      if (Object.keys(sourceEmojis).includes(source))
        return sourceEmojis[source];
      return "";
    },
    toggleSSEConnection() {
      // If it is connecting:
      if (!this.connectionSSEState) return this.start();
      // Otherwise, it's disconnecting.
      else return this.stop();
    },
    start() {
      this.events.log = [
        {
          payload: `Connecting to ${this.server}...`,
          source: "info",
          color: "var(--ac-color)"
        }
      ];
      if (typeof EventSource !== "undefined") {
        try {
          this.sse = new EventSource(this.server);
          this.sse.onopen = event => {
            this.connectionSSEState = true;
            this.events.log = [
              {
                payload: `Connected to ${this.server}.`,
                source: "info",
                color: "var(--ac-color)",
                ts: new Date().toLocaleTimeString()
              }
            ];
            this.$toast.success("Connected", {
              icon: "sync" as any
            });
          };
          this.sse.onerror = event => {
            this.handleSSEError();
          };
          (this.sse as any).onclose = (event: any) => {
            this.connectionSSEState = false;
            this.events.log.push({
              payload: `Disconnected from ${this.server}.`,
              source: "info",
              color: "#ff5555",
              ts: new Date().toLocaleTimeString()
            });
            this.$toast.error("Disconnected", {
              icon: "sync_disabled" as any
            });
          };
          this.sse.onmessage = event => {
            this.events.log.push({
              payload: event.data,
              source: "server",
              ts: new Date().toLocaleTimeString()
            });
          };
        } catch (ex) {
          this.handleSSEError(ex);
          this.$toast.error("Something went wrong!", {
            icon: "error" as any
          });
        }
      } else {
        this.events.log = [
          {
            payload: `This browser doesn't seems to have Server Sent Events support.`,
            source: "info",
            color: "#ff5555",
            ts: new Date().toLocaleTimeString()
          }
        ];
      }
    },
    handleSSEError(error?: any) {
      this.stop();
      this.connectionSSEState = false;
      this.events.log.push({
        payload: `An error has occurred.`,
        source: "info",
        color: "#ff5555",
        ts: new Date().toLocaleTimeString()
      });
      if (error !== null)
        this.events.log.push({
          payload: error,
          source: "info",
          color: "#ff5555",
          ts: new Date().toLocaleTimeString()
        });
    },
    stop() {
      if (this.sse) {
        (this.sse as any).onclose();
        this.sse.close();
      }
    }
  },
  updated: function() {
    this.$nextTick(function() {
      const divLog = document.getElementById("log") as Element;
      divLog.scrollBy(0, divLog.scrollHeight + 100);
    });
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e
</script>

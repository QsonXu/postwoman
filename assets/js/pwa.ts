export default () => {
  //*** Determine whether or not the PWA has been installed. ***//

  // Step 1: Check local storage
  let pwaInstalled = localStorage.getItem("pwaInstalled") === "yes"

  // Step 2: Check if the display-mode is standalone. (Only permitted for PWAs.)
  if (!pwaInstalled && window.matchMedia("(display-mode: standalone)").matches) {
    localStorage.setItem("pwaInstalled", "yes")
    pwaInstalled = true
  }

  // Step 3: Check if the navigator is in standalone mode. (Again, only permitted for PWAs.)
<<<<<<< HEAD:assets/js/pwa.js
  if (!pwaInstalled && window.navigator.standalone === true) {
    localStorage.setItem("pwaInstalled", "yes")
    pwaInstalled = true
  }

  //*** If the PWA has not been installed, show the install PWA prompt.. ***//
  let deferredPrompt = null
  window.addEventListener("beforeinstallprompt", (event) => {
    deferredPrompt = event

    // Show the install button if the prompt appeared.
    if (!pwaInstalled) {
      document.querySelector("#installPWA").style.display = "inline-flex"
=======
  interface CustomNavigotor extends Navigator {
    standalone?: boolean;
  }
  const navigator: CustomNavigotor = window.navigator;
  if (!pwaInstalled && navigator.standalone === true) {
    localStorage.setItem("pwaInstalled", "yes");
    pwaInstalled = true;
  }

  //*** If the PWA has not been installed, show the install PWA prompt.. ***//
  interface DeferredPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  function isDeferredPromptEventEvent(
    event: Event
  ): event is DeferredPromptEvent {
    return "prompt" in event;
  }

  let deferredPrompt: DeferredPromptEvent | null = null;
  window.addEventListener("beforeinstallprompt", event => {
    if (isDeferredPromptEventEvent(event)) {
      deferredPrompt = event;
    }

    // Show the install button if the prompt appeared.
    if (!pwaInstalled) {
      const installPWAElement = document.getElementById("installPWA");
      if (installPWAElement !== null) {
        installPWAElement!.style.display = "inline-flex";
      }
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/pwa.ts
    }
  })

  // When the app is installed, remove install prompts.
<<<<<<< HEAD:assets/js/pwa.js
  window.addEventListener("appinstalled", (event) => {
    localStorage.setItem("pwaInstalled", "yes")
    pwaInstalled = true
    document.getElementById("installPWA").style.display = "none"
  })

  // When the app is uninstalled, add the prompts back
  return async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      let outcome = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("Postwoman was installed successfully.")
=======
  window.addEventListener("appinstalled", _event => {
    localStorage.setItem("pwaInstalled", "yes");
    pwaInstalled = true;
    const installPWAElement = document.getElementById("installPWA");
    if (installPWAElement !== null) {
      installPWAElement.style.display = "none";
    }
  });

  // When the app is uninstalled, add the prompts back
  return async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const userChoice = await deferredPrompt.userChoice;

      if (userChoice.outcome === "accepted") {
        console.log("Postwoman was installed successfully.");
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/pwa.ts
      } else {
        console.log("Postwoman could not be installed. (Installation rejected by user.)")
      }
      deferredPrompt = null
    }
  }
}

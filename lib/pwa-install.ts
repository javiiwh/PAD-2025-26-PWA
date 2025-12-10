export function setupPWAInstallPrompt() {
    if (typeof window === "undefined") return

    let deferredPrompt: BeforeInstallPromptEvent | null = null

    window.addEventListener("beforeinstallprompt", (e: Event) => {
        const event = e as BeforeInstallPromptEvent
        event.preventDefault()
        deferredPrompt = event
    })

    window.addEventListener("appinstalled", () => {
        console.log("PWA instalada")
        deferredPrompt = null
    })

    return {
        canInstall: () => deferredPrompt !== null,
        install: async () => {
            if (!deferredPrompt) return false
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            deferredPrompt = null
            return outcome === "accepted"
        },
    }
}

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent
    }
}

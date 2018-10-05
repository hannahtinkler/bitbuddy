class Bitbuddy {
    constructor(modules) {
        this.modules = modules;

        this.triggerBoot();

        this.init = this.init.bind(this)
        this.triggerLoaded = this.triggerLoaded.bind(this)

        chrome.extension.sendMessage({}, this.init());
    }

    init() {
        this.triggerLoaded();
        this.checkReadyState = setInterval(this.triggerLoaded, 1)
    }

    triggerBoot() {
        this.modules.forEach(module => module.boot())
    }

    triggerLoaded() {
        if (document.readyState === "complete") {
            clearInterval(this.checkReadyState)
            this.modules.forEach(module => module.loaded())
        }
    }
}

export default Bitbuddy;

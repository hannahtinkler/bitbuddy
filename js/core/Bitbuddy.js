class Bitbuddy {
    constructor(modules) {
        this.modules = modules.filter(module => module.valid);

        this.init = this.init.bind(this)
        this.runModules = this.runModules.bind(this)

        this.prepareModules();

        chrome.extension.sendMessage({}, this.init());
    }

    init() {
        this.checkCanRunModules = setInterval(this.runModules, 1)
    }

    prepareModules() {
        this.modules.forEach(module => module.prepare())
    }

    runModules() {
        if (document.readyState === "complete") {
            clearInterval(this.checkCanRunModules)
            this.modules.forEach(module => module.run())
        }
    }
}

export default Bitbuddy;

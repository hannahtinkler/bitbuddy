import Eventbus from 'eventbusjs'
import ignoredFiles from './../../config/ignored-files'
import PullRequestPage from './../pages/PullRequestPage'

class DiffLoadedEvent {
    constructor() {
        this.page = new PullRequestPage

        this.valid = this.page.validate()

        if (this.valid) {
            this.hasLoaded = this.hasLoaded.bind(this)
        }
    }

    // Core
    run() {
        this.checkHasLoaded = setInterval(this.hasLoaded, 1)
    }


    // Custom
    hasLoaded() {
        let containers = document.querySelectorAll('.commentable-diff')

        if (containers.length) {
            clearInterval(this.checkHasLoaded)
            Eventbus.dispatch('diff:loaded')
        }
    }
}

export default DiffLoadedEvent

import Eventbus from 'eventbusjs'
import ignoredFiles from './../../config/ignored-files'
import PullRequestPage from './../pages/PullRequestPage'

class AutomaticallyHideWhitespaceChanges {
    constructor() {
        this.page = new PullRequestPage

        this.valid = this.page.validate()
    }

    // Core
    prepare() {
        let url = window.location.href

        if (!url.includes('w=')) {
            url += url.includes('?') ? '&w=1' : '?w=1'

            window.location.href = url
        }
    }
}

export default AutomaticallyHideWhitespaceChanges

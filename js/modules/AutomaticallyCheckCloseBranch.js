import Eventbus from 'eventbusjs'
import ignoredFiles from './../../config/ignored-files'

class AutomaticallyCheckCloseBranch {
    constructor() {
        this.valid = this.validate()
    }

    // Core
    validate() {
        return document.querySelectorAll('#id_close_anchor_branch').length
    }

    run() {
        document.getElementById('id_close_anchor_branch').checked = true
    }
}

export default AutomaticallyCheckCloseBranch

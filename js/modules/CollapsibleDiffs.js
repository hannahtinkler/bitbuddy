import Eventbus from 'eventbusjs'
import ignoredFiles from './../../config/ignored-files'
import PullRequestPage from './../pages/PullRequestPage'

class CollapsibleDiffs {
    constructor() {
        this.page = new PullRequestPage

        this.valid = this.page.validate()

        if (this.valid) {
            this.init();
        }
    }


    // Custom
    init() {
        this.expandText = '+ Expand'
        this.collapseText = '- Collapse'

        this.diffsLoaded = this.diffsLoaded.bind(this)
        this.expandContainer = this.expandContainer.bind(this)
        this.collapseContainer = this.collapseContainer.bind(this)

        Eventbus.addEventListener('diff:loaded', this.diffsLoaded)
        Eventbus.addEventListener('pullrequest:collapse-container', this.collapseContainer)
        Eventbus.addEventListener('pullrequest:expand-container', this.expandContainer)
    }

    diffsLoaded() {
        this.collapseIgnoredFiles()
        this.addCollapseButtons()
        this.addListeners()
    }

    collapseIgnoredFiles(container) {
        document.querySelectorAll('.commentable-diff').forEach(container => {
            let filename = container.getAttribute('data-identifier').split('/').pop()

            if (ignoredFiles.indexOf(filename) !== -1) {
                container.classList.add('diff-container--collapsed')
                container.setAttribute('data-collapsed', true)
            }
        })
    }

    addCollapseButtons() {
        document.querySelectorAll('.commentable-diff').forEach(container => {
            let actions = container.querySelector('.diff-actions .aui-buttons')

            let button = document.createElement('button')

            button.classList.add('js-toggle-collapse')
            button.classList.add('aui-button')
            button.classList.add('aui-button-light')
            button.innerHTML = container.getAttribute('data-collapsed') == 'true' ? this.expandText : this.collapseText;
            button.addEventListener('click', this.handleClick)

            actions.prepend(button)
        });
    }

    addListeners() {
        document.querySelectorAll('.js-collapse').forEach(button => this.handleClick)
    }

    handleClick(e) {
        let container = e.target.closest('.commentable-diff')

        if (container.getAttribute('data-collapsed') == 'true') {
            Eventbus.dispatch('pullrequest:expand-container', container, e.target)
        } else {
            Eventbus.dispatch('pullrequest:collapse-container', container, e.target)
        }
    }

    expandContainer(e, button) {
        e.target.setAttribute('data-collapsed', false)
        e.target.classList.remove('diff-container--collapsed')
        button.innerHTML = this.collapseText
    }

    collapseContainer(e, button) {
        e.target.setAttribute('data-collapsed', true)
        e.target.classList.add('diff-container--collapsed')
        button.innerHTML = this.expandText
    }
}

export default CollapsibleDiffs

import Eventbus from 'eventbusjs'
import BitbucketApi from './../core/BitbucketApi'
import PullRequestPage from './../pages/PullRequestPage'

class PullRequestFlags {
    constructor() {
        this.page = new PullRequestPage

        this.valid = this.page.validate()

        if (this.valid) {
            this.init()
        }
    }

    // Core
    prepare() {
        this.appendFlagsSection()
    }

    // Custom
    init() {
        this.api = new BitbucketApi
        this.diffsLoaded = this.diffsLoaded.bind(this)

        Eventbus.addEventListener('diff:loaded', this.diffsLoaded)

    }

    diffsLoaded() {
        this.determineValidBranchNameFlag()
        this.determineValidCommitsFlag()
        this.addTestsFlag()
        this.determineBackEndFlag()
        this.determineFrontEndFlag()
        this.determineMobileFlag()
    }

    determineValidBranchNameFlag() {
        let validBranch = this.page.branch().includes(this.page.ticket()) || this.page.branch().includes(this.page.ticket().toLowerCase())

        this.appendFlag('Branch', validBranch ? 'success' : 'error')
    }

    determineValidCommitsFlag() {
        this.api.getCommits({ repo: this.page.repo(), id: this.page.id() }, commits => {
            let validCommits = commits.reduce((carry, commit) => {
                return !commit.message.includes(this.page.ticket()) ? false : carry
            }, true)

            this.prependFlag('Commits', validCommits ? 'success' : 'error')
        })
    }

    addTestsFlag() {
        let hasTests = Array.from(document.querySelectorAll('.commentable-diff')).reduce((carry, container) => {
            return this.getFilename(container).includes('Test.php') ? true : carry
        }, false)

        this.appendFlag('Tests', hasTests ? 'success' : 'error')
    }

    determineBackEndFlag() {
        let isBackEnd = Array.from(document.querySelectorAll('.commentable-diff')).reduce((carry, container) => {
            let filename = this.getFilename(container)

            return filename.includes('.php') || filename.includes('.sql') ? true : carry
        }, false)

        isBackEnd ? this.appendFlag('Back-end', 'subtle') : null
    }

    determineFrontEndFlag() {
        let isFrontEnd = Array.from(document.querySelectorAll('.commentable-diff')).reduce((carry, container) => {
            let filename = this.getFilename(container)

            return (filename.includes('.js') && !filename.includes('.json')) || filename.includes('.html') || filename.includes('.scss') ? true : carry
        }, false)

        isFrontEnd ? this.appendFlag('Front-end', 'subtle') : null
    }

    determineMobileFlag() {
        let isMobile = Array.from(document.querySelectorAll('.commentable-diff')).reduce((carry, container) => {
            let filename = this.getFilename(container)

            return filename.includes('.ts') ? true : carry
        }, false)

        isMobile ? this.appendFlag('Mobile', 'subtle') : null
    }

    prependFlag(text, type) {
        document.querySelector('.js-flags').innerHTML = this.getFlagContent(text, type) + document.querySelector('.js-flags').innerHTML
    }

    appendFlag(text, type) {
        document.querySelector('.js-flags').innerHTML += this.getFlagContent(text, type)
    }

    appendFlagsSection() {
        document.querySelector('#pull-request-diff-header dl').innerHTML +=
            `<div class="pull-request-summary">
                <dt></dt>
                <dd class="pull-request-summary__content js-flags"></dd>
            </div`
    }

    getFlagContent(text, type) {
        return `<span class="pull-request-flag aui-lozenge aui-lozenge-${ type }">${ this.getSymbol(type) } ${ text }</span>`
    }

    getFilename(element) {
        return element.getAttribute('data-identifier').split('/').pop()
    }

    getSymbol(type) {
        let symbols = {
            success: '✓',
            error: '✗',
            subtle: '★',
        }

        return symbols[type]
    }
}

export default PullRequestFlags;

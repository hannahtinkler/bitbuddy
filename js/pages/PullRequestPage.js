class PullRequestPage {
    constructor() {
        this.elements = {}
    }

    validate() {
        return document.querySelectorAll('.pull-request-self-link').length
    }

    id() {
        if (!this.elements.id) {
            this.elements.id = document.querySelector('#pullrequest').getAttribute('data-local-id')
                ? document.querySelector('#pullrequest').getAttribute('data-local-id')
                : 'NO PR ID'
        }

        return this.elements.id
    }

    repo() {
        if (!this.elements.repo) {
            let element = document.querySelector('.compare-widget:first-child')

            this.elements.repo = element
                ? element.getAttribute('data-repo-url').split('/')[2]
                : 'NO REPO'
        }

        return this.elements.repo
    }

    branch() {
        if (!this.elements.branch) {
            this.elements.branch = document.querySelector('.compare-widget:first-child')
                ? document.querySelector('.compare-widget:first-child').getAttribute('data-branch-name')
                : 'NO BRANCH'
        }

        return this.elements.branch
    }

    destination() {
        if (!this.elements.destination) {
            this.elements.destination = document.querySelector('.compare-widget:nth-child(2)')
                ? document.querySelector('.compare-widget:nth-child(2)').getAttribute('data-branch-name')
                : 'NO BRANCH'
        }

        return this.elements.destination
    }

    ticket() {
        if (!this.elements.ticket) {
            this.elements.ticket = document.querySelector('.detail-summary--item--link span')
                ? document.querySelector('.detail-summary--item--link span').innerHTML
                : 'NO JIRA TICKET'
        }

        return this.elements.ticket
    }

    summary() {
        if (!this.elements.summary) {
            this.elements.summary = document.querySelector('#pull-request-diff-header dl')
        }

        return this.elements.summary
    }
}

export default PullRequestPage

import BitbucketApi from './../core/BitbucketApi'
import PullRequestPage from './../pages/PullRequestPage'

class LinkedPullRequests {
    constructor() {
        this.page = new PullRequestPage

        this.valid = this.page.validate()

        if (this.valid) {
            this.init()
        }
    }

    // Core
    prepare() {
        this.appendLinkedSection()
    }

    run() {
        this.api.getPullRequests({ repo: this.page.repo() }, this.renderLinkedPullRequestList)
    }


    // Custom
    init() {
        this.api = new BitbucketApi
        this.page = new PullRequestPage

        this.renderLinkedPullRequestList = this.renderLinkedPullRequestList.bind(this)
    }

    renderLinkedPullRequestList(pullRequests) {
        let content = document.querySelector('.js-linked-pull-request')

        content.innerHTML = ''

        pullRequests.forEach(pullRequest => this.renderLinkedPullRequest(content, pullRequest))

        content.innerHTML += content.innerHTML ? '' : `<span class="text--italic">None</span>`
    }

    renderLinkedPullRequest(content, pullRequest) {
        if (this.matchesPullRequest(pullRequest)) {

            content.innerHTML +=
                `<p class="pull-request-summary__item">
                    <a href="${ pullRequest.links.html.href }/activity" target="_blank">
                        ${ pullRequest.title } (${ this.resolvePullRequestStatus(pullRequest) })
                    </a>
                </p>`
        }
    }

    resolvePullRequestStatus(pullRequest) {
        if (pullRequest.state == 'DECLINED' && pullRequest.closed_by.username == pullRequest.author.username) {
            pullRequest.state = 'SELF-DECLINED'
        }

        return pullRequest.state
    }

    matchesPullRequest(pullRequest) {
        let ticketMatches = pullRequest.title.includes(`${ this.page.ticket() } `)
        let branchMatches = pullRequest.source.branch.name == this.page.branch()

        return pullRequest.id != this.page.id() && (ticketMatches || branchMatches)
    }

    appendLinkedSection() {
        this.page.summary().innerHTML +=
            `<div class="pull-request-summary">
                <dt>Linked</dt>
                <dd class="pull-request-summary__content js-linked-pull-request">Loading...</dd>
            </div`
    }
}

export default LinkedPullRequests

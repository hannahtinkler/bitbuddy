import BitbucketApi from './../core/BitbucketApi';

class LinkedPullRequests {
    constructor() {
        if (this.isPullRequestPage()) {
            this.init()
            this.loaded = this.loaded.bind(this)
        }
    }

    init() {
        this.api = new BitbucketApi;

        const branchElement = document.querySelector('.compare-widget:first-child')
        const pullRequestElement = document.querySelector('#pullrequest')
        const summaryElement =  document.querySelector('#pull-request-diff-header dl')

        this.branch = branchElement.getAttribute('data-branch-name')
        this.repo = branchElement.getAttribute('data-repo-name')
        this.pullRequestId = pullRequestElement.getAttribute('data-local-id')
    }

    boot() {
        this.appendLinkedSection()
    }

    loaded() {
        this.api.getPullRequests({ repo: this.repo }, data => {
            let contentElement = document.querySelector('.js-linked')

            contentElement.innerHTML = '';

            if (data.length) {
                data.forEach(pullRequest => {
                    if (pullRequest.source.branch.name == this.branch && pullRequest.id != this.pullRequestId) {
                        contentElement.innerHTML += `<p><a href="${ pullRequest.links.html.href }/activity" target="_blank">${ pullRequest.title } (${ pullRequest.state })</a></p>`
                    }
                })
            }
            if (!contentElement.innerHTML) {
                contentElement.innerHTML += `<span class="empty">n/a</span>`
            }
        });
    }

    isPullRequestPage() {
        return document.querySelectorAll('.pull-request-self-link').length
    }

    appendLinkedSection() {
        document.querySelector('#pull-request-diff-header dl').innerHTML +=
            `<div class="clearfix description mt-1">
                <dt>Linked</dt>
                <dd class="wiki-content additional-summary-item js-linked">Loading...</dd>
            </div`
    }
}

export default LinkedPullRequests;

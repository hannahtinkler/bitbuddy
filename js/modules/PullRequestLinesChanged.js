import BitbucketApi from './../core/BitbucketApi';
import ignoredFiles from './../../config/ignored-files'
import PullRequestPage from './../pages/PullRequestPage'

class PullRequestLinesChanged {
    constructor() {
        this.page = new PullRequestPage

        this.valid = this.page.validate()

        if (this.valid) {
            this.init()
        }
    }

    // Core
    prepare() {
        this.appendLinesChangedSection()
    }

    run() {
        this.api.getPullRequestById({ repo: this.page.repo(), id: this.page.id() }, this.getStats)
    }


    // Custom
    init () {
        this.api = new BitbucketApi

        this.getStats = this.getStats.bind(this)
        this.parseStats = this.parseStats.bind(this)
    }

    getStats(pullRequest) {
        this.api.getDiffStats({
            repo: this.page.repo(),
            id: this.page.id(),
            from: pullRequest.source.commit.hash,
            to: pullRequest.destination.commit.hash,
        }, this.parseStats)
    }

    parseStats(stats) {
        stats = stats.filter(stat => {
            let path = stat.new ? stat.new.path : stat.old.path
            let file = path.split('/').pop()

            return ignoredFiles.indexOf(file) === -1
        })

        let linesChanged = stats.reduce((carry, stat) => carry += Math.max(stat.lines_added, stat.lines_removed), 0)

        this.renderLinesChanges(linesChanged)
    }

    renderLinesChanges(linesChanged) {
        document.querySelector('.js-lines-changed').innerHTML = `~${ linesChanged }`
    }

    appendLinesChangedSection() {
        document.querySelector('#pull-request-diff-header dl').innerHTML +=
            `<div class="pull-request-summary">
                <dt>Lines changed</dt>
                <dd class="pull-request-summary__content js-lines-changed">Loading...</dd>
            </div`
    }
}

export default PullRequestLinesChanged

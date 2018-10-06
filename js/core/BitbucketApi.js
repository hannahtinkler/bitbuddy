import config from './../../config/bitbucket'

class BitbucketApi {
    constructor() {
        this.url = `https://api.bitbucket.org/2.0/repositories/${ config.bitbucket_organisation }`
        this.token = btoa(`${ config.bitbucket_email }:${ config.bitbucket_password }`)
    }

    getPullRequests(params, callback) {
        let promise = fetch(`${ this.url }/${ params.repo }/pullrequests?q=state="declined" OR state="open" OR state="merged"`, {
            headers: { 'Authorization': `Basic ${ this.token }` }
        })

        this.handleResponse(promise, callback)
    }

    getPullRequestById(params, callback) {
        let promise = fetch(`${ this.url }/${ params.repo }/pullrequests/${ params.id }`, {
            headers: { 'Authorization': `Basic ${ this.token }` }
        })

        this.handleResponse(promise, callback)
    }

    getDiffStats(params, callback) {
        let promise = fetch(`${ this.url }/${ params.repo }/diffstat/${ params.from }..${ params.to }`, {
            headers: { 'Authorization': `Basic ${ this.token }` }
        })

        this.handleResponse(promise, callback)
    }

    getCommits(params, callback) {
        let promise = fetch(`${ this.url }/${ params.repo }/pullrequests/${ params.id }/commits`, {
            headers: { 'Authorization': `Basic ${ this.token }` }
        })

        this.handleResponse(promise, callback)
    }

    handleResponse(promise, callback) {
        promise
            .then(response => response.json())
            .then(json => json.values ? json.values : json)
            .then(data => callback(data))
    }
}

export default BitbucketApi;

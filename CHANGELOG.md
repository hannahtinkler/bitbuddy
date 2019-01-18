# Changelog


## [1.5.1] - 2019-01-18
### Add:
    - Dont show backend flag if only files are in wp-themes

## [1.5.0] - 2019-01-18
### Add:
    - Wordpress flag

## [1.4.3] - 2019-01-18
### Updates:
    - Don't show tests flag if the test was deleted

## [1.4.2] - 2018-10-8
### Adds:
    - the ignored files config file

## [1.4.1] - 2018-10-06
### Updates:
    - the way lines changed is calculated so that it ignores whitespace

## [1.4.0] - 2018-10-06
### Adds:
    - automatic hiding of white-space only changes

## [1.3.2] - 2018-10-06
### Fixes:
    - the way the branch names are matches on ticket

## [1.3.1] - 2018-10-06
### Fixes:
    - the way the repository name is retrieved

## [1.3.0] - 2018-10-06
### Adds:
    - automatic checking 'close branch after pull request is merged' when opening a PR

## [1.2.1] - 2018-10-06
### Fixes:
    - PRs being flagged with invalid branch names if the branch ticket was in lowercase

## [1.2.0] - 2018-10-06
### Adds:
    - links pull requests to jira tickets as well as source branch
    - makes file diffs collapsible, and automatically collapses files in config/ignore-files.js
    - pull request flags in the summary area, highlighting key facts
    - 'lines changed` in PR summary

## [1.1.0] - 2018-10-05
### Fixes:
    - modules running on pages they should not by adding validation
### Updates:
    - module method conventions and core class method names

## [1.0.2] - 2018-10-05
### Fixes:
    - response length error when there is no data returned from the API

## [1.0.1] - 2018-10-05
### Fixes:
    - 'n/a' displaying when no repos are found
### Removes
    - unused locale support

## [1.0.0] - 2018-10-05
### Added:
    - all initial files
    - linkedPullRequests module, based on branches

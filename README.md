# bitbuddy


## How to

### Installation

* Download this repository
* Navigate to the repo in your terminal
* Run `cp config/bitbucket.example.js config/bitbucket.js` and update the contents with your bitbucket credentials
* Run `yarn`
* Run `yarn prod` to build assets, or `yarn watch` if you want to update your build as you change code
* Go to chrome://extensions/ in your browser
* Turn on 'Developer mode' from the top right of the screen
* Click the 'Load unpacked' button from the top left of the screen
* Navigate into this repository's directory in the finder window and click the 'select' button


### Getting updates

* Pull the latest changes from the repository
* Run `yarn`
* Run `yarn prod` to build assets, or `yarn watch` if you want to update your build as you change code
* Go to chrome://extensions/ in your browser
* Click the refresh button on the extension card (its a circular arrow)


## Features

### Pull Requests

#### Linked PRs
Shows other pull requests made against the branch of the pull request you are currently viewing. Adds the 'self-declined' status which indicates a PR that was closed by the author rather than by a reviewer. Displays this info in the pull request summary area.

#### Collapsible Diffs
Adds buttons to each file diff in a pull request that allows you to collapse and re-expand the file diff. Automatically collapses composer.json and package-lock.json files

#### Lines Changed
Shows the total lines changed in a pull request. Displays this info in the pull request summary area.

#### Flags
Adds flags to the summary area that highlight missing tests, incorrect branch names and commits, and the disciplines that the changes pertain to (e.g. backend, frontend and mobile development)

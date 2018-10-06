import Bitbuddy from './core/Bitbuddy'

import CollapsibleDiffs from './modules/CollapsibleDiffs'
import DiffLoadedEvent from './modules/DiffLoadedEvent'
import PullRequestFlags from './modules/PullRequestFlags'
import LinkedPullRequests from './modules/LinkedPullRequests'
import PullRequestLinesChanged from './modules/PullRequestLinesChanged'

new Bitbuddy([
    new DiffLoadedEvent,
    new CollapsibleDiffs,
    new PullRequestLinesChanged,
    new LinkedPullRequests,
    new PullRequestFlags,
]);

import Bitbuddy from './core/Bitbuddy'

import CollapsibleDiffs from './modules/CollapsibleDiffs'
import DiffLoadedEvent from './modules/DiffLoadedEvent'
import PullRequestFlags from './modules/PullRequestFlags'
import LinkedPullRequests from './modules/LinkedPullRequests'
import PullRequestLinesChanged from './modules/PullRequestLinesChanged'
import AutomaticallyCheckCloseBranch from './modules/AutomaticallyCheckCloseBranch'
import AutomaticallyHideWhitespaceChanges from './modules/AutomaticallyHideWhitespaceChanges'

new Bitbuddy([
    new DiffLoadedEvent,
    new CollapsibleDiffs,
    new LinkedPullRequests,
    new PullRequestLinesChanged,
    new PullRequestFlags,
    new AutomaticallyCheckCloseBranch,
    new AutomaticallyHideWhitespaceChanges,
]);

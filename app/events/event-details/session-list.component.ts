import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterBy: string
    @Input() sortBy: string
    visibleSessions: ISession[] = []

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy)
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
        }
    }

    filterSessions(filterBy: string) {
        if (filterBy === 'all') {
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter(s => {
                return s.level.toLowerCase() === filterBy
            })
        }
    }
}

function sortByNameAsc(session1: ISession, session2: ISession) {
    if (session1.name > session2.name)
        return 1
    else if (session1.name == session2.name)
        return 0
    else
        return -1
}

function sortByVotesDesc(session1: ISession, session2: ISession) {
    return session2.voters.length - session1.voters.length
}
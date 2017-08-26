import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { Observable } from 'rxjs/Rx'

describe('VoterService', () => {

    var voterService: VoterService, mockHttp

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        this.voterService = new VoterService(mockHttp)
    })

    describe('deleteVoter', () => {
        it('should remove the voter client-side', () => {
            // Arrange
            var session = { id: 6, voters: ["joe", "john"] }
            mockHttp.delete.and.returnValue(Observable.of(false))

            // Act
            this.voterService.deleteVoter(3, <ISession>session, "joe")

            // Assert
            expect(session.voters.length).toBe(1)
            expect(session.voters[0]).toBe("john")
        })

        it('should remove the voter server-side', () => {
            // Arrange
            var session = { id: 6, voters: ["joe", "john"] }
            mockHttp.delete.and.returnValue(Observable.of(false))
            let eventId: number = 3
            let voterToRemove: string = "joe"

            // Act
            this.voterService.deleteVoter(eventId, <ISession>session, voterToRemove)

            // Assert
            expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/${eventId}/sessions/${session.id}/voters/${voterToRemove}`)
        })
    })

    describe('addVoter', () => {
        it('should add the voter server-side', () => {
            // Arrange
            var session = { id: 6, voters: ["john"] }
            mockHttp.post.and.returnValue(Observable.of(false))
            let eventId: number = 3
            let voterToAdd: string = "joe"

            // Act
            this.voterService.addVoter(eventId, <ISession>session, voterToAdd)

            // Assert
            expect(mockHttp.post).toHaveBeenCalledWith(`/api/events/${eventId}/sessions/${session.id}/voters/${voterToAdd}`, "{}", jasmine.any(Object))
        })
    })
})
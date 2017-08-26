import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class AuthService {

    constructor(private http: Http) {

    }

    currentUser: IUser

    loginUser(userName: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })
        let loginInfo = { username: userName, password: password }

        return this.http.post('/api/login', JSON.stringify(loginInfo), options).do(response => {
            if (response) {
                this.currentUser = <IUser>response.json().user
            }
        }).catch(error => {
            return Observable.of(false)
        })
    }

    logout() {
        // Logout client-side
        this.currentUser = undefined

        // Logout server-side
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })

        return this.http.post('/api/logout', JSON.stringify({}), options)
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity')
            .map((response: any) => {
                if (response._body) {
                    return response.json()
                } else {
                    return {}
                }
            })
            .do(currentUser => {
                if (!!currentUser.userName) {
                    this.currentUser = currentUser
                }
            })
            .subscribe()
    }

    updateCurrentUser(firstName: string, lastName: string) {
        // Update client-side
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        // Update server-side
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })

        return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options)
    }
}
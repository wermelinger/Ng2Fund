import { Component } from '@angular/core'
import { AuthService } from './user/auth.service'

@Component({
    selector: 'app',
    template: '<nav-bar></nav-bar> <router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(private authService: AuthService) {

    }

    ngOnInit() {
        this.authService.checkAuthenticationStatus()
    }
}
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { EventsListComponent, EventThumbnailComponent, EventService, EventDetailsComponent, CreateEventComponent, EventRouteActivator, EventListResolver, CreateSessionComponent, SessionListComponent, DurationPipe }  from './events/index'
import { NavbarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'
import { TOASTER_TOKEN, Toastr } from './common/toastr.service'
import { CollapsibleWellComponent } from './common/collapsible-well.component'
import { AuthService } from './user/auth.service'
import { appRoutes } from './routes'

declare let toastr: Toastr

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        AppComponent, 
        EventsListComponent,
        EventThumbnailComponent,
        NavbarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        CreateSessionComponent,
        SessionListComponent,
        Error404Component,
        CollapsibleWellComponent,
        DurationPipe],
    providers: [EventService, { provide: TOASTER_TOKEN, useValue: toastr }, EventRouteActivator, EventListResolver, AuthService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}

function checkDirtyState(component: CreateEventComponent)
{
    if (component.isDirty) {
        return window.confirm('Work is unsaved. Do you want to cancel?')
    }

    return true;
}
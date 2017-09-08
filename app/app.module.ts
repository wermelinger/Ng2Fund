import './rxjs-extensions'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component'
import { EventsListComponent, EventThumbnailComponent, EventService, EventDetailsComponent, CreateEventComponent, EventResolver, EventListResolver, CreateSessionComponent, SessionListComponent, DurationPipe, UpvoteComponent, VoterService, LocationValidator }  from './events/index'
import { NavbarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'
import { JQ_TOKEN, TOASTER_TOKEN, Toastr, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective } from './common/index'
import { AuthService } from './user/auth.service'
import { appRoutes } from './routes'

declare let toastr: Toastr
declare let jQuery: Object

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
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
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator,
        DurationPipe],
    providers: [EventService, { provide: TOASTER_TOKEN, useValue: toastr }, { provide: JQ_TOKEN, useValue: jQuery }, EventResolver, EventListResolver, AuthService, VoterService,
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
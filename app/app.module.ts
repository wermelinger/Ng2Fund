import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { EventsListComponent, EventThumbnailComponent, EventService, EventDetailsComponent, CreateEventComponent, EventRouteActivator, EventListResolver }  from './events/index'
import { NavbarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'
import { ToastrService } from './common/toastr.service'
import { appRoutes } from './routes'

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        AppComponent, 
        EventsListComponent,
        EventThumbnailComponent,
        NavbarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component],
    providers: [EventService, ToastrService, EventRouteActivator, EventListResolver,
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
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IEvent } from './shared/index'

@Component({
    selector: 'event-thumbnail',
    template: `
        <div class="well hoverwell thumbnail" [routerLink]="['/events', event.id]">
            <h2>{{event.name}}</h2>
            <div>Date: {{event.date}}</div>
            
            <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event.time" >
                Time: {{event.time}}
                <span *ngSwitchCase="'8:00 am'">(Early)</span>
                <span *ngSwitchCase="'10:00 am'">(Late)</span>
                <span *ngSwitchDefault>(Normal)</span>
            </div>
            <div>Price: CHF {{event.price}}</div>
            <div *ngIf="event.location">
                <span>Location: {{event.location.address}}</span>
                <span class="pad-left">{{event.location.city}} {{event.location.country}}</span>
            </div>
        </div>`,
    styles: [ `
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
        .thumbnail { min-height: 210px; }
    ` ]
})
export class EventThumbnailComponent {
    @Input() event: IEvent

    getStartTimeStyle() : any {
        const isEarlyStart = this.event.time === '8:00 am'
        return isEarlyStart ? { color: 'green', 'font-weight': 'bold'} : {};
    }
}
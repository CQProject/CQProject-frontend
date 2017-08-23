import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../notifications/notification.service";

@Component({
    selector: 'notifications',
    templateUrl: "./notification-link.component.html"
})

export class NotificationCounterComponent {

    notifications: Number;

    constructor(
        private _service: NotificationService,
        private _router: Router,
        private _ngZone: NgZone,
    ) { }

    public ngOnInit() {
        this.notifications=1;
        this._ngZone.runOutsideAngular(() => {
            this._check(() => {
                // reenter the Angular zone and display done
                this._ngZone.run(() => { });
            })
        });
    }

    private async _check(doneCallback: () => void) {
        if (<Account>JSON.parse(localStorage.getItem('currentUser')) != null) {
            this.notifications = await this._service.count();
            console.log(this.notifications);
            window.setTimeout(() => this._check(doneCallback), 10000);
        } else {
            doneCallback();
        }
    }
}
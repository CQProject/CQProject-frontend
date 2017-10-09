import { StudentGuard } from '../utils/auth-guard.service';
import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../notifications/notification.service";

@Component({
    selector: 'notifications',
    templateUrl: "./notification-link.component.html"
})

export class NotificationCounterComponent {

    notifications: number;

    constructor(
        private _service: NotificationService,
        public _studentGuard: StudentGuard,
        private _router: Router,
        private _ngZone: NgZone,
        private _ref:ChangeDetectorRef
    ) { }

    public ngOnInit() {
        this.notifications=0;
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
            window.setTimeout(() => this._check(doneCallback), 10000);
            this._ref.detectChanges();
        } else {
            doneCallback();
        }
    }
}
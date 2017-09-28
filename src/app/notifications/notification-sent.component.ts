import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
import { UserProfile } from "../users/iUsers";
declare var $:any;

@Component({
    selector: "notification-sent",
    templateUrl: "./notification-sent.component.html"
})

export class NotificationSentComponent {

    sentNotifications: Notification[];
    sentValidations: SentValidation[];
    sentPage: number;
    selected : Notification;

    constructor(
        private _service: NotificationService,
        private _router: Router,
        private _userService: UserService
    ) {
        this.sentPage = 0;
    }

    public async ngOnInit() {
        this.sentNotifications = await this._service.getSentNotification(this.sentPage);
        $(document).ready(function () {
            $("#notifSent").modal({
                dismissible: false
            }),
                $(window).on("hashchange", function () {
                    $("#notifSent").modal('close')
                })
        })
    }

    public showNotifDetails(index:number, idNotif?: number) {
        $("#notifSent").modal('open');
        this.selected = this.sentNotifications[index];
        this.getSentValidations(idNotif);
    }

    public closeNotifDetails() {
        $("#notifSent").modal('close');
    }

    public async getSentValidations(notificationID: number) {
        this.sentValidations = [];
        let validations = await this._service.getValidationsByNotification(notificationID);
        for (let validation of validations) {
            let receiver = await this._userService.getProfile(validation.ReceiverFK);
            if (validation.StudentFK != null) {
                let student = await this._userService.getProfile(validation.StudentFK);
                this.sentValidations.push({
                    "ReceiverFK": receiver.ID,
                    "Receiver": receiver.Name,
                    "NotificationFK": notificationID,
                    "Accepted": validation.Accepted,
                    "Read": validation.Read,
                    "Student": student.Name,
                    "StudentFK": student.ID,
                });
            } else {
                this.sentValidations.push({
                    "ReceiverFK": receiver.ID,
                    "Receiver": receiver.Name,
                    "NotificationFK": notificationID,
                    "Accepted": validation.Accepted,
                    "Read": validation.Read,
                    "Student": null,
                    "StudentFK": null,
                });
            }
        }
        console.log(this.sentValidations);
    }
}
import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
import { UserProfile } from "../users/iUsers";

@Component({
    selector:"notification-sent",
    templateUrl: "./notification-sent.component.html"
})

export class NotificationSentComponent {

    sentNotifications: Notification[];
    sentValidations: SentValidation[];
    sentPage: number;

    constructor(
        private _service: NotificationService,
        private _router: Router,
        private _userService: UserService
    ) {
        this.sentPage = 0;
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

    public showNotifDetails(id: string, idNotif?: number) {
        var notif = document.getElementById(id + "").style.display = "block";
        alert(id)
        if(id=="notifSent"){
            this.getSentValidations(idNotif);
        }
    }

    public closeNotifDetails(id: string) {
        if(id=="notifReceived"){
            window.location.reload();
        }
        var notif = document.getElementById(id + "").style.display = "none";
    }

    public async getSentNotifications() {
        this.sentNotifications = await this._service.getSentNotification(this.sentPage);
        console.log(this.sentNotifications);
    }

    
}
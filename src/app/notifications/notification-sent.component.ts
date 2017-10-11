import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification} from "./iNotifications";
import { Validation } from "./iValidations";
import { UserProfile } from "../users/iUsers";
declare var $:any;

@Component({
    selector: "notification-sent",
    templateUrl: "./notification-sent.component.html"
})

export class NotificationSentComponent {

    sentNotifications: Notification[];
    sentValidations: any[];
    selected : Notification;
    page: number;

    constructor(
        private _service: NotificationService,
        private _router: Router,
        private _userService: UserService
    ) {
        this.page = 0;
    }

    public async ngOnInit() {
        this.sentNotifications = await this._service.getSent(this.page);
        $(document).ready(function () {
            $("#notifSent").modal({
                dismissible: false
            }),
            $("#writeMessage").modal({
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
        this.getValidations(idNotif);
        document.getElementById("notSentDescription").innerHTML = this.selected.Description;
    }

    public closeNotifDetails() {
        $("#notifSent").modal('close');
    }

    public async getValidations(notificationID: number) {
        this.sentValidations = [];
        let validations = await this._service.getValidations(notificationID);
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
    }
}
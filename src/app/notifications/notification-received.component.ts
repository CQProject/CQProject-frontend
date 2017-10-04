import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
import { UserProfile } from "../users/iUsers";
declare var $: any;

@Component({
    selector: "notification-received",
    templateUrl: "./notification-received.component.html"
})

export class NotificationReceivedComponent {

    receivedNotifications: ReceivedNotification[];
    page: number;
    selected: ReceivedNotification;
    checked: boolean;

    constructor(
        private _service: NotificationService,
        private _router: Router,
        private _userService: UserService
    ) {
        this.page = 0;
        this.checked = false;
    }

    public async ngOnInit() {
        this.receivedNotifications = [];
        await this.getReceivedNotifications();
        $(document).ready(function () {
            $("#notifReceived").modal({
                dismissible: false
            }),
                $(window).on("hashchange", function () {
                    $("#notifReceived").modal('close')
                })
        })
    }


    public async getReceivedNotifications() {
        let validations = await this._service.getReceived(this.page);
        if (validations != null) {
            for (let validation of validations) {
                await this._getReceivedNotification(validation);
            }
        }
    }

    private async _getReceivedNotification(validation: Validation) {
        let notification = await this._service.getMessage(validation.NotificationFK);
        let sender = await this._userService.getProfile(notification.UserFK);
        this.receivedNotifications.push({
            "ID": notification.ID,
            "Hour": notification.Hour,
            "Subject": notification.Subject,
            "Description": notification.Description,
            "Urgency": notification.Urgency,
            "Approval": notification.Approval,
            "Sender": sender.Name,
            "SenderFK": sender.ID,
            "Accepted": validation.Accepted,
            "Read": validation.Read
        });
    }

    public async readNotification(notificationID: number, index: number) {
        this.selected = this.receivedNotifications[index];
        $("#notifReceived").modal('open');
        this.receivedNotifications[index].Read = true;
        this._service.read(notificationID).subscribe();
        document.getElementById("notRecDescription").innerHTML = this.selected.Description;
    }

    public accept(notificationID: number) {
        this._service.accept(notificationID).subscribe();
        this.selected.Accepted = true;
    }

    public closeNotifDetails() {
        $("#notifReceived").modal('close');
    }
}
import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
@Component({
    templateUrl: "./notification-menu.component.html"
})

export class NotificationMenuComponent {

    receivedNotifications: ReceivedNotification[];
    sentNotifications: Notification[];
    sentValidations: SentValidation[];
    receivedPage: Number;
    sentPage: Number;

    constructor(
        private _service: NotificationService,
        private _router: Router,
        private _userService: UserService
    ) {
        this.receivedPage = 0;
        this.sentPage = 0;
    }

    public ngOnInit() {
        this.getReceivedNotifications();
    }

    public async getReceivedNotifications() {
        this.receivedNotifications = [];
        let validations = await this._service.getValidationsByPage(this.receivedPage);
        if (validations != null) {
            for (let validation of validations) {
                this._getReceivedNotification(validation);
            }
        }
        console.log(this.receivedNotifications);
    }

    private async _getReceivedNotification(validation: Validation) {
        let notification = await this._service.getReceivedNotification(validation.NotificationFK);
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

    public async getSentNotifications() {
        this.sentNotifications = await this._service.getSentNotification(this.sentPage);
        console.log(this.sentNotifications);
    }

    public async getSentValidations(notificationID: Number) {
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
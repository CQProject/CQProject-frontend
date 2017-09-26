import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
import { UserProfile } from "../users/iUsers";

@Component({
    selector:"notification-received",
    templateUrl: "./notification-received.component.html"
})

export class NotificationReceivedComponent {

    receivedNotifications: ReceivedNotification[];
    receivedPage: number;
    selected: ReceivedNotification;

    constructor(
        private _service: NotificationService,
        private _router: Router,
        private _userService: UserService
    ) {
        this.receivedPage = 0;
    }

    public async ngOnInit(){
        await this.getReceivedNotifications();
    }

    public async getReceivedNotifications() {
        this.receivedNotifications = [];
        let validations = await this._service.getValidationsByPage(this.receivedPage);
        if (validations != null) {
            for (let validation of validations) {
                await this._getReceivedNotification(validation);
            }
        }

console.log(this.receivedNotifications)
    }

    private async _getReceivedNotification(validation: Validation) {
        let notification = await this._service.getReceivedNotification(validation.NotificationFK);
        console.log("notf: " + notification.UserFK)
        let sender = await this._userService.getProfile(notification.UserFK);
        console.log("user: " + sender.ID)
        //while(sender==null){sender = await this._userService.getProfile(notification.UserFK);}
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

    public readNotification(notificationID: number){
        this._service.read(notificationID).subscribe();
    }

    public accept(notificationID: number) {
        this._service.accept(notificationID).subscribe();
    }
}
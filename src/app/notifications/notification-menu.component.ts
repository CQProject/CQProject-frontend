import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
import { UserProfile } from "../users/iUsers";

@Component({
    selector:"notification-menu",
    templateUrl: "./notification-menu.component.html"
})

export class NotificationMenuComponent {

    receivedNotifications: ReceivedNotification[];
    sentNotifications: Notification[];
    sentValidations: SentValidation[];
    receivedPage: number;
    sentPage: number;

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
                await this._getReceivedNotification(validation);
            }
        }


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

    public async getSentNotifications() {
        this.sentNotifications = await this._service.getSentNotification(this.sentPage);
        console.log(this.sentNotifications);
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

    public async readNotification(notificationID: number){
        this._service.read(notificationID).subscribe();
    }

    public accept(notificationID: number) {
        this._service.accept(notificationID).subscribe();
    }

    public chooseOptionNotif(id: String) {
        var informationNotif, tablinkNotif;
        informationNotif = document.getElementsByClassName("informationNotif");
        for (var i = 0; i < informationNotif.length; i++) {
            if (informationNotif[i].id == id) {
                informationNotif[i].className = informationNotif[i].className.replace(" w3-hide", " w3-show");
            } else {
                informationNotif[i].className = informationNotif[i].className.replace(" w3-show", " w3-hide");
            }
        }
        tablinkNotif = document.getElementsByClassName("tablinkNotif");
        for (var i = 0; i < tablinkNotif.length; i++) {
            tablinkNotif[i].className = tablinkNotif[i].className.replace("w3-border-white", " ");
            if (id.includes(tablinkNotif[i].id)) {
                tablinkNotif[i].className += " w3-border-white";
            }
        }
    }

    public showNotifDetails(id: string, idNotif?: number) {
        var notif = document.getElementById(id + "").style.display = "block";
        if(id=="notifSent"){
            this.getSentValidations(idNotif);
        }
    }

    public closeNotifDetails(id: string) {
        if(id=="receivedMessages"){
            window.location.reload();
        }
        var notif = document.getElementById(id + "").style.display = "none";
    }
}
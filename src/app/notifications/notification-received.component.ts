import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification } from "./iNotifications";
import { Validation } from "./iValidations";
import { UserProfile } from "../users/iUsers";
declare var $: any;

@Component({
    selector: "notification-received",
    templateUrl: "./notification-received.component.html"
})

export class NotificationReceivedComponent {

    receivedNotifications: any[];
    page: number;
    selected: any;
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
        console.log(validation);
        let notification = await this._service.getMessage(validation.NotificationFK);
        let sender = await this._userService.getProfile(notification.UserFK);
        if(validation.StudentFK!=null){
            let student = await this._userService.getProfile(validation.StudentFK);
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
                "Read": validation.Read,
                "StudentFK": student.ID,
                "Student":student.Name
            });
        }else{
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
                "Read": validation.Read,
                "StudentFK": null,
                "Student":null
            });
        }
        
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
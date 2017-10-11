import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { UserService } from "../users/user.service";
import { Notification } from "./iNotifications";
import { Validation } from "./iValidations";
import { UserProfile } from "../users/iUsers";
declare var $:any;

@Component({
    selector:"notification-menu",
    templateUrl: "./notification-menu.component.html"
})

export class NotificationMenuComponent {

    receivedNotifications: any[];
    sentNotifications: Notification[];
    sentValidations: any[];
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
        $(document).ready(function(){
            var url = window.location.href;
            var tablink = document.getElementsByClassName("tablink");
            for (var i = 0; i < tablink.length; i++) {
                tablink[i].className = tablink[i].className.replace(" green darken-2", "");
                if(url.includes(tablink[i].id)){
                    tablink[i].className += " green darken-2";
                }
            }
            $(window).on("hashchange",function(){
                var url = window.location.href;
                for (var i = 0; i < tablink.length; i++) {
                    tablink[i].className = tablink[i].className.replace(" green darken-2", "");
                    if(url.includes(tablink[i].id)){
                        tablink[i].className += " green darken-2";
                    }
                }
            })
        })
    }
    

    public chooseOption(id: string) {
        var tablink = document.getElementsByClassName("tablink");
        for (var i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace(" green darken-2", "");
        }
        var choise = document.getElementById(id);
        choise.className += " green darken-2";
    }
}
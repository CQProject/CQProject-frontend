import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "./notification.service";
import { FileService } from "./../utils/files.service";
import { UserService } from "../users/user.service";
import { ParentingService } from "../users/parenting.service";
import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
import { UserProfile } from "../users/iUsers";
declare var $: any;

@Component({
    selector: "notification-form",
    templateUrl: "./notification-form.component.html"
})

export class NotificationFormComponent {

    public student: UserProfile;
    public notification: any;
    editor: any;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fileService: FileService,
        private _notificationService: NotificationService,
        private _parentingService: ParentingService,
        private _changeDetetor: ChangeDetectorRef
    ) {
        this.notification = {
            Subject: null,
            Description: null,
            Urgency: false,
            Approval: false,
            SenderFK: null,
            ReceiverFK: null
        }
    }

    public async ngOnInit() {
        let ReceiverFK;
        this._route.params.subscribe(params => ReceiverFK = +params["id"]);
        let SenderFK = JSON.parse(localStorage.getItem('currentUser')).userID;
        this.student = await this._userService.getProfile(ReceiverFK);
        try{
            this.student.Photo = await this._fileService.imageDownloadAsync(this.student.Photo);
        }catch(Exception){
            
        }
        let res = await this._parentingService.getGuardiansByUser(ReceiverFK);
        if(res!=null){
            ReceiverFK = res[0];
            console.log(ReceiverFK)
        }
        this.notification.SenderFK = SenderFK;
        this.notification.ReceiverFK = ReceiverFK;
        tinymce.init({
            selector: '#textareaDescription',
            statusbar: false,
            menubar: false,
            toolbar: 'fontselect fontsizeselect forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | bullist | hr | subscript superscript | link | print preview',
            plugins: ['link', "colorpicker", "textcolor", "print", "lists", "preview", "hr"],
            skin_url: 'assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.notification.Description = editor.getContent();
                });
            },
        });
    }

    public async sendMessage() {
        let res = this._notificationService.sendToUser(this.notification);
        this.notification = {
            Subject: null,
            Description: null,
            Urgency: false,
            Approval: false,
            SenderFK: null,
            ReceiverFK: null
        }
        tinymce.activeEditor.setContent("");
        this._changeDetetor.detectChanges();
    }
}
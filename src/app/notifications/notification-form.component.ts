import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "./notification.service";
import { FileService } from "./../utils/files.service";
import { UserService } from "../users/user.service";
import { ParentingService } from "../users/parenting.service";
import { Notification } from "./iNotifications";
import { Validation } from "./iValidations";
import { UserProfile } from "../users/iUsers";
declare var $: any;

@Component({
    selector: "notification-form",
    templateUrl: "./notification-form.component.html"
})

export class NotificationFormComponent {

    public user: UserProfile;
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
            ReceiverFK: null,
            StudentFK:null
        }
    }

    public async ngOnInit() {
        let ReceiverFK, StudentFK;
        this._route.params.subscribe(params => ReceiverFK = +params["id"]);
        let SenderFK = JSON.parse(localStorage.getItem('currentUser')).userID;
        this.user = await this._userService.getProfile(ReceiverFK);
        if(this.user.Photo!=null){
            this.user.Photo = await this._fileService.imageDownloadAsync(this.user.Photo);
        }
        let res = await this._parentingService.getGuardiansByUser(ReceiverFK);
        if(res!=null){
            StudentFK = ReceiverFK;
            ReceiverFK = res[0];
            console.log(ReceiverFK)
        }
        this.notification.SenderFK = SenderFK;
        this.notification.ReceiverFK = ReceiverFK;
        this.notification.StudentFK= StudentFK;
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
        let res = await this._notificationService.sendToUser(this.notification);
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

    ngOnDestroy() {
		tinymce.remove(this.editor);
	}
}
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from "./school.service";
import { FileService } from "../utils/files.service";
import { NoticeService } from "../schools/notice.service";
import { School } from './iSchool';
import { Notice } from './iNotice';
import { AssistantGuard, SecretaryGuard, AdminGuard } from "../utils/auth-guard.service";
declare var $: any;

@Component({ templateUrl: "./school-profile.component.html" })

export class SchoolProfileComponent {

    school: School;
    notices: Notice[];

    constructor(
        private _schoolService: SchoolService,
        private _route: ActivatedRoute,
        private _fileService: FileService,
        public _assistantGuard: AssistantGuard,
        public _secretaryGuard: SecretaryGuard,
        public _noticeService: NoticeService,
        public _adminGuard: AdminGuard
    ) { this.notices=[];}

    public async ngOnInit() {
        $(document).ready(function () {
            $('.parallax').parallax();
            $('ul.tabs').tabs({
                swipeable: true
            });
        });
        let schoolID;
        this._route.params.subscribe(params => schoolID = params['id']);
        this.school = await this._schoolService.getSchool(schoolID);
        this._fileService.publicDownload(this.school.Logo)
            .subscribe((res) => { this.school.Logo = res; });
        this._fileService.publicDownload(this.school.ProfilePicture)
            .subscribe((res) => { this.school.ProfilePicture = res; });
        document.getElementById("schoolDescription").innerHTML = this.school.About;
        let allNotices = await this._noticeService.getNewsBySchool(schoolID, 0);
        for (var i = 0; i < 4; i++) {
            this.notices.push(allNotices[i]);
        }
        for (let notice of this.notices) {
            this._fileService.publicDownload(notice.Image)
                .subscribe((res) => { notice.Image = res; console.log(notice.Image) });
        }
        $(document).ready(function () {
            $('#noticeCarousel').carousel();
        });
    }
}
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from "./school.service";
import { FileService } from "../utils/files.service";
import { NoticeService } from "../schools/notice.service";
import { Notice } from './iNotice';
import { AssistantGuard, SecretaryGuard, AdminGuard } from "../utils/auth-guard.service";
declare var $: any;

@Component({ templateUrl: "./school-events.component.html" })

export class SchoolEventsComponent {

    notices: Notice[];

    constructor(
        private _schoolService: SchoolService,
        private _route: ActivatedRoute,
        private _fileService: FileService,
        public _assistantGuard: AssistantGuard,
        public _secretaryGuard: SecretaryGuard,
        public _noticeService: NoticeService,
        public _adminGuard: AdminGuard
    ) { this.notices = []; }

    public async ngOnInit(){
        let schoolID;
        this._route.params.subscribe(params => schoolID = params['id']);
        this.notices = this.notices.concat(await this._noticeService.getNewsBySchool(schoolID,0));
        for (let notice of this.notices) {
            this._fileService.publicDownload(notice.Image)
                .subscribe((res) => { notice.Image = res; console.log(notice.Image) });
        }
    }
}
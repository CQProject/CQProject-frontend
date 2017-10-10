import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from "../utils/files.service";
import { NoticeService } from "../schools/notice.service";
import { Notice } from "../schools/iNotice";
declare var $: any;

@Component({ selector: "homepage", templateUrl: "./homepage.component.html" })

export class HomepageComponent {

    notices: Notice[];

    constructor(
        private _noticeService: NoticeService,
        private _fileService: FileService
    ) { }

    public async ngOnInit() {
        this.notices = await this._noticeService.getNews();
        for (let notice of this.notices) {
            this._fileService.publicDownload(notice.Image)
                .subscribe((res) => { notice.Image = res; console.log(notice.Image) });
        }
        $(document).ready(function () {
            $('#noticeCarousel').carousel();
        });
    }
}
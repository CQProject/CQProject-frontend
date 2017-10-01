import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from "./school.service";
import { FileService } from "../utils/files.service";
import { School } from './iSchool';
import { AssistantGuard, SecretaryGuard, AdminGuard } from "../utils/auth-guard.service";
declare var $: any;

@Component({ templateUrl: "./school-profile.component.html" })

export class SchoolProfileComponent {

    school: School;

    constructor(
        private _schoolService: SchoolService,
        private _route: ActivatedRoute,
        private _fileService: FileService,
        public _assistantGuard: AssistantGuard,
        public _secretaryGuard: SecretaryGuard,
        public _adminGuard: AdminGuard
    ) { }

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
        }
}
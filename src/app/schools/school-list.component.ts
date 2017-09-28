import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from './school.service';
import { School } from "./iSchool";
import { AssistantGuard, SecretaryGuard, AdminGuard } from "../utils/auth-guard.service";
import { FileService } from "../utils/files.service";
declare var $: any;

@Component({ selector: "schools-list", templateUrl: "./school-list.component.html" })

export class SchoolListComponent {

    public schools: School[];
    private pdf: any;
    private image: any;

    constructor(
        private _service: SchoolService,
        private _fileService: FileService,
        private _route: Router,
        private _assistantGuard: AssistantGuard,
        private _secretaryGuard: SecretaryGuard,
        private _adminGuard: AdminGuard
    ) { }

    public async ngOnInit() {
        this.schools = await this._service.getSchools();
        for (let school of this.schools) {
            this._fileService.publicDownload(school.ProfilePicture)
                .subscribe((res) => { school.ProfilePicture = res; });
        }
    }

    public show(elementID: string) {
        $('#' + elementID).modal('open');
    }

    public hide(elementID: string) {
        $('.modal').modal('close');  
    }
}

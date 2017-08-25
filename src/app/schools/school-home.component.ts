import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from './school.service';
import { School } from "./iSchool";
import { AssistantGuard, SecretaryGuard } from "../utils/auth-guard.service";
import { FileService } from "../utils/files.service";
import { API } from '../../main';

@Component({ templateUrl: "./school-home.component.html" })

export class SchoolHomeComponent {

    public schools: School[];
    private readonly _apiURL = API.url;
    private pdf: any;
    private image: any;

    constructor(
        private _service: SchoolService,
        private _fileService: FileService,
        private _route: Router,
        private _assistantGuard: AssistantGuard,
        private _secretaryGuard: SecretaryGuard
    ) { }

    public async ngOnInit() {
        this.schools = await this._service.getSchools();

        for (let school of this.schools) {
            this._fileService.imageDownload(school.Logo)
                .subscribe((res) => { school.Logo = res; });
            this._fileService.imageDownload(school.ProfilePicture)
                .subscribe((res) => { school.ProfilePicture = res; });
        }
    }

    public show(elementID: string) {
        document.getElementById(elementID).style.display = 'block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display = 'none';
    }

    public async download() {
        this._fileService.fileDownload("9735a9f8-4351-4a6c-b336-eb55bfc3becf.CV-Europass-20170727-Mendes-PT (1).pdf")
            .subscribe((res) => {
                this.pdf = res;
            });
    }


}

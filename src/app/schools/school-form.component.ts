import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from './school.service';
import { SchoolToPost } from "./iSchool";
import { FileToPost } from "../utils/iFile";
import { SecretaryGuard } from "../utils/auth-guard.service";
import { FileService } from "../utils/files.service";
import { API } from '../../main';

@Component({ selector:"school-form",templateUrl: "./school-form.component.html" })

export class SchoolFormComponent{

    school: SchoolToPost;
    logo: File;
    profile: File;

    constructor(
        private _service: SchoolService,
        private _fileService: FileService,
        private _route: Router,
        private _secretaryGuard: SecretaryGuard
    ) {       
        this.school = new SchoolToPost();
    }


    public show(elementID: string) {
        document.getElementById(elementID).style.display = 'block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display = 'none';
    }

    public getLogoImage(event){
        this.logo = event.target.files[0];
    }

    public getProfileImage(event){
        this.profile = event.target.files[0];
    }

    public async createSchool(){
        this.school.Logo = await this._fileService.publicImageUpload(this.logo);
        this.school.ProfilePicture = await this._fileService.publicImageUpload(this.profile);
        let res = await this._service.createSchool(this.school);
        //if(res==null)
        await location.reload();
    }
}
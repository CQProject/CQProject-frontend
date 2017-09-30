import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../schools/school.service';
import { School } from "../schools/iSchool";
import { SecretaryGuard } from "../utils/auth-guard.service";
import { FileService } from "../utils/files.service";

@Component({
    selector: "school-form",
    templateUrl: "./school-form.component.html"
})

export class SchoolFormComponent {

    school: School;
    logo: File;
    profile: File;
    editor: any;

    constructor(
        private _schoolService: SchoolService,
        private _fileService: FileService,
        private _secretaryGuard: SecretaryGuard,
        private _route: ActivatedRoute
    ) {
        this.school = new School();
    }

    public ngOnInit() {
        tinymce.init({
            selector: '#textarea',
            statusbar: false,
            menubar: false,
            toolbar: 'fontselect fontsizeselect forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | bullist | hr | subscript superscript | link | print preview',
            plugins: ['link', "colorpicker", "textcolor", "print", "lists", "preview", "hr"],
            skin_url: 'assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.school.About=editor.getContent();
                });
            },
        });
    }

    public show(elementID: string) {
        document.getElementById(elementID).style.display = 'block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display = 'none';
    }

    public getLogoImage(event) {
        this.logo = event.target.files[0];
    }

    public getProfileImage(event) {
        this.profile = event.target.files[0];
    }

    public async createSchool() {
        this.school.Logo = await this._fileService.publicImageUpload(this.logo);
        this.school.ProfilePicture = await this._fileService.publicImageUpload(this.profile);
        let result = await this._schoolService.createSchool(this.school);
        if(result) location.reload();
    }
}
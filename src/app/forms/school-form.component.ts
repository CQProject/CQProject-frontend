import { Component, OnInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../schools/school.service';
import { School } from "../schools/iSchool";
import { SecretaryGuard } from "../utils/auth-guard.service";
import { FileService } from "../utils/files.service";
import { TimeService } from "../utils/time.service";
import { Time} from "../utils/interfaceTime";
declare var $:any;

@Component({
    selector: "school-form",
    templateUrl: "./school-form.component.html"
})

export class SchoolFormComponent {

    school: School;
    logo: File;
    profile: File;
    editor: any;
    timesPrimary:any[];
    timesKindergarten:any[];
    primaryIndex:number;
    kindergartenIndex:number;

    constructor(
        private _schoolService: SchoolService,
        private _fileService: FileService,
        public _secretaryGuard: SecretaryGuard,
        public _timeService: TimeService,
        public _changeDetetor: ChangeDetectorRef,
        private _route: ActivatedRoute
    ) {
        this.school = new School();
        this.timesPrimary=[];
        this.timesKindergarten=[];
        this.primaryIndex=0;
        this.kindergartenIndex=0;
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

    public newTime(){
        this.timesPrimary.push({
            Order: this.primaryIndex,
            StartTime: null,
            EndTime: null,
            IsKindergarten: false,
            SchoolFK: null
        })
        this.primaryIndex++;
    }

    public newTimeKindergarten(){
        this.timesKindergarten.push({
            Order: this.kindergartenIndex,
            StartTime: null,
            EndTime: null,
            IsKindergarten: true,
            SchoolFK: null
        })
        this.kindergartenIndex++;
    }

    public async createSchool() {
        this.school.Logo = await this._fileService.publicImageUpload(this.logo);
        this.school.ProfilePicture = await this._fileService.publicImageUpload(this.profile);
        let schoolID = await this._schoolService.createSchool(this.school);
        if(schoolID!=null){
            for(let time of this.timesKindergarten){
                time['SchoolFK'] = schoolID;
                let result = this._timeService.createTimes(time);
                console.log(result)
            }
            for(let time of this.timesPrimary){
                time['SchoolFK'] = schoolID;
                let result = this._timeService.createTimes(time);
                console.log(result)
            }
        }else{
            return null;
        }
        this.school = new School();
        tinymce.activeEditor.setContent("");
        this._changeDetetor.detectChanges();
    }
}
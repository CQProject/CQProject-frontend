import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from "../utils/document.service";
import { FileService } from "../utils/files.service";
import { ClassService } from "../classes/class.service";
import {UserService} from "../users/user.service";
import { API } from '../../main';
import { Documents } from '../utils/iDocuments';
import { Class } from '../classes/iClass';

@Component({
    selector: "class-doc",
    templateUrl: "./class-doc.component.html"
})

export class ClassDocumentComponent {

    private pdf: any;
    private image: any;
    private documents: Documents[];
    private docs: any[];
    private doc: any;

    constructor(
        private _fileService: FileService,
        private _documentService: DocumentService,
        private _classService: ClassService,
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
     }

    public async ngOnInit() {
        this.docs = [];
        let classID;
        this._route.params.subscribe(params => classID = params['id']);
        this.documents = await this._documentService.getDocumentsByClass(classID);
        for (let document of this.documents) {    
            let name = document.File.split(".");
            let classProfile;
            let teacherName;
            classProfile = await this._classService.getClassProfile(document.ClassFK);
            teacherName = await this._userService.getProfile(document.UserFK)
            this.doc = {
                //quando forem dados reais alterar para 1 - 2
                "File": name[0]+ "." +name[1],
                "Teacher": teacherName.Name,
                "SubmitedIn": document.SubmitedIn,
                "Class": classProfile.Year + classProfile.ClassDesc,
                "IsVisible": document.IsVisible
            }
            this.docs.push(this.doc);
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

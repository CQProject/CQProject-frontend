import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DocumentService } from "../../utils/document.service";
import { FileService } from "../../utils/files.service";
import { ClassService } from "../../classes/class.service";
import { UserService } from "../../users/user.service";
import { StudentGuard, GuardianGuard } from "../../utils/auth-guard.service";

import { Document } from '../../utils/iDocument';
import { Class } from '../../classes/iClass';

@Component({
    selector: "class-doc",
    templateUrl: "./doc.component.html"
})

export class ClassPrimaryDocumentComponent {

    private file: any;
    private image: any;
    private docs: any[];

    constructor(
        private _fileService: FileService,
        private _documentService: DocumentService,
        private _classService: ClassService,
        private _userService: UserService,
        private _guardianGuard: GuardianGuard,
        private _studentGuard: StudentGuard,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
    }

    public async ngOnInit() {
        this.docs = [];
        let classID;
        this._route.parent.params.subscribe(params => classID = params['id']);
        let documents = await this._documentService.getDocumentsByClass(classID);
        for (let document of documents) {
            let filename = document.File.split(".");
            let teacher = await this._userService.getProfile(document.UserFK)
            this.docs.push({
                //quando forem dados reais alterar para 1 - 2
                "File": filename[0] + "." + filename[1],
                "Type": filename[1],
                "Teacher": teacher.Name,
                "TeacherID": teacher.ID,
                "SubmitedIn": document.SubmitedIn,
                "IsVisible": document.IsVisible
            });
        }
        console.log(this.docs)
    }


    public show(elementID: string) {
        document.getElementById(elementID).style.display = 'block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display = 'none';
    }

    public async download(filename: string, type: string) {
        if (type == "pdf") {
            this.show("pdfViewer");
            this._fileService.fileDownload(filename)
                .subscribe((res) => {
                    this.file = res;
                });
        }else{
            this._fileService.fileDownload(filename)
            .subscribe((res) => { 
                this.file = res; 
            });
        }
    }

}

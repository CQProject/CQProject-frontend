import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DocumentService } from "../../utils/document.service";
import { FileService } from "../../utils/files.service";
import { UserService } from "../../users/user.service";
import { StudentGuard, GuardianGuard } from "../../utils/auth-guard.service";

import { Document } from '../../utils/iDocument';
import { Class } from '../../classes/iClass';
declare var $: any;

@Component({
    selector: "class-doc",
    templateUrl: "./doc.component.html"
})

export class ClassPrimaryDocumentComponent {

    public file: any;
    private image: any;
    public docs: any[];

    constructor(
        private _fileService: FileService,
        private _documentService: DocumentService,
        public _userService: UserService,
        public _guardianGuard: GuardianGuard,
        public _studentGuard: StudentGuard,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
    }

    public async ngOnInit() {
        $(document).ready(function () {
            $('#pdfViewer').modal({
                dismissible:false
            });
        });
        $(window).on("hashchange",function(){
            $('#pdfViewer').modal('close');
        })
        this.docs = [];
        let classID;
        this._route.parent.params.subscribe(params => classID = params['id']);
        let documents = await this._documentService.getDocumentsByClass(classID);
        for (let document of documents) {
            let filename = document.File.split(".");
            let teacher = await this._userService.getProfile(document.UserFK)
            this.docs.push({
                "File": filename[1] + "." + filename[2],
                "Filename": document.File,
                "Type": filename[2],
                "Teacher": teacher.Name,
                "TeacherID": teacher.ID,
                "SubmitedIn": document.SubmitedIn,
                "IsVisible": document.IsVisible
            });
        }
        console.log(this.docs)
    }

    public hide(elementID: string) {
        $('#pdfViewer').modal('close');
    }

    public async download(filename: string, type: string) {
        if (type == "pdf") {
                $('#pdfViewer').modal('open');
            this._fileService.fileDownload(filename)
                .subscribe((res) => {
                    this.file = res;
                });
        } else {
            this._fileService.fileDownload(filename)
                .subscribe((res) => {
                    this.file = res;
                });
        }
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from "../utils/files.service";
import { API } from '../../main';

@Component({
    selector: "doc-class",
    templateUrl: "./doc-class.component.html"
})

export class SchoolHomeComponent {

    private pdf: any;
    private image: any;

    constructor(
        private _fileService: FileService,
        private _route: Router,
    ) { }

    public async ngOnInit() {

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

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssistantGuard } from "../utils/auth-guard.service";
import {SchoolService} from "../schools/school.service";
import { School } from '../schools/iSchool';

@Component({ templateUrl: "./main.component.html" })

export class ClassMainComponent {

    school:School;

    constructor(
        private _schoolService: SchoolService,
        private _route: ActivatedRoute,
    ) { }

    public async ngOnInit() {
        let schoolID;
        this._route.params.subscribe(params => schoolID = params['id']);
        this.school = await this._schoolService.getSchool(schoolID);
    }

    public chooseOption(id: string) {
        var tablink = document.getElementsByClassName("tablink");
        for (var i = 0; i < tablink.length; i++)
            tablink[i].className = tablink[i].className.replace("w3-border-green", " ");
        var element = document.getElementById(id);
        element.className+=" w3-border-green";
    }
}
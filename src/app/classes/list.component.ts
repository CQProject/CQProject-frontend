import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { SchoolService } from "../schools/school.service";
import { AssistantGuard } from "../utils/auth-guard.service";
import { ClassService } from "../classes/class.service";
import { School } from '../schools/iSchool';
import { Class } from '../classes/iClass';
declare var $: any;


@Component({ selector: 'class-list', templateUrl: "./list.component.html" })

export class ClassListComponent {

    public school: School;
    public primary_classes: Class[];
    public kindergarten_classes: Class[];

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    public async ngOnInit() {
        let schoolID;
        $(document).ready(function(){
            $('ul.tabs').tabs({
                swipeable:true
            });
          });
        this._route.params.subscribe(params => schoolID = params['id']);
        this.school = await this._schoolService.getSchool(schoolID);
        this._classService
            .getClassesByPrimarySchool(schoolID)
            .subscribe(data => this.primary_classes = data);
        this._classService
            .getClassesByKindergarten(schoolID)
            .subscribe(data => this.kindergarten_classes = data);
    }
}
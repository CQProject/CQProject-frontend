import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AssistantGuard, TeacherGuard, SecretaryGuard, AdminGuard, StudentGuard } from "../../utils/auth-guard.service";
import { SchoolService } from "../../schools/school.service";
import { ClassService } from "../class.service";

import { School } from '../../schools/iSchool';
import { Class } from '../iClass';
declare var $: any;

@Component({ templateUrl: "./profile.component.html" })

export class ClassPrimaryProfileComponent {

    public school: School;
    public class: Class;


    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _route: ActivatedRoute,
        public _assistantGuard: AssistantGuard,
        public _secretaryGuard: SecretaryGuard,
        public _adminGuard: AdminGuard,
        public _teacherGuard: TeacherGuard,
        public _studentGuard: StudentGuard
    ) { }

    public async ngOnInit() {
        let classID;
        let usID;
        this._route.params.subscribe(params => classID = params['id']);
        this.class = await this._classService.getClassProfile(classID);
        this.school = await this._schoolService.getSchool(this.class.SchoolFK);

        if (!isNaN(classID)) {
            this.class = await this._classService.getClassProfile(classID);
            this.school = await this._schoolService.getSchool(this.class.SchoolFK);
        } else {
            usID = JSON.parse(localStorage.getItem('currentUser')).userID;
            let classes = await this._classService.getClassesByUser(usID);
            classID = parseInt(classes[classes.length - 1]);
            this.class = await this._classService.getClassProfile(classID);
            this.school = await this._schoolService.getSchool(this.class.SchoolFK);
        }

        $(document).ready(function(){
            var url = window.location.href;
            var tablink = document.getElementsByClassName("tablink");
            for (var i = 0; i < tablink.length; i++) {
                tablink[i].className = tablink[i].className.replace(" green darken-2", "");
                if(url.includes(tablink[i].id)){
                    tablink[i].className += " green darken-2";
                }
            }
            $(window).on("hashchange",function(){
                var url = window.location.href;
                for (var i = 0; i < tablink.length; i++) {
                    tablink[i].className = tablink[i].className.replace(" green darken-2", "");
                    if(url.includes(tablink[i].id)){
                        tablink[i].className += " green darken-2";
                    }
                }
            })
        })
    }

    public chooseOption(id: string) {
        var tablink = document.getElementsByClassName("tablink");
        for (var i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace(" green darken-2", "");
        }
        var choise = document.getElementById(id);
        choise.className += " green darken-2";
    }
}
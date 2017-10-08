import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EvaluationService } from "../../utils/evaluation.service";
import { ScheduleService } from "../../utils/schedule.service";
import { UserService } from "../../users/user.service";
import { StudentGuard, GuardianGuard, TeacherGuard } from "../../utils/auth-guard.service";

import { Evaluation } from '../../utils/iEvaluation';
import { Class } from '../../classes/iClass';
declare var $: any;

@Component({
    selector: "class-evaluations",
    templateUrl: "./evaluations.component.html"
})

export class ClassPrimaryEvaluationComponent {

    private evaluations: any[];
    private selected: any;
    public values=["Mau", "Não Satisfaz", "Satisfaz", "Satisfaz Bem", "Bom"];

    constructor(
        private _evaluationService: EvaluationService,
        private _userService: UserService,
        private _scheduleService: ScheduleService,
        public _guardianGuard: GuardianGuard,
        private _teacherGuard:TeacherGuard,
        public _studentGuard: StudentGuard,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { this.evaluations = []; }

    public async ngOnInit() {
        $(document).ready(function () {
            $("#evaluationModal").modal({
                dismissible: false
            }),
            $(window).on("hashchange", function () {
                $("#evaluationModal").modal('close')
            }),
            $('.collapsible').collapsible();
        })

        let classID;
        this._route.parent.params.subscribe(params => classID = params['id']);
        let userID = JSON.parse(localStorage.getItem('currentUser')).userID;
        let evaluations = await this._evaluationService.getEvaluationsByClass(classID);

        for (let evaluation of evaluations) {
            let subject = await this._scheduleService.getSubject(evaluation.SubjectFK);
            let teacher = await this._userService.getProfile(evaluation.TeacherFK);
            if (this._studentGuard.canActivate()) {
                let grades = await this._evaluationService.getGrades(evaluation.ID);
                this.evaluations.push({
                    ID: evaluation.ID,
                    Purport: evaluation.Purport,
                    EvaluationDate: evaluation.EvaluationDate,
                    Subject: subject.Name,
                    TeacherFK: teacher.ID,
                    Teacher: teacher.Name,
                    Grade: this.values[grades.Value-1]
                });
            } else {
                this.evaluations.push({
                    ID: evaluation.ID,
                    Purport: evaluation.Purport,
                    EvaluationDate: evaluation.EvaluationDate,
                    Subject: subject.Name,
                    TeacherFK: evaluation.TeacherFK,
                    Teacher:teacher.Name,
                    Able:(this._teacherGuard.canActivate() && userID!=evaluation.TeacherFK)?false:true
                });
            }
        }
        this.evaluations = this.evaluations.sort((a, b) => {
            if (a.EvaluationDate > b.EvaluationDate) return 1;
            if (a.EvaluationDate < b.EvaluationDate) return -1;
            return 0;
        });

        if (this._studentGuard.canActivate()) {
            let elements = document.getElementsByClassName("purportDescr");
            for (let i = 0; i < this.evaluations.length; i++) {
                elements[i].innerHTML = this.evaluations[i].Purport;
            }
        }
        console.log(this.evaluations)
    }

    public async select(id: number) {
        $("#evaluationModal").modal('open');
        let grades = await this._evaluationService.getGrades(this.evaluations[id].ID);

        let students = [];
        for (let grade of grades) {
            let student = await this._userService.getProfile(grade.StudentFK);
            students.push({
                Name: student.Name,
                Value: this.values[grade.Value-1]
            })
        }

        this.selected = {
            ID: this.evaluations[id].ID,
            EvaluationDate: this.evaluations[id].EvaluationDate,
            Subject: this.evaluations[id].Subject,
            TeacherFK:this.evaluations[id].TeacherFK,
            Teacher: this.evaluations[id].Teacher,
            Students: students
        }
        document.getElementById("purportDescr").innerHTML = this.evaluations[id].Purport;
    }

    public close() {
        $("#evaluationModal").modal('close');
    }

}

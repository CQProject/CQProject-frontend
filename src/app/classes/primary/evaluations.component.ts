import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EvaluationService } from "../../utils/evaluation.service";
import { ScheduleService } from "../../utils/schedule.service";
import { UserService } from "../../users/user.service";
import { StudentGuard, GuardianGuard } from "../../utils/auth-guard.service";

import { Evaluation } from '../../utils/iEvaluation';
import { Class } from '../../classes/iClass';
declare var $:any;

@Component({
    selector: "class-evaluations",
    templateUrl: "./evaluations.component.html"
})

export class ClassPrimaryEvaluationComponent {

    private file: any;
    private image: any;
    private evaluations: any[];
    private selected: any;

    constructor(
        private _evaluationService: EvaluationService,
        private _userService: UserService,
        private _scheduleService: ScheduleService,
        public _guardianGuard: GuardianGuard,
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
                })
        })

        let classID;
        this._route.parent.params.subscribe(params => classID = params['id']);
        let userID = JSON.parse(localStorage.getItem('currentUser')).userID;
        let allEvaluations = [];
        if (this._studentGuard.canActivate()) {
            allEvaluations = await this._evaluationService.getEvaluationsByClass(classID);
        }else{
            allEvaluations = await this._evaluationService.getEvaluationsByTeacher(userID);
        }
        for (let evaluation of allEvaluations) {
            let subject = await this._scheduleService.getSubject(evaluation.SubjectFK);
            if (this._studentGuard.canActivate()) {
                let teacher = await this._userService.getProfile(evaluation.TeacherFK);
                let grades = await this._evaluationService.getGrades(evaluation.ID);
                this.evaluations.push({
                    ID: evaluation.ID,
                    Purport: evaluation.Purport,
                    EvaluationDate: evaluation.EvaluationDate,
                    Subject: subject.Name,
                    TeacherFK: teacher.ID,
                    Teacher: teacher.Name,
                    Grade: grades.Value
                });
            } else {
                this.evaluations.push({
                    ID: evaluation.ID,
                    Purport: evaluation.Purport,
                    EvaluationDate: evaluation.EvaluationDate,
                    Subject: subject.Name,
                    TeacherFK: evaluation.TeacherFK
                });
            }
        }
        this.evaluations = this.evaluations.sort((a, b) => {
            if (a.EvaluationDate > b.EvaluationDate) return 1;
            if (a.EvaluationDate < b.EvaluationDate) return -1;
            return 0;
        });
        console.log(this.evaluations);
    }

    public async select(id: number) {
        $("#evaluationModal").modal('open');

        let teacher = await this._userService.getProfile(this.evaluations[id].TeacherFK);
        let grades = await this._evaluationService.getGrades(this.evaluations[id].ID);

        let students = [];
        for (let grade of grades) {
            let student = await this._userService.getProfile(grade.StudentFK);
            students.push({
                Name: student.Name,
                Value: grade.Value
            })
        }

        this.selected = {
            ID: this.evaluations[id].ID,
            Purport: this.evaluations[id].Purport,
            EvaluationDate: this.evaluations[id].EvaluationDate,
            Subject: this.evaluations[id].Subject,
            TeacherFK: teacher.ID,
            Teacher: teacher.Name,
            Students: students
        }
    }

    public closeNotifDetails() {
        $("#evaluationModal").modal('close');
    }

}

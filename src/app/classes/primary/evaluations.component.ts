import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EvaluationService } from "../../utils/evaluation.service";
import { ScheduleService } from "../../utils/schedule.service";
import { UserService } from "../../users/user.service";
import { StudentGuard, GuardianGuard } from "../../utils/auth-guard.service";

import { Evaluation } from '../../utils/iEvaluation';
import { Class } from '../../classes/iClass';

@Component({
    selector: "class-evaluations",
    templateUrl: "./evaluations.component.html"
})

export class ClassPrimaryEvaluationComponent {

    private file: any;
    private image: any;
    private evaluations: any[];
    private selected:any;

    constructor(
        private _evaluationService: EvaluationService,
        private _userService: UserService,
        private _scheduleService: ScheduleService,
        private _guardianGuard: GuardianGuard,
        private _studentGuard: StudentGuard,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { this.evaluations = []; }

    public async ngOnInit() {
        let classID;
        this._route.parent.params.subscribe(params => classID = params['id']);
        let evaluations = await this._evaluationService.getEvaluationsByClass(classID);
        for (let evaluation of evaluations) {
            let teacher = await this._userService.getProfile(evaluation.TeacherFK)
            let subject = await this._scheduleService.getSubject(evaluation.SubjectFK);
            let grades = await this._evaluationService.getGrades(evaluation.ID);
            if (this._studentGuard.canActivate()) {
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
                let students = [];
                for (let grade of grades) {
                    let student = await this._userService.getProfile(grade.StudentFK);
                    students.push({
                        Name: student.Name,
                        Value: grade.Value
                    })
                }
                this.evaluations.push({
                    ID: evaluation.ID,
                    Purport: evaluation.Purport,
                    EvaluationDate: evaluation.EvaluationDate,
                    Subject: subject.Name,
                    TeacherFK: teacher.ID,
                    Teacher: teacher.Name,
                    Students: students
                });
            }

        }
        this.evaluations = this.evaluations.sort((a, b) => {
            if (a.EvaluationDate > b.EvaluationDate) return 1;
            if (a.EvaluationDate < b.EvaluationDate) return -1;
            return 0;
        });
        console.log(this.evaluations)
    }

    public select(id:number){
        this.selected=this.evaluations[id];
        this.show();
    }

    public show() {
        document.getElementById("evaluationModal").style.display = 'block';
    }

    public hide() {
        document.getElementById("evaluationModal").style.display = 'none';
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GuardianGuard, StudentGuard } from "../utils/auth-guard.service";
import { LessonService } from "./lesson.service";
import { ScheduleService } from "../utils/schedule.service";
import { UserService } from "../users/user.service";

import { Lesson } from './iLesson';
import { Presence } from './iPresence';
import { Schedule } from "../utils/interfaceSchedule";
declare var $: any;

@Component({
    selector: "lessons-student",
    templateUrl: "./lesson-student.component.html"
})

export class LessonStudentComponent {

    index: number;
    lessons: any[];
    selected: any;

    constructor(
        private _lessonService: LessonService,
        private _scheduleService: ScheduleService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        public _guardianGuard: GuardianGuard,
        public _studentGuard: StudentGuard
    ) { this.lessons = []; }

    public async ngOnInit() {
        $(document).ready(function () {
            $('ul.tabs').tabs({
                swipeable: true
            });
            $('.collapsible').collapsible();
        });

        let scheduleID;
        this._route.params.subscribe(params => scheduleID = params['id']);
        let schedule = await this._scheduleService.getSchedule(scheduleID);
        let lessons = await this._lessonService.getLessonBySubject(schedule.SubjectFK, schedule.ClassFK);
        var student;
        if (this._studentGuard.canActivate()) {
            await this.isStudent(lessons);
        } else {
            await this.isGuardian(lessons);
        }

        this.initLessonList();
        this.showLesson(0);
    }

    public async isStudent(lessons: Lesson[]) {
        for (let lesson of lessons) {
            let presence = await this._lessonService.getPresenceByStudent(lesson.ID);
            this.lessons.push({
                Summary: lesson.Summary,
                Homework: lesson.Homework,
                Observations: lesson.Observations,
                Day: lesson.Day,
                Student: [
                    {
                        Presence: presence.Presence,
                        Material: presence.Material,
                        Behavior: presence.Behavior
                    }
                ]
            })
        }
    }

    public async isGuardian(lessons: Lesson[]) {
        for (let lesson of lessons) {
            let students: any[] = [];
            let presences = await this._lessonService.getPresenceByGuardian(lesson.ID);
            for (let presence of presences) {
                let student = await this._userService.getProfile(presence.StudentFK);
                students.push({
                    Student: student.Name,
                    Presence: presence.Presence,
                    Material: presence.Material,
                    Behavior: presence.Behavior
                });
            }
            this.lessons.push({
                Summary: lesson.Summary,
                Homework: lesson.Homework,
                Observations: lesson.Observations,
                Day: lesson.Day,
                Student: students
            });
        }
    }

    initLessonList() {
        this.index = 0;
        var list = document.getElementById("list");

        this.lessons.forEach((lesson, index) => {
            var li = document.createElement("li");
            li.setAttribute("class", index < 4 ? "col s12 m3 tab option" : "col s12 m3 tab option hide");
            var anchor = document.createElement("a");
            anchor.innerHTML = "Lição nº" + (this.lessons.length - index);
            anchor.setAttribute("class", index == 0 ? "active green-text text-darken-2" : "green-text text-darken-2")
            anchor.onclick = () => { this.showLesson(index) };
            li.appendChild(anchor);
            list.appendChild(li);
        });
        
    }
    moreLesson() {
        var y = document.getElementsByClassName("option")
        if (this.index + 3 < y.length - 1) {
            y[this.index].className += " hide";
            y[this.index + 4].className = y[this.index].className.replace(" hide", "");
            this.index++;
        }
    }
    lessLesson() {
        if (this.index > 0) {
            var y = document.getElementsByClassName("option")
            y[this.index + 3].className += " hide";
            y[this.index - 1].className = y[this.index - 1].className.replace(" hide", "");
            this.index--;
        }
    }

    showLesson(n: number) {
        this.selected = {
            Day: this.lessons[n].Day,
            Homework: this.lessons[n].Homework,
            Description: this.lessons.length - n,
            Observations: this.lessons[n].Observations,
            Summary: this.lessons[n].Summary,
            Student: this.lessons[n].Student
        };
    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LessonService } from "./lesson.service";
import { ScheduleService } from "../utils/schedule.service";
import { UserService } from "../users/user.service";

import { Lesson } from './iLesson';
import { Presence } from './iPresence';
import { Schedule } from "../utils/interfaceSchedule";

@Component({
    selector: "lessons",
    templateUrl: "./lesson-list.component.html"
})

export class LessonListComponent {

    index: number;
    lessons: Lesson[];
    selected: any;
    schedule: Schedule;
    students: any[];
    behavior: string[];

    constructor(
        private _service: LessonService,
        private _scheduleService: ScheduleService,
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { this.behavior=["red"] }

    public async ngOnInit() {
        let scheduleID;
        this._route.params.subscribe(params => scheduleID = params['id']);
        this.schedule = await this._scheduleService.getSchedule(scheduleID);
        this.lessons = await this._service.getLessonBySubject(this.schedule.SubjectFK, this.schedule.ClassFK);
        this.initLessonList();
        this.showLesson(0);
    }

    initLessonList() {
        this.index = 0;
        var list = document.getElementById("list");
        this.lessons.forEach((lesson, index) => {
            var div = document.createElement("div");
            div.setAttribute("class", index < 4 ? "w3-col m3 s12 option w3-hide w3-show" : "w3-col m3 s12 option w3-hide");
            var anchor = document.createElement("a");
            anchor.setAttribute("class", "w3-btn  w3-hover-khaki");
            anchor.innerHTML = "Lição nº" + (this.lessons.length - index);
            anchor.onclick = () => { this.showLesson(index) };
            anchor.style.width = "100%";
            div.appendChild(anchor);
            list.appendChild(div);
        });
    }
    moreLesson() {
        var y = document.getElementsByClassName("option")
        if (this.index + 3 < y.length - 1) {
            y[this.index].className = y[this.index].className.replace(" w3-show", "");
            y[this.index + 4].className += " w3-show";
            this.index++;
        }
    }
    lessLesson() {
        if (this.index > 0) {
            var y = document.getElementsByClassName("option")
            y[this.index + 3].className = y[this.index + 3].className.replace(" w3-show", "");
            y[this.index - 1].className += " w3-show";
            this.index--;
        }
    }

    showLesson(n: number) {
        this.selected = {
            Day: this.lessons[n].Day,
            Homework: this.lessons[n].Homework,
            Description: this.lessons.length - n,
            Observations: this.lessons[n].Observations,
            ScheduleFK: this.lessons[n].ScheduleFK,
            Summary: this.lessons[n].Summary,
            ID: this.lessons[n].ID
        };
    }

    public async showClass() {
        let element = document.getElementById("students");
        if (element.className.indexOf("w3-show") == -1) {
            element.className += " w3-show";
            let presences = await this._service.getPresenceByTeacher(this.selected.ID);
            this.students=[];
            for(let presence of presences){
                let student=await this._userService.getProfile(presence.StudentFK);
                this.students.push({
                    StudentFK: presence.StudentFK,
                    Student: student.Name,
                    Presence: presence.Presence,
                    Material: presence.Material,
                    Behavior: presence.Behavior,
                })
            }
            console.log(this.students);
        } else {
            element.className = element.className.replace(" w3-show", "");
        }
    }
}
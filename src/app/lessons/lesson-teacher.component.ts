import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LessonService } from "./lesson.service";
import { ScheduleService } from "../utils/schedule.service";
import { UserService } from "../users/user.service";

import { Lesson } from './iLesson';
import { Presence } from './iPresence';
import { Schedule } from "../utils/interfaceSchedule";
declare var $:any;

@Component({
    selector: "lessons",
    templateUrl: "./lesson-teacher.component.html"
})

export class LessonTeacherComponent {

    index: number;
    lessons: Lesson[];
    selected: any;
    schedule: Schedule;
    students: any[];

    constructor(
        private _lessonService: LessonService,
        private _scheduleService: ScheduleService,
        private _userService: UserService,
        private _route: ActivatedRoute
    ) { }

    public async ngOnInit() {
        let scheduleID;
        this._route.params.subscribe(params => scheduleID = params['id']);
        this.schedule = await this._scheduleService.getSchedule(scheduleID);
        this.lessons = await this._lessonService.getLessonBySubject(this.schedule.SubjectFK, this.schedule.ClassFK);
        this.orderLessonList();
        this.initLessonList();
        this.showLesson(0);
    }

    initLessonList() {
        this.index = 0;
        var list = document.getElementById("list");
        var ul = document.createElement("ul");

        ul.setAttribute("class", "tabs");
        $(document).ready(function () {
            $('ul.tabs').tabs({
                swipeable: true
            });
        });
        var createLesson = document.createElement("a");
        createLesson.setAttribute("style", "font-size:0.85rem;");
        createLesson.setAttribute("class","col s12 m3 btn lime white-text")
        createLesson.innerHTML = "Criar Lição";
        createLesson.onclick = () => { this.createLesson() };
        
        this.lessons.forEach(
            (lesson, index) => {
            var anchor = document.createElement("a");
            anchor.setAttribute("style", "font-size:0.85rem;");
            anchor.setAttribute("class", index < 4 ? "col s12 m3 btn option white green-text text-darken-2" : "col s12 m3 btn white green-text text-darken-2 option hide")                
            anchor.innerHTML = "Lição nº" + (this.lessons.length - index);
            anchor.onclick = () => { this.showLesson(index) };
            list.appendChild(anchor);
        });
    }
    moreLesson() {
        var y = document.getElementsByClassName("option")
        if (this.index + 3 < y.length - 1) {
            y[this.index].className += " hide";
            y[this.index + 4].className = y[this.index].className.replace(" hide", "");
            this.index++;
        }
        console.log(y)
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
            ScheduleFK: this.lessons[n].ScheduleFK,
            Summary: this.lessons[n].Summary,
            ID: this.lessons[n].ID
        };
        var lesson = document.getElementById("lesson");
        if(!lesson.className.includes("hide")){
            var lesson = document.getElementById("lesson");
            lesson.className += "hide";
            var lessonInfo = document.getElementById("lessonInfo");
            lessonInfo.className = lessonInfo.className.replace(" hide","");
        }

        let element = document.getElementById("students");
        element.className = element.className.replace(" hide", "");
    }

    public async showClass() {
        let element = document.getElementById("students");
        if (element.className.includes("hide")) {
            element.className = element.className.replace("hide ","");
            let presences = await this._lessonService.getPresenceByTeacher(this.selected["ID"]);
            this.students=[];
            for(let presence of presences){
                let student=await this._userService.getProfile(presence.StudentFK);
                this.students.push({
                    StudentFK: presence.StudentFK,
                    Student: student.Name,
                    Presence: presence.Presence,
                    Material: presence.Material,
                    Behavior: presence.Behavior,
                });
            }
        } else {
            element.className = element.className.replace("container","");
            element.className += "hide container";
        }
    }

    public createLesson(){
        var lesson = document.getElementById("lesson");
        lesson.className = lesson.className.replace("hide","");
        var lessonInfo = document.getElementById("lessonInfo");
        if(!lessonInfo.className.includes("hide")){
            lessonInfo.className += " hide"
        }
    }

    public orderLessonList(){
        this.lessons.sort(function(a,b) {
            return (a.ID > b.ID) ? -1 : ((b.ID > a.ID) ? 1 : 0);
        });
    }
}
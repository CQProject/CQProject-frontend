import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LessonService } from "./../lessons/lesson.service";
import { ScheduleService } from "../utils/schedule.service";
import { UserService } from "../users/user.service";

import { Lesson } from './../lessons/iLesson';
import { Presence } from './../lessons/iPresence';
import { Schedule } from "../utils/interfaceSchedule";


@Component({
    selector: "lesson-form",
    templateUrl: "./lesson-form.component.html"
})

export class LessonFormComponent {

    index: number;
    lessons: number;
    schedule: Schedule;
    students: any[];
    lesson: any;
    subject:any;
    scheduleID: number;
    constructor(
        private _lessonService: LessonService,
        private _scheduleService: ScheduleService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _changeDetetor: ChangeDetectorRef
    ) {
    }

    public async ngOnInit() {
        this._route.params.subscribe(params => this.scheduleID = params['id']);
        this.lesson = {
            Summary:null,
            Homework:null,
            Observations:null,
            ScheduleFK: this.scheduleID
        }
        this.schedule = await this._scheduleService.getSchedule(this.scheduleID);
        this.subject= this._scheduleService.getSubject(this.schedule.SubjectFK);
        this.lessons = (await this._lessonService.getLessonBySubject(this.schedule.SubjectFK, this.schedule.ClassFK)).length + 1;
        await this.showClass();
    }

    public async showClass() {
        let element = document.getElementById("classStudents");
        let presences = await this._lessonService.getPresenceByTeacher(this.lessons);
        this.students = [];
        for (let presence of presences) {
            let student = await this._userService.getProfile(presence.StudentFK);
            this.students.push({
                StudentFK: presence.StudentFK,
                Student: student.Name,
                Presence: false,
                Material: false,
                Behavior: 4,
                LessonFK:null
            });
        }
    }

    public chooseBehavior(index: number, behavior: number){
        this.students[index].Behavior = behavior;
    }

    public async createLesson(){
        var lessonID = await this._lessonService.createLesson(this.lesson);
        for(let student of this.students){
            student.LessonFK = lessonID;
            await this._lessonService.createPostFaults(student);
        }
        this.lesson = {
            Summary:null,
            Homework:null,
            Observations:null,
            ScheduleFK: this.scheduleID
        }
        this._changeDetetor.detectChanges();
    }
}
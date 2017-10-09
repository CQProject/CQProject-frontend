import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ScheduleService } from "../../utils/schedule.service";
import { UserService } from "../../users/user.service";
import { RoomService } from "../../sensors/room.service";
import { ClassService } from "../class.service";
import { TimeService } from "../../utils/time.service";
import { AdminGuard, GuardianGuard, SecretaryGuard, StudentGuard, TeacherGuard } from "../../utils/auth-guard.service";

import { Schedule } from "../../utils/interfaceSchedule";
import { Time } from "../../utils/interfaceTime";
import { Subject } from "../../utils/iSubject";

import { UserProfile } from "../../users/iUsers";
import { Room } from "../../sensors/iRoom";
import { Class } from "../iClass";
declare var $: any;

@Component({
    selector: "primary-schedule",
    templateUrl: "./schedule.component.html",
})

export class ClassPrimaryScheduleComponent {

    private week: any[][];
    public selected: any;
    public day = ["Segunda feira", "Terça feira", "Quarta feira", "Quinta feira", "Sexta feira"];
    public cla: Class;
    private usID: number;
    public able:boolean;

    constructor(
        private _scheduleService: ScheduleService,
        private _userService: UserService,
        private _roomService: RoomService,
        private _classService: ClassService,
        private _timeService: TimeService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _changeDetetor: ChangeDetectorRef,
        public _adminGuard: AdminGuard,
        public _guardianGuard: GuardianGuard,
        public _studentGuard:StudentGuard,
        public _teacherGuard:TeacherGuard,
        public _secretaryGuard:SecretaryGuard
    ) {;
        this.week = [];
        for (var i = 0; i < this.day.length; i++)this.week[i] = [];
        this.usID=JSON.parse(localStorage.getItem('currentUser')).userID;
    }

    public async ngOnInit() {
        $(window).on('hashchange', function () {
            $('.modal-overlay').remove();
        })
        $(document).ready(function () {
            $('.modal').modal({
                dismissible: false
            });
        });
        
        let classID;
        this._route.parent.params.subscribe(params => classID = +params["id"]);
        this.cla = await this._classService.getClassProfile(classID);
        this.setHours();
        await this.setSchedule()
    }

    private async setSchedule() {
        let schedules = await this._scheduleService.getScheduleByClass(this.cla.ID);
        for (let schedule of schedules) {

            let teacher = await this._userService.getProfile(schedule.TeacherFK);
            let room = await this._roomService.getRoom(schedule.RoomFK);
            let subject = await this._scheduleService.getSubject(schedule.SubjectFK);
            let time = await this._timeService.getSingleTime(schedule.TimeFK);

            this.week[schedule.DayOfWeek - 1][time.Order - 1] = {
                ID: schedule.ID,
                StartTime: time.StartTime,
                Duration: schedule.Duration,
                DayOfWeek: schedule.DayOfWeek,
                SubjectFK: subject.ID,
                Subject: subject.Name,
                TeacherFK: teacher.ID,
                Teacher: teacher.Name,
                ClassFK: schedule.ClassFK,
                ClassName: this.cla.Year + this.cla.ClassDesc,
                RoomFK: room.ID,
                Room: room.Name
            };

            switch (schedule.DayOfWeek - 1) {
                case 0: this.insertSchedule(schedule.DayOfWeek - 1, time.Order - 1, "bigMonday", "smallMonday"); break;
                case 1: this.insertSchedule(schedule.DayOfWeek - 1, time.Order - 1, "bigTuesday", "smallTuesday"); break;
                case 2: this.insertSchedule(schedule.DayOfWeek - 1, time.Order - 1, "bigWednesday", "smallWednesday"); break;
                case 3: this.insertSchedule(schedule.DayOfWeek - 1, time.Order - 1, "bigThursday", "smallThursday"); break;
                case 4: this.insertSchedule(schedule.DayOfWeek - 1, time.Order - 1, "bigFriday", "smallFriday"); break;
            }
        }
    }

    public insertSchedule(day: number, hour: number, big: string, small: string) {
        let bigLink = document.createElement('a');
        bigLink.setAttribute('class', 'col s12 btn grey darken-2 white-text');
        bigLink.onclick = () => this.select(day, hour);
        bigLink.setAttribute('style', 'height:' + 50 * this.week[day][hour].Duration + 'px;font-size:0.9rem;margin-bottom:10px;line-height:100%;padding:15px');
        bigLink.innerHTML = "<b>" + this.week[day][hour].Subject + "</b>";
        let bigContainer = document.getElementById(big);
        bigContainer.appendChild(bigLink);

        let smallLink = document.createElement('a');
        smallLink.setAttribute('class', 'col s12 btn grey darken-2 white-text');
        smallLink.onclick = () => this.select(day, hour);
        smallLink.innerHTML = "<b>" + this.week[day][hour].Subject + "</b>";
        let smallContainer = document.getElementById(small);
        smallContainer.appendChild(smallLink);
    }

    public async setHours() {
        let times = await this._timeService.getTimeByPrimary(this.cla.SchoolFK);
        let element = document.getElementById("hoursColumn");
        var html = '<div class="col s12 center-align" style="height: 50px;"></div>';
        for (let time of times) {
            html += '<div class="col s12 center-align" style="height: 60px;border-top:1px solid #ffffff">' + time.StartTime + '<br>' + time.EndTime + '</div>'
        }
        element.innerHTML = html;
    }

    public select(day: number, hour: number) {
        this.selected = this.week[day][hour];
        this.able= (this.usID==this.selected.TeacherFK)?true:false;
        $("#scheduleModal").modal('open');
    }

    public close() {
        $("#scheduleModal").modal('close');
    }

    public accordion(id) {
        var x = document.getElementById(id);
        if (x.className.indexOf("show") == -1) {
            x.className += "show";
        } else {
            x.className = x.className.replace(" show", "");
        }
    }

    public showLessonsTeacher() {
        this._router.navigate(['/primary-class', this.cla.ID, 'teacher-lessons', this.selected.ID]);
        $('.modal').modal('close');
    }

    public showLessonsStudent() {
        this._router.navigate(['/primary-class', this.cla.ID, 'student-lessons', this.selected.ID]);
        $('.modal').modal('close');
    }
}
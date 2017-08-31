import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ScheduleService } from "./schedule.service";
import { UserService } from "../users/user.service";
import { RoomService } from "../floors/room.service";
import {ClassService} from "../classes/class.service";

import { CompleteSchedule } from "./iCompleteSchedule";
import { Schedule } from "./interfaceSchedule";
import { Subject } from "./iSubject";
import { UserProfile } from "../users/iUsers";
import { Room } from "../floors/iRoom";
import { Class } from "../classes/iClass";

@Component({
    selector: "schedule-class",
    templateUrl: "./schedule-class.component.html",
})

export class ScheduleClassComponent {

    week: CompleteSchedule[][];
    selected: CompleteSchedule;
    time:string[];
    day:string[];

    constructor(
        private _service: ScheduleService,
        private _userService: UserService,
        private _roomService: RoomService,
        private _classService: ClassService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.week = [];
        for (var i = 0; i < 5; i++)this.week[i] = [];
        this.time=["09h00-09h45", "10h05-10h50", "11h00-11h45", "13h15-14h00", "14h15-15h00"];
        this.day=["Segunda feira", "Terça feira", "Quarta feira", "Quinta feira", "Sexta feira"];
    }

    public async ngOnInit() {
        this.setHours();
        let classID;
        this._route.params.subscribe(params => classID = params['id']);
        let schedules = await this._service.getScheduleByClass(classID);
        
        for (let schedule of schedules) {
            await this.setSchedule(schedule);
        }
        
        for (var i = 0; i < this.week.length; i++) {
            switch (i) {
                case 0:
                    for (var j = 0; j < this.week[i].length; j++)
                        this.insertSchedule(i, j, "bigMonday", "smallMonday");
                    break;
                case 1:
                    for (var j = 0; j < this.week[i].length; j++)
                        this.insertSchedule(i, j, "bigTuesday", "smallTuesday");
                    break;
                case 2:
                    for (var j = 0; j < this.week[i].length; j++)
                        this.insertSchedule(i, j, "bigWednesday", "smallWednesday");
                    break;
                case 3:
                    for (var j = 0; j < this.week[i].length; j++)
                        this.insertSchedule(i, j, "bigThursday", "smallThursday");
                    break;
                case 4:
                    for (var j = 0; j < this.week[i].length; j++)
                        this.insertSchedule(i, j, "bigFriday", "smallFriday");
                    break;
                default: break;
            }
        }
    }

    private async setSchedule(schedule: Schedule) {
        let teacher = await this._userService.getProfile(schedule.TeacherFK);
        let room = await this._roomService.getRoom(schedule.RoomFK);
        let subject = await this._service.getSubject(schedule.SubjectFK);
        let cla = await this._classService.getClassProfile(schedule.ClassFK);

        this.week[schedule.DayOfWeek - 1][schedule.StartingTime] = {
            ID: schedule.ID,
            StartingTime: schedule.StartingTime,
            Duration: schedule.Duration,
            DayOfWeek: schedule.DayOfWeek,
            SubjectFK: subject.ID,
            Subject: subject.Name,
            TeacherFK: teacher.ID,
            Teacher: teacher.Name,
            ClassFK: schedule.ClassFK,
            ClassName:cla.Year+cla.ClassDesc,
            RoomFK: room.ID,
            Room: room.Name
        };
    }

    public insertSchedule(day: number, hour: number, big: string, small: string) {
        let bigLink = document.createElement('a');
        bigLink.setAttribute('class', 'w3-col w3-button w3-hover-lime w3-border');
        bigLink.onclick = () => this.select(day, hour);
        bigLink.setAttribute('style', 'height:' + 50 * this.week[day][hour].Duration + 'px');
        bigLink.innerHTML = "<b>" + this.week[day][hour].Subject + "</b>";
        let bigContainer = document.getElementById(big);
        bigContainer.appendChild(bigLink);

        let smallLink = document.createElement('a');
        smallLink.setAttribute('class', 'w3-col w3-button w3-lime w3-hover-khaki');
        smallLink.onclick = () => this.select(day, hour);
        smallLink.innerHTML = "<b>" + this.week[day][hour].Subject + "</b>";
        let smallContainer = document.getElementById(small);
        smallContainer.appendChild(smallLink);
    }

    public setHours(){
        let element = document.getElementById("hoursColumn");
        var html='<div class="w3-col w3-khaki w3-border-bottom" style="height: 50px;"></div>';
        for(let time of this.time){
            let split = time.split("-");
            html+='<div class="w3-col w3-green w3-border-bottom" style="height: 50px;">'+split[0]+'<br>'+split[1]+'</div>'
        }
        element.innerHTML=html;
    }

    public select(day: number, hour: number) {
        this.selected = this.week[day][hour];
        document.getElementById("scheduleModal").style.display = 'block';
    }

    public hide() {
        document.getElementById("scheduleModal").style.display = 'none';
    }

    public accordion(id) {
        var x = document.getElementById(id);
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else { 
            x.className = x.className.replace(" w3-show", "");
        }
    }
}
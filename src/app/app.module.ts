import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, EmailValidator } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import 'zone.js';
import 'reflect-metadata';
//Component
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home.component";
import { NavbarComponent } from "./components/navbar.component";
import { NotFoundComponent } from "./components/nfound.component";

import { LessonScheduleComponent } from "./components/lesson-schedule.component";
import { ScheduleStudentComponent } from "./components/schedule-student.component";

//Service
import { HomeService } from "./services/home.service";
import { AccountService } from "./services/account.service";
//Pipes


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'schedule/day', component: ScheduleStudentComponent },
      { path: 'schedule/lesson', component: LessonScheduleComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  exports: [RouterModule],
  declarations: [
    //Component
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    ScheduleStudentComponent,
    LessonScheduleComponent,
    //Pipe
  ],
  providers: [
    //Service
    HomeService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

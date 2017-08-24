import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, EmailValidator } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import 'zone.js';
import 'reflect-metadata';
//Component
import { AppComponent } from "./app.component";
import { AccountNavbarComponent } from "./account/account-navbar.component";
import { AccountHomeComponent } from "./account/account-home.component";
import { NotificationCounterComponent } from "./notifications/notification-link.component";
import { NotFoundComponent } from "./notfound/nfound.component";
import { SchoolHomeComponent } from "./schools/school-home.component";
import { LessonTeacherComponent } from "./lessons/lesson-teacher.component";
import { ScheduleStudentComponent } from "./schedules/schedule-student.component";
import { NotificationMenuComponent } from "./notifications/notification-menu.component";
import { FloorMapComponent } from "./Floors/floor-map.component";
//Service
import { SchoolService } from "./schools/school.service";
import { AccountService } from "./account/account.service";
import { AuthGuard, AdminGuard, AssistantGuard, GuardianGuard, SecretaryGuard, StudentrGuard, TeacherGuard } from "./account/auth-guard.service";
import { UserService } from "./users/user.service";
import { NotificationService } from "./notifications/notification.service";
import { FloorService } from "./Floors/floor.service";
//Pipes


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AccountHomeComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
      { path: 'schools', component: SchoolHomeComponent },
      { path: 'schedules/student', component: ScheduleStudentComponent, canActivate: [AuthGuard], data: { roles: [1, 3, 5, 6] } },
      { path: 'lessons/teacher', component: LessonTeacherComponent, canActivate: [AuthGuard], data: { roles: [2, 3, 6] } },
      { path: 'notifications', component: NotificationMenuComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
      { path: 'floor/school/:id', component: FloorMapComponent, canActivate: [AuthGuard], data: { roles: [ 4, 6] } },
      { path: '**', component: NotFoundComponent }
    ], { useHash: true })
  ],
  exports: [RouterModule],
  declarations: [
    //Component
    AppComponent,
    AccountNavbarComponent,
    AccountHomeComponent,
    NotFoundComponent,
    SchoolHomeComponent,
    ScheduleStudentComponent,
    LessonTeacherComponent,
    NotificationCounterComponent,
    NotificationMenuComponent,
    FloorMapComponent
    //Pipe
  ],
  providers: [
    AuthGuard,
    AssistantGuard,
    AdminGuard,
    TeacherGuard,
    StudentrGuard,
    GuardianGuard,
    SecretaryGuard,
    AccountService,
    UserService,
    NotificationService,
    SchoolService,
    FloorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

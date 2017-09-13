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
import { UserProfileComponent } from "./users/user-profile.component";
import { NotFoundComponent } from "./notfound/nfound.component";
import { SchoolHomeComponent } from "./schools/school-home.component";
import { SchoolFormComponent } from "./schools/school-form.component";
import { NotificationCounterComponent } from "./notifications/notification-link.component";
import { NotificationMenuComponent } from "./notifications/notification-menu.component";
import { FloorMainComponent } from "./sensors/main.component";
import { FloorMapComponent } from "./sensors/floor-map.component";
import {FloorFormComponent} from "./sensors/floor-form.component"
import { SensorComponent } from "./sensors/sensor.component";
import { ClassMainComponent } from "./classes/main.component";
import { ClassPrimaryProfileComponent } from "./classes/primary/profile.component";
import { ClassPrimaryStudentsComponent } from "./classes/primary/students.component";
import { ClassPrimaryScheduleComponent } from "./classes/primary/schedule.component";
import { ClassPrimaryListComponent } from "./classes/primary/list.component";
import { ClassKindergartenListComponent } from "./classes/kindergarten/list.component";
import{ClassPrimaryDocumentComponent} from "./classes/primary/doc.component";
import { LessonTeacherComponent } from "./lessons/lesson-teacher.component";
import { LessonStudentComponent } from "./lessons/lesson-student.component";
import { UserDetailsComponent} from "./users/user-details.component";
import { StudentHomeComponent } from "./account/student-home.component";
//Service
import { SchoolService } from "./schools/school.service";
import { AccountService } from "./account/account.service";
import { AuthGuard, AdminGuard, AssistantGuard, GuardianGuard, SecretaryGuard, StudentGuard, TeacherGuard } from "./utils/auth-guard.service";
import { UserService } from "./users/user.service";
import { NotificationService } from "./notifications/notification.service";
import { FloorService } from "./sensors/floor.service";
import { FileService } from "./utils/files.service";
import { ClassService } from "./classes/class.service";
import { RoomService } from "./sensors/room.service";
import { ScheduleService } from "./utils/schedule.service";
import { LessonService } from "./lessons/lesson.service";
import { TimeService } from "./utils/time.service";
import { SensorService } from "./sensors/sensor.service";
import { DocumentService } from "./utils/document.service";
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
      { path: 'school/create', component: SchoolFormComponent, canActivate: [AuthGuard], data: { roles: [6] } },
      { path: 'notifications', component: NotificationMenuComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
      {
        path: 'building/school/:id', component: FloorMainComponent, canActivate: [AuthGuard], data: { roles: [4, 6] },
        children: [
          { path: 'room/:id', component: SensorComponent },
          { path: 'floor/:id', component: FloorMapComponent },
          { path: 'floor-form', component: FloorFormComponent }
        ]
      },
      { path: 'user/profile/:id', component: UserProfileComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
      { path: 'user/details/:id', component: UserDetailsComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },      
      {
        path: 'class/school/:id', component: ClassMainComponent, canActivate: [AuthGuard], data: { roles: [3, 6] },
        children: [
          { path: '', redirectTo: 'primary', pathMatch: 'full' },
          { path: 'primary', component: ClassPrimaryListComponent },
          { path: 'kindergarten', component: ClassKindergartenListComponent }
        ]
      },
      {
        path: 'primary/class/:id', component: ClassPrimaryProfileComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 5, 6] },
        children: [
          { path: '', redirectTo: 'schedule', pathMatch: 'full' },
          { path: 'student', component: ClassPrimaryStudentsComponent, canActivate: [AuthGuard], data: { roles: [2, 3, 6] } },
          { path: 'schedule', component: ClassPrimaryScheduleComponent },
          { path: 'document', component: ClassPrimaryDocumentComponent },
          { path: 'teacher-lessons/:id', component: LessonTeacherComponent, canActivate: [AuthGuard], data: { roles: [2, 3, 6] } },
          { path: 'student-lessons/:id', component: LessonStudentComponent, canActivate: [AuthGuard], data: { roles: [1, 5] } }
        ]
      },
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
    SchoolFormComponent,
    NotificationCounterComponent,
    NotificationMenuComponent,
    FloorMainComponent,
    FloorMapComponent,
    FloorFormComponent,
    SensorComponent,
    UserProfileComponent,
    ClassMainComponent,
    ClassPrimaryProfileComponent,
    ClassPrimaryStudentsComponent,
    ClassKindergartenListComponent,
    ClassPrimaryListComponent,
    ClassPrimaryDocumentComponent,
    ClassPrimaryScheduleComponent,
    LessonTeacherComponent,
    LessonStudentComponent,
    UserDetailsComponent,
    StudentHomeComponent
    //Pipe
  ],
  providers: [
    AuthGuard,
    AssistantGuard,
    AdminGuard,
    TeacherGuard,
    StudentGuard,
    GuardianGuard,
    SecretaryGuard,
    AccountService,
    UserService,
    NotificationService,
    SchoolService,
    FloorService,
    FileService,
    ClassService,
    ScheduleService,
    RoomService,
    LessonService,
    TimeService,
    SensorService,
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

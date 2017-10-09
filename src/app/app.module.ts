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
import { HomepageComponent } from "./index/homepage.component";
import { AccountNavbarComponent } from "./account/account-navbar.component";
import { AccountHomeComponent } from "./account/account-home.component";
import { NotFoundComponent } from "./notfound/nfound.component";
import { SchoolListComponent } from "./schools/school-list.component";
import { NotificationCounterComponent } from "./notifications/notification-link.component";
import { NotificationMenuComponent } from "./notifications/notification-menu.component";
import { FloorMainComponent } from "./sensors/main.component";
import { FloorMapComponent } from "./sensors/floor-map.component";
import { RoomComponent } from "./sensors/room.component";
import { SchoolProfileComponent } from "./schools/school-profile.component";
import { ClassPrimaryProfileComponent } from "./classes/primary/profile.component";
import { ClassPrimaryStudentsComponent } from "./classes/primary/students.component";
import { ClassPrimaryScheduleComponent } from "./classes/primary/schedule.component";
import { ClassListComponent } from "./classes/list.component";
import { ClassPrimaryDocumentComponent } from "./classes/primary/doc.component";
import { ClassPrimaryEvaluationComponent } from "./classes/primary/evaluations.component";
import { LessonTeacherComponent } from "./lessons/lesson-teacher.component";
import { LessonStudentComponent } from "./lessons/lesson-student.component";
import { MainFormComponent } from "./users/main.component";
import { SchoolFormComponent } from "./forms/school-form.component";
import { FloorFormComponent } from "./forms/floor-form.component";
import { RoomFormComponent } from "./forms/room-form.component";
import { SensorFormComponent } from "./forms/sensor-form.component";
import { ClassFormComponent } from "./forms/class-form.component";
import { UserFormComponent } from "./forms/user-form.component";
import { UserDetailsComponent } from "./users/user-details.component";
import { NotificationReceivedComponent } from "./notifications/notification-received.component";
import { NotificationSentComponent } from "./notifications/notification-sent.component";
import { StudentGuardFormComponent } from "./forms/student-guardian-form.component";
import { LessonFormComponent } from "./forms/lesson-form.component";
import { NotificationFormComponent } from "./notifications/notification-form.component";
import { ChildrenListComponent } from "./users/children-list.component";
import { ClassListTeacherComponent } from "./classes/list-teacher.component";
import { ClassListStudentComponent } from "./classes/list-student.component";
import { UserClassFormComponent } from "./forms/user-class-form.component";
import { TeacherListComponent } from "./users/teacher-list.component";
import { ParentListComponent } from "./users/parents-list.component";
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
import { EvaluationService } from "./utils/evaluation.service";
import { NoticeService } from "./schools/notice.service";
import { ParentingService } from "./users/parenting.service";
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
      { path: 'homepage', component: HomepageComponent },
      { path: 'schools', component: SchoolListComponent },
      { path: 'school/:id', component: SchoolProfileComponent },
      { path: 'form-school', component: SchoolFormComponent, canActivate: [AuthGuard], data: { roles: [6] } },
      {
        path: 'notifications', component: NotificationMenuComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] },
        children: [
          { path: '', redirectTo: 'received', pathMatch: 'full' },
          { path: 'received', component: NotificationReceivedComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
          { path: 'sent', component: NotificationSentComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
          { path: 'sendToUser/:id', component: NotificationFormComponent }
        ]
      },
      {
        path: 'users', component: MainFormComponent, canActivate: [AuthGuard], data: { roles: [3, 6] },
        children: [
          { path: '', redirectTo: 'user', pathMatch: 'full' },
          { path: 'addUser', component: UserFormComponent },
          { path: 'addStudguard', component: StudentGuardFormComponent },
          { path: 'teachers', component:TeacherListComponent}
        ]
      },
      {
        path: 'building/school/:id', component: FloorMainComponent, canActivate: [AuthGuard], data: { roles: [4, 6] },
        children: [
          { path: 'room/:id', component: RoomComponent },
          { path: 'floor/:id', component: FloorMapComponent },
          { path: 'form-floor', component: FloorFormComponent, canActivate: [AuthGuard], data: { roles: [6] } },
          { path: 'floor/:id/addroom', component: RoomFormComponent, canActivate: [AuthGuard], data: { roles: [6] } },
          { path: 'floor/:id/addsensor', component: SensorFormComponent, canActivate: [AuthGuard], data: { roles: [6] } }
        ]
      },
      { path: 'user/details/:id', component: UserDetailsComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
      { path: 'classes/school/:id', component: ClassListComponent, canActivate: [AuthGuard], data: { roles: [3, 6] } },
      { path: 'school/addclass/:id', component: ClassFormComponent, canActivate: [AuthGuard], data: { roles: [3, 6] } },
      {
        path: 'primary-class/:id', component: ClassPrimaryProfileComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 5, 6] },
        children: [
          { path: '', redirectTo: 'schedule', pathMatch: 'full' },
          { path: 'student', component: ClassPrimaryStudentsComponent, canActivate: [AuthGuard], data: { roles: [2, 3, 6] } },
          { path: 'schedule', component: ClassPrimaryScheduleComponent },
          { path: 'evaluation', component: ClassPrimaryEvaluationComponent },
          { path: 'document', component: ClassPrimaryDocumentComponent },
          { path: 'teacher-lessons/:id', component: LessonTeacherComponent, canActivate: [AuthGuard], data: { roles: [2, 3, 6] } },
          { path: 'student-lessons/:id', component: LessonStudentComponent, canActivate: [AuthGuard], data: { roles: [1, 5] } },
          { path: 'form-lesson/:id', component: LessonFormComponent, canActivate: [AuthGuard], data: { roles: [2] } },
          { path: 'form-addstudent', component:UserClassFormComponent, canActivate: [AuthGuard], data: { roles: [3, 6] }}, 
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
    SchoolListComponent,
    SchoolFormComponent,
    NotificationCounterComponent,
    NotificationMenuComponent,
    FloorMainComponent,
    FloorMapComponent,
    FloorFormComponent,
    RoomComponent,
    SchoolProfileComponent,
    ClassPrimaryProfileComponent,
    ClassPrimaryStudentsComponent,
    ClassListComponent,
    ClassPrimaryDocumentComponent,
    ClassPrimaryScheduleComponent,
    ClassPrimaryEvaluationComponent,
    LessonTeacherComponent,
    LessonStudentComponent,
    MainFormComponent,
    RoomFormComponent,
    SensorFormComponent,
    ClassFormComponent,
    LessonStudentComponent,
    UserDetailsComponent,
    NotificationReceivedComponent,
    NotificationSentComponent,
    HomepageComponent,
    UserFormComponent,
    StudentGuardFormComponent,
    LessonFormComponent,
    NotificationFormComponent,
    ChildrenListComponent,
    ClassListTeacherComponent,
    UserClassFormComponent,
    TeacherListComponent,
    ParentListComponent,
    ClassListStudentComponent
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
    DocumentService,
    EvaluationService,
    NoticeService,
    ParentingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

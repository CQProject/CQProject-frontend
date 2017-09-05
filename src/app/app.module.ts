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
import { FloorMapComponent } from "./floors/floor-map.component";
import { ClassListComponent } from "./classes/list.component";
import { ClassPrimaryProfileComponent } from "./classes/primary/profile.component";
import { ClassPrimaryStudentsComponent } from "./classes/primary/students.component";
import { ClassPrimaryScheduleComponent } from "./classes/primary/schedule.component";
import { LessonListComponent } from "./lessons/lesson-list.component";
//Service
import { SchoolService } from "./schools/school.service";
import { AccountService } from "./account/account.service";
import { AuthGuard, AdminGuard, AssistantGuard, GuardianGuard, SecretaryGuard, StudentGuard, TeacherGuard } from "./utils/auth-guard.service";
import { UserService } from "./users/user.service";
import { NotificationService } from "./notifications/notification.service";
import { FloorService } from "./floors/floor.service";
import { FileService } from "./utils/files.service";
import { ClassService } from "./classes/class.service";
import { RoomService } from "./floors/room.service";
import { ScheduleService } from "./utils/schedule.service";
import { LessonService} from "./lessons/lesson.service";
import { TimeService } from "./utils/time.service";
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
      { path: 'schools/create', component: SchoolFormComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] }},
      { path: 'notifications', component: NotificationMenuComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
      { path: 'floor/school/:id', component: FloorMapComponent, canActivate: [AuthGuard], data: { roles: [4, 6] } },
      { path: 'user/profile/:id', component: UserProfileComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 4, 5, 6] } },
      { path: 'class/school/:id', component: ClassListComponent, canActivate: [AuthGuard], data: { roles: [3, 6] } },
      { path: 'class/primary/profile/:id', component: ClassPrimaryProfileComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 5, 6] } },
      { path: 'class/primary/student/:id', component: ClassPrimaryStudentsComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 5, 6] } },
      { path: 'class/primary/schedule/:id', component: ClassPrimaryScheduleComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 5, 6] } },
      { path: 'lessons/:id', component: LessonListComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3, 5, 6] } },
      
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
    ClassPrimaryScheduleComponent,
    LessonListComponent,
    NotificationCounterComponent,
    NotificationMenuComponent,
    FloorMapComponent,
    UserProfileComponent,
    ClassListComponent,
    ClassPrimaryProfileComponent,
    ClassPrimaryStudentsComponent
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
    TimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

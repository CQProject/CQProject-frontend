import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../account/account.service";
import { AdminGuard,AssistantGuard,GuardianGuard,SecretaryGuard,StudentGuard,TeacherGuard } from "../utils/auth-guard.service"
import { Account } from "../account/iAccount";
import { UserService } from "../users/user.service";
import { UserDetails,UserDetailsToPost } from "../users/iUsers";
import { FileService } from "../utils/files.service";

@Component({
    selector: 'user-details',
    templateUrl: "./user-details.component.html"
})

export class UserDetailsComponent {

    private profileDetails: UserDetails;
    private profilePhoto: File;
    private profileToPost: UserDetailsToPost;
    private userRole: number[];

    constructor(
        private _service: AccountService,
        private _userService: UserService,
        private _fileService: FileService,
        private _router: Router,
        private _adminGuard: AdminGuard,
        private _assistantGuard: AssistantGuard,
        private _guardianGuard: GuardianGuard,
        private _secretaryGuard: SecretaryGuard,
        private _studentGuard: StudentGuard,
        private _teacherGuard: TeacherGuard
    ) {
        this.profileToPost = new UserDetailsToPost();
    }

    public async ngOnInit() {
        let userID = JSON.parse(localStorage.getItem('currentUser')).userID;
        this.profileDetails = await this._userService.getUserDetails(userID);
        this.profileToPost = this.profileDetails;
        await this._fileService.imageDownload(this.profileDetails.Photo)
            .subscribe((res) => { this.profilePhoto = res; });
        this.userRole = JSON.parse(localStorage.getItem('currentUser')).roles;
    }

    public showInput(id: string) {
        var input = <HTMLElement>document.querySelector("#" + id);
        input.removeAttribute("readonly");
        input.removeAttribute("style");
        input.className += " w3-animate-right w3-border";
    }

    public showSubmit(event: any){
        var btn = <HTMLElement> document.querySelector("#submitChanges");
        btn.className = btn.className.replace("w3-hide","w3-show");
    }

    public async submitChanges(){
        let res = await this._userService.putUserDetails(this.profileToPost);
    }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from "../users/user.service";
import { FileService } from "../utils/files.service";
import { AdminGuard } from "../utils/auth-guard.service";

import { UserDetailsToPost } from '../users/iUsers';
declare var $: any;

@Component({
    selector: "student-guardian-form",
    templateUrl: "./student-guardian-form.component.html"
})

export class StudentGuardFormComponent {

    student: UserDetailsToPost;
    guardian: UserDetailsToPost;

    constructor(
        public _userService: UserService,
        public _fileService: FileService,
        public _adminGuard: AdminGuard
    ) { }

    public ngOnInit() {
        $(document).ready(function () {
            $('#guardians').autocomplete({
                data: {
                },
                limit: 20,
                onAutocomplete: function (val) {

                },
                minLength: 3,
            });
            $('#students').autocomplete({
                data: {
                },
                limit: 20,
                onAutocomplete: function (val) {

                },
                minLength: 3,
            });
        })
    }
}
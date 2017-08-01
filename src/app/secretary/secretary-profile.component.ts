import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SecretaryService } from './secretary.service';
import { ISecretaryProfile } from '../interfaces';

@Component({
    templateUrl: "app/secretary/secretary-profile.component.html",
    providers: [SecretaryService]
})

export class SecretaryProfileComponent implements OnInit {

    // Attributes that will be used on views
    secretary: ISecretaryProfile;
    title = 'DASHBOARD';
    subtitle = 'Secretary Profile';

    constructor(
        private _service: SecretaryService,
        private _route: ActivatedRoute, 
        private router: Router
    ) { }

    // Method that is called on initialization of the page
    ngOnInit(): void {
        this._route.params
            .switchMap((params: Params) => this._service.getSecretary(params['id']))
            .subscribe(
                secretary => {
                    this.secretary = secretary
                    console.log(this.secretary)
                },
                error => console.log("Error to load Secretary Profile")
            );
    }
}
import { Component, OnInit } from "@angular/core";
import { SecretaryService } from './secretary.service';

import 'rxjs/add/operator/switchMap';
import { ISecretaryList } from '../interfaces';

@Component({
    templateUrl: "app/groups/group-list.component.html",
    providers: [Service]
})

export class GroupListComponent implements OnInit {
    // Attributes that will be used on views
    secretaries: ISecretaryList[];
    errorMessage: string;
    searchFilter: string;
    title = 'DASHBOARD';
    subtitle = 'Secretariat';
    
    constructor( private _service: Service ) { }

    // Method that is called on initialization of the page
    ngOnInit(): void {
        this._service.listSecretaries().subscribe(
                secretaries => this.secretaries = secretaries , 
                error => console.log("Impossível carregar lista de grupos" )
            );
    }   
}
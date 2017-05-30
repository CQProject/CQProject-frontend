import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from "@angular/core";
import 'rxjs/add/operator/switchMap';
import { DashboardService } from './dashboard.service';
import { ISecretarySummary } from '../interfaces';

@Component({
    templateUrl: "app/dashboard/dashboard-list.component.html",
    providers: [DashboardService]
})

export class DashboardListComponent implements OnInit {
    // Attributes that will be used on views
    secretaries: ISecretarySummary[];
    searchFilter: string;
    title = 'DASHBOARD';
    subtitle = 'Users';

    constructor( private _service: DashboardService ) { }

    // Method that is called on initialization of the page
    ngOnInit(): void {
        this._service.getSecretaries().subscribe(
                secretaries => {
                    this.secretaries = secretaries 
                    console.log(this.secretaries)
                }, 
                error => console.log("Error to load Secretaries" )
            );
    }   
}
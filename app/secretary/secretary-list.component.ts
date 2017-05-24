import { Component, OnInit } from "@angular/core";
import 'rxjs/add/operator/switchMap';
import { SecretaryService } from './secretary.service';
import { ISecretaryList } from '../interfaces';

@Component({
    templateUrl: "app/secretary/secretary-list.component.html",
    providers: [SecretaryService]
})

export class SecretariesListComponent implements OnInit {
    // Attributes that will be used on views
    secretaries: ISecretaryList[];
    searchFilter: string;
    title = 'DASHBOARD';
    subtitle = 'Secretariat';
    
    constructor( private _service: SecretaryService ) { }

    // Method that is called on initialization of the page
    ngOnInit(): void {
        this._service.listSecretaries().subscribe(
                secretaries => {
                    this.secretaries = secretaries 
                    console.log(this.secretaries)
                }, 
                error => console.log("Error to load Secretaries" )
            );
    }   
}
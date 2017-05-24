import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { API } from '../main';
import { ISecretaryList, ISecretaryProfile } from '../interfaces';

@Injectable()
export class SecretaryService {

    headers: Headers;
    options: RequestOptions;
    apiURL = API.url;

    constructor(private _http: Http) { }


    listSecretaries(): Observable<ISecretaryList[]> { 
        return this._http
            .get(this.apiURL+'/secretary')
            .map((response: Response) => <ISecretaryList[]> response.json().data )
            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
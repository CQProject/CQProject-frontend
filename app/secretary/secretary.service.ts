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

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });
    }


    listSecretaries(): Observable<ISecretaryList[]> {
        return this._http
            .get(this.apiURL + '/secretary', this.options)
            .map((response: Response) => <ISecretaryList[]>response.json())
            .catch(this.handleError);
    }

    getSecretary(id: number): Observable<ISecretaryProfile> {
        return this._http
            .get(this.apiURL+`/secretary/${id}`, this.options)
            .map((response: Response) => <ISecretaryProfile> response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
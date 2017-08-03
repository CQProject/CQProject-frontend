// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/toPromise';

import { IUser } from "../interfaces/user";
import { API } from '../../main';

@Injectable()
export class LoginService {


    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._options = new RequestOptions({ headers: this._headers });
    }

    public login(email: String, password: String): Observable<IUser> {
        var toPost = JSON.stringify({
            "email": email,
            "password": password
        });

        return this._http
            .post(this._apiURL + '/account/login', toPost, this._options)
            .map((res: Response) => res.json().data)
            .catch(this._handleError);
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    public logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}

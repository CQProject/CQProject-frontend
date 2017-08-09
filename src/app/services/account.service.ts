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
export class AccountService {


    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
    }

    public login(email: String, password: String): Observable<IUser> {
        
        var toPost = JSON.stringify({
            "email": email,
            "password": password
        });

        this._options = new RequestOptions({ headers: this._headers });

        return this._http
            .post(this._apiURL + '/account/login', toPost, this._options)
            .map((res: Response) => {
                let json = res.json();
                if (json.result) {
                    return {
                        "email": email,
                        "password": password,
                        "token": json.data.token,
                        "userID": json.data.userID,
                        "roles": json.data.roles,
                        "classID": json.data.classID,
                        "name": json.data.name,
                        "photo": "../../assets/img/" + json.data.photo
                    }
                } else {
                    return null;
                }
            })
            .catch(this._handleError);
    }

    public async verifyToken(): Promise<Boolean> {

        this._headers.append('Authorization', <string> JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
        
        let res = await this._http
            .get(this._apiURL + '/account/verifytoken', this._options)
            .toPromise();

        return res.json().result ? res.json().data : res.json().result;
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

}

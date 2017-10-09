// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'materialize-css';
import { toast } from 'materialize-css';

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/toPromise';

import { School } from "./iSchool";
import { API } from '../../main';

@Injectable()
export class SchoolService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async getSchools(): Promise<School[]> {
        let response = await this._http
            .get(this._apiURL + '/school', this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getSchool(schoolID: number): Promise<School> {
        let response = await this._http
            .get(this._apiURL + `/school/${schoolID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async createSchool(school: School): Promise<boolean> {
        var toPost = JSON.stringify({
            Name: school.Name,
            Logo: school.Logo,
            ProfilePicture: school.ProfilePicture,
            Acronym: school.Acronym,
            About: school.About
        });

        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });

        let res = await this._http
            .post(this._apiURL + '/school', toPost, this._options).toPromise();

        if (res.json().result) {
            toast("Escola criada com sucesso",4000,'lime')
            return res.json().data;
        }
        else {
            toast(res.json().info,4000,'lime');
            return null;
        }
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
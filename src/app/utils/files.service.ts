// Imports
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { API } from '../../main';

@Injectable()
export class FileService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(
        private _http: Http,
        private _sanitizer: DomSanitizer
    ) { }

    public publicDownload(filename: String): Observable<any> {
        this._options = new RequestOptions({ headers: new Headers(), responseType: ResponseContentType.Blob });

        return this._http
            .get(this._apiURL + `/download/public/${filename}`, this._options)
            .map((res) => {
                return this._sanitizer
                    .bypassSecurityTrustResourceUrl(window.URL.createObjectURL(
                        new Blob([res.blob()], { type: res.headers.get("Content-Type") })
                    ));
            })
            .catch(this._handleError);
    }

    public imageDownload(filename: String): Observable<any> {
        this._headers = new Headers();
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers, responseType: ResponseContentType.Blob });

        return this._http
            .get(this._apiURL + `/download/image/${filename}`, this._options)
            .map((res) => {
                return this._sanitizer
                    .bypassSecurityTrustResourceUrl(window.URL.createObjectURL(
                        new Blob([res.blob()], { type: res.headers.get("Content-Type") })
                    ));
            })
            .catch(this._handleError);
    }

    public fileDownload(filename: String): Observable<any> {
        this._headers = new Headers();
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers, responseType: ResponseContentType.Blob });

        return this._http
            .get(this._apiURL + `/download/doc/${filename}`, this._options)
            .map((res) => {
                if (res.headers.get("Content-Type") == 'application/pdf') {
                    return this._sanitizer
                        .bypassSecurityTrustResourceUrl(window.URL.createObjectURL(
                            new Blob([res.blob()], { type: 'application/pdf' })
                        ));
                } else {
                   return this._sanitizer
                    .bypassSecurityTrustResourceUrl(window.URL.createObjectURL(
                        new Blob([res.blob()], { type: res.headers.get("Content-Type") })
                    ));
                }
            })
            .catch(this._handleError);
    }


    public fileUpload(toPost: FormData): Observable<String> {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'multipart/form-data');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });

        return this._http
            .post(this._apiURL + '/upload/doc', toPost, this._options)
            .map((res: Response) => {
                if (res.json().result) {
                    return res.json().data;
                } else {
                    console.log(res.json().info);
                    return null;
                }
            })
            .catch(this._handleError);
    }

    public imageUpload(toPost: FormData): Observable<String> {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'multipart/form-data');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });

        return this._http
            .post(this._apiURL + '/upload/image', toPost, this._options)
            .map((res: Response) => {
                if (res.json().result) {
                    return res.json().data;
                } else {
                    console.log(res.json().info);
                    return null;
                }
            })
            .catch(this._handleError);
    }



    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
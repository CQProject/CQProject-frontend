// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Notification, ReceivedNotification } from "./iNotifications";
import { Validation, SentValidation } from "./iValidations";
import { API } from '../../main';

@Injectable()
export class NotificationService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async count(): Promise<Number> {
        let response = await this._http
            .get(this._apiURL + '/notification/unreadcount', this._options)
            .toPromise();

        return response.json().result ? response.json().data : 0;
    }

    public async getValidationsByPage(pageID: Number): Promise<Validation[]> {
        let response = await this._http
            .get(this._apiURL + `/notification/received/${pageID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getValidationsByNotification(notifID: Number): Promise<Validation[]> {
        let response = await this._http
            .get(this._apiURL + `/validation/notification/${notifID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getReceivedNotification(notifID: Number): Promise<Notification> {
        let response = await this._http
            .get(this._apiURL + `/notification/message/${notifID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getSentNotification(pageID: Number): Promise<Notification[]> {
        let response = await this._http
            .get(this._apiURL + `/notification/sent/${pageID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public sendToClass(subject: String, description: String, urgency: Boolean, approval: Boolean, classID: Number) {
        var toPost = JSON.stringify({
            "Subject": subject,
            "Description": description,
            "Urgency": urgency,
            "Approval": approval,
            "SenderFK": JSON.parse(localStorage.getItem('currentUser')).userID,
            "ClassFK": classID
        });

        return this._http
            .post(this._apiURL + '/notification/class', toPost, this._options)
            .map((response: Response) => {
                response.json().result ? console.log("Notificação enviada com sucesso") : console.log(response.json().info);
            })
            .catch(this._handleError);
    }

    public sendToUser(subject: String, description: String, urgency: Boolean, approval: Boolean, userID: Number) {
        var toPost = JSON.stringify({
            "Subject": subject,
            "Description": description,
            "Urgency": urgency,
            "Approval": approval,
            "SenderFK": JSON.parse(localStorage.getItem('currentUser')).userID,
            "ReceiverFK": userID
        });

        return this._http
            .post(this._apiURL + '/notification/user', toPost, this._options)
            .map((response: Response) => {
                response.json().result ? console.log("Notificação enviada com sucesso") : console.log(response.json().info);
            })
            .catch(this._handleError);
    }

    public read(notificationID: Number) {
        return this._http
            .put(this._apiURL + `/notification/read/${notificationID}`, null, this._options)
            .map((response: Response) => {
                response.json().result ? console.log("Notificação lida com sucesso") : console.log(response.json().info);
            })
            .catch(this._handleError);
    }

    public accept(notificationID: Number) {
        return this._http
            .put(this._apiURL + `/notification/accept/${notificationID}`, null, this._options)
            .map((response: Response) => {
                response.json().result ? console.log("Notificação aceite com sucesso") : console.log(response.json().info);
            })
            .catch(this._handleError);
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
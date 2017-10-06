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

    public async count(): Promise<number> {
        let response = await this._http
            .get(this._apiURL + '/notification/unreadcount', this._options)
            .toPromise();

        return response.json().result ? response.json().data : 0;
    }

    public async getReceived(pageID: number): Promise<Validation[]> {
        let response = await this._http
            .get(this._apiURL + `/notification/received/${pageID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getSent(pageID: number): Promise<Notification[]> {
        let response = await this._http
            .get(this._apiURL + `/notification/sent/${pageID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getMessage(notifID: number): Promise<Notification> {
        let response = await this._http
            .get(this._apiURL + `/notification/message/${notifID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getValidations(notifID: number): Promise<Validation[]> {
        let response = await this._http
            .get(this._apiURL + `/validation/notification/${notifID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public sendToClass(subject: string, description: string, urgency: boolean, approval: boolean, classID: number) {
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

    public async sendToUser(notification: any): Promise<string> {
        var toPost = JSON.stringify({
            "Subject": notification.Subject,
            "Description": notification.Description,
            "Urgency": notification.Urgency,
            "Approval": notification.Approval,
            "SenderFK": notification.SenderFK,
            "ReceiverFK": notification.ReceiverFK[0]
        });
        let response = await this._http
        .post(this._apiURL + `/notification/user`,toPost, this._options)
        .toPromise();

    if (response.json().result) return response.json().data;
    else {
        console.log(response.json().info);
        return null;
    }
        
    }

    public read(notificationID: number) {
        return this._http
            .put(this._apiURL + `/notification/read/${notificationID}`, null, this._options)
            .map((response: Response) => {
                response.json().result ? console.log("Notificação lida com sucesso") : console.log(response.json().info);
            })
            .catch(this._handleError);
    }

    public accept(notificationID: number) {
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
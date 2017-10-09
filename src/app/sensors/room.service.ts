// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'materialize-css';
import { toast } from 'materialize-css';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { API } from '../../main';
import { Room } from "./iRoom";

@Injectable()
export class RoomService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async getRoomByFloor(floorID: number): Promise<Room[]> {
        let response = await this._http
            .get(this._apiURL + `/room/floor/${floorID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getRoom(roomID: number): Promise<Room> {
        let response = await this._http
            .get(this._apiURL + `/room/single/${roomID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async createRoom(room: Room): Promise<boolean> {
        var toPost = JSON.stringify({
            Name: room.Name,
            XCoord: room.XCoord.toFixed(0),
            YCoord: room.YCoord.toFixed(0),
            FloorFK: room.FloorFK,
            HasSensor: false
        });
        let res = await this._http
            .post(this._apiURL + '/room', toPost, this._options).toPromise();
        console.log(res.json())
        return toast("Sala criada com sucesso",4000,'lime');
    }

    public async editRoom(room: Room): Promise<boolean> {
        var toPost = JSON.stringify({
            ID: room.ID,
            Name: room.Name,
            XCoord: room.XCoord.toFixed(0),
            YCoord: room.YCoord.toFixed(0),
            FloorFK: room.FloorFK,
            HasSensor: room.HasSensor
        });
        let res = await this._http
            .put(this._apiURL + '/room', toPost, this._options).toPromise();
            return toast("Sala editada com sucesso",4000,'lime');
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
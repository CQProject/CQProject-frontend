import { forEach } from '@angular/router/src/utils/collection';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Account } from './iAccount';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        var user = <Account>JSON.parse(localStorage.getItem('currentUser'));
        if (user != null) {
            let roles = route.data["roles"] as Array<Number>;
            return (roles != null && this._verifyMatch(roles, user.roles)) ? true : false;
        }
        this._router.navigate(['schools']);
        return false;
    }

    private _verifyMatch(arr1: Array<Number>, arr2: Array<Number>): Boolean {
        for (let i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) > -1) {
                return true;
            }
        }
        return false;
    }
}
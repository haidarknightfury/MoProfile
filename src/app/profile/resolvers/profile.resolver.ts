import * as ProfileAction from './../store/profile.action';
import { Store } from '@ngrx/store';
import {Observable} from  'rxjs';
import * as ProfileStore from '../store/profile.reducer';

import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileResolver implements Resolve<ProfileStore.State> {

    constructor(private store: Store<ProfileStore.ProfileState>){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProfileStore.State 
                                                                      | Observable<ProfileStore.State>
                                                                      | Promise<ProfileStore.State> {

        this.store.dispatch(new ProfileAction.FetchSection({}));
        return this.store.select('profile');
    }
    
}
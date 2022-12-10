import { Context, createContext, useContext } from 'react';
import { action, makeObservable, observable } from 'mobx';

import { AuthStore } from './auth';
import { CurrentUserStore } from './currentUser';

export class RootStore {
    authStore: AuthStore;
    currentUser: CurrentUserStore;

    constructor() {
        makeObservable(this, {

        });

        this.authStore = new AuthStore();
        this.currentUser = new CurrentUserStore();
    }

    init = async () => {
        this.currentUser.setUserToken(localStorage.getItem('userToken'))
    }
}
export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () => useContext(RootStoreContext as Context<RootStore>);
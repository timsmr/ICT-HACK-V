import { makeObservable, observable, action } from 'mobx';

class AuthStore {
    authPath: 'login' | 'register';

    constructor() {
        this.authPath = 'login';

        makeObservable(this, {
            authPath: observable,
            changePath: action,
        });
    }

    changePath = (path: 'login' | 'register',) => {
        this.authPath = path;
    }
}

export { AuthStore };
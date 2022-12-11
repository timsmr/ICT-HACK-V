import { makeObservable, observable, action } from 'mobx';

class AuthStore {
    authPath: 'login' | 'register';
    type: 'student' | 'company';

    constructor() {
        this.authPath = 'login';
        this.type = 'student'

        makeObservable(this, {
            authPath: observable,
            type: observable,
            changePath: action,
        });
    }

    changePath = (path: 'login' | 'register',) => {
        this.authPath = path;
    }

    changeType = (type: 'student' | 'company') => {
        this.type = type;
    }
}

export { AuthStore };
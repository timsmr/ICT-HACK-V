import { makeObservable, observable, action } from 'mobx';

class CurrentUserStore {
    userToken: string | null = null;
    userType: 'student' | 'company' | null = null;

    constructor() {
        makeObservable(this, {
            userToken: observable,
            userType: observable,
            setUserToken: action,
        });
    }

    setUserToken = (value: CurrentUserStore["userToken"],) => {
        this.userToken = value;
    }

    setUserType = (value: CurrentUserStore["userType"],) => {
        this.userType = value;
    }
}

export { CurrentUserStore };
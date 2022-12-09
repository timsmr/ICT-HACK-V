import { makeObservable, observable, action } from 'mobx';

class CurrentUserStore {
    userToken: string | null = null;

    constructor() {
        makeObservable(this, {
            userToken: observable,
            setUserToken: action,
        });
    }

    setUserToken = (value: CurrentUserStore["userToken"],) => {
        this.userToken = value;
    }
}

export { CurrentUserStore };
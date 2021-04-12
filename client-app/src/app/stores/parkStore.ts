import { makeObservable, observable } from "mobx";

export default class ParkStore {
    fullName = '';

    constructor() {
        makeObservable(this, {
            fullName: observable
        })
    }
}
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { history } from "../..";
import { Park } from "../models/park";

export default class UserStore {
    user: User | null = null;
    visitedParksMap = new Map<string, string>();
    loadingVisitedList: boolean = false;
    loadingButtons: boolean = false;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Users.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => {
                this.user = user;
                this.setVisitedParks();
            })
            history.push('/parks');
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        this.visitedParksMap.clear();
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Users.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);
        } catch(error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try{
            const user = await agent.Users.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);
            history.push('/parks');
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Users.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch(error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }


    get allVisited() {
        return Array.from(this.visitedParksMap).sort((a, b) => a[1].localeCompare(b[1]));
    }

    hasVisited = (id: string) => {
        return this.visitedParksMap.size > 0 ? this.visitedParksMap.has(id) : false;
    }

    setVisitedParks = async () => {
        this.setLoadingVisited(true);
        if(store.userStore.user) {
            try{
                const visitedParks = await agent.VisitedParks.getVisited();
                runInAction(() => {
                    visitedParks.forEach(park => {
                        this.visitedParksMap.set(park.id, park.fullName);
                    })
                    this.setLoadingVisited(false);
                })
            } catch (error) {
                console.log(error);
                this.setLoadingVisited(false);
            }
        }
        this.setLoadingVisited(false);
    }

    addVisitedPark = async (park: Park) => {
        this.loadingButtons = true;
        if(store.userStore.user && !this.hasVisited(park.id)) {
            try {
                await agent.VisitedParks.addVisited(park.id)
                runInAction(() => {
                    this.visitedParksMap.set(park.id, park.fullName);
                    park.visitorCount++;
                    this.loadingButtons = false;
                })
            } catch(error) {
                console.log(error);
                this.loadingButtons = false;
            }
        }
    }

    removeVisitedPark = async (park: Park) => {
        this.loadingButtons = true;
        try {
            await agent.VisitedParks.removeVisited(park.id)
            runInAction(() => {
                this.visitedParksMap.delete(park.id);
                park.visitorCount--;
                this.loadingButtons = false;
            })
        } catch(error) {
            console.log(error);
            this.loadingButtons = false;
        }
    }

    setLoadingVisited = (state: boolean) => {
        this.loadingVisitedList = state;
    }
}
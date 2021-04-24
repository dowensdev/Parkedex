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
            runInAction(() => this.user = user);
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
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Users.current();
            runInAction(() => this.user = user);
        } catch(error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        
        try{
            const user = await agent.Users.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/parks');
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }

    get allVisited() {
        return Array.from(this.visitedParksMap);
    }

    hasVisited = async (id: string) => {
        return this.visitedParksMap.size > 0 ? this.visitedParksMap.has(id) : false;
    }

    setVisitedParks = async () => {
        this.setLoadingVisited(true);
        if(this.user) {
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
    }

    addVisitedPark = async (park: Park) => {
        if(this.user && !this.hasVisited(park.id)) {
            try {
                await agent.VisitedParks.addVisited(park.id)
                runInAction(() => {
                    this.visitedParksMap.set(park.id, park.fullName);
                })
            } catch(error) {
                console.log(error);
            }
        }
    }

    removeVisitedPark = async (park: Park) => {
        try {
            await agent.VisitedParks.removeVisited(park.id)
            runInAction(() => {
                this.visitedParksMap.delete(park.id);
            })
        } catch(error) {
            console.log(error);
        }
    }

    setLoadingVisited = (state: boolean) => {
        this.loadingVisitedList = state;
    }
}
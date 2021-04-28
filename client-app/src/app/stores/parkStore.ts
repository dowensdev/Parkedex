import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Park } from "../models/park";

export default class ParkStore {
    currentPark: Park | undefined = undefined;
    allParkMap = new Map<string, Park>();
    visitedParkList: Array<Park> = [];
    loadingInitial: boolean = false;
    userHasVisited: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.loadParks();
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadParks = async () => {
        this.setLoadingInitial(true);
        try {
            const parks = await agent.Parks.getAll();
            parks.forEach(park => {
               this.setPark(park);
            })
            this.setLoadingInitial(false);
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPark = async (id: string) => {
        let park = this.getPark(id);
        if(park) {
            this.currentPark = park;
            console.log(park);
            return park;
        } else {
            this.loadingInitial = true;
            try {
                park = await agent.Parks.get(id);
                this.setPark(park);
                runInAction(() => {
                    this.currentPark = park;
                });
                this.setLoadingInitial(false);
                return park;
            } catch(error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    get allParks() {
        return Array.from(this.allParkMap);
    }

    getPark = (id: string) => {
        return this.allParkMap.get(id);
    }

    private setPark = (park: Park) => {
        this.allParkMap.set(park.id, park);
    }

}
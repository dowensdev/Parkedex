import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Park } from "../models/park";

export default class ParkStore {
    allParkList: Array<Park> = [];
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

    private setPark = (park: Park) => {
        this.allParkList.push(park);
    }

    setVisitedParks = (park: Park) => {
        if(this.userHasVisited) {
            
        }
    }

    setVisitedPark = (park: Park) => {
        this.visitedParkList.push(park);
    }
}
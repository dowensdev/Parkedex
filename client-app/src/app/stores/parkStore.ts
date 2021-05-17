import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { Park } from "../models/park";

export default class ParkStore {
    currentPark: Park | undefined = undefined;
    allParkMap = new Map<string, Park>();
    currentParkImageMap = new Map<string, number>();
    loadingInitial: boolean = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    parkSearch: string = '';
    

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
            const result = await agent.Parks.getAll(this.axiosParams);
            console.log(result);
            result.data.forEach(park => {
               this.setPark(park);
            })
            this.setPagination(result.pagination);
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
            this.currentParkImageMap.set(park.id, 0);
            return park;
        } else {
            this.loadingInitial = true;
            try {
                park = await agent.Parks.get(id);
                this.setPark(park);
                runInAction(() => {
                    this.currentPark = park;
                    if(this.currentPark !== undefined) {
                        this.currentParkImageMap.set(this.currentPark.id, 0);
                    }
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
        return Array.from(this.allParkMap)
    }

    getPark = (id: string) => {
        return this.allParkMap.get(id);
    }

    private setPark = (park: Park) => {
        this.allParkMap.set(park.id, park);
        this.currentParkImageMap.set(park.id, 0);

    }

    //ImageRef functions
    getCurrentImage = (id: string) => {
        return (this.currentParkImageMap.has(id)) ? this.currentParkImageMap.get(id) : 0
    }

    updateCurrentImage = (id: string) => {
        let park = this.getPark(id)
        if(park && park.images.length !== 0) {
            const currentImage = this.getCurrentImage(id) || 0;
            const nextImage = (currentImage + 1) % park.images.length;
            this.currentParkImageMap.set(id, nextImage);
        }
    }

    clearPark = () => {
        this.currentPark = undefined;
    }

     //Pagination functions
     setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('search', this.parkSearch.toString());
        return params;
    }

    //search functions
    getParkSearchResults = () => {
        this.allParkMap.clear();
        this.pagingParams.pageNumber = 1;
        this.loadParks();
    }

    setParkSearch = (input: string) => {
        this.parkSearch = input;
        console.log(this.parkSearch);
    }
}
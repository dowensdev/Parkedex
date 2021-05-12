import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { VisitLog, VisitLogFormValues } from "../models/visitLog";
import { store } from "./store";

export default class VisitLogStore {
    currentVisitLog: VisitLog | undefined = undefined;
    visitLogMap: Map<string, VisitLog> = new Map<string, VisitLog>();
    loadingVisits: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.loadVisitLogs();
    }

    loadVisitLogs = async () => {
        this.loadingVisits = true;
        try {
            const result = await agent.VisitLogs.getVisitLogs();
            result.forEach(visitLog => {
               this.setVisitLog(visitLog);
            })
            this.loadingVisits = false;
        } catch(error) {
            console.log(error);
            this.loadingVisits = false;
        }
    }

    loadVisitLog = async (id: string) => {
        let visitLog = this.getVisitLog(id);
        if(visitLog) {
            this.currentVisitLog = visitLog;
            return visitLog;
        } else {
            this.loadingVisits = true;
            try {
                visitLog = await agent.VisitLogs.getVisitLog(id);
                this.setVisitLog(visitLog);
                runInAction(() => {
                    this.currentVisitLog = visitLog;
                    console.log(this.currentVisitLog);
                    if(this.currentVisitLog !== undefined) {
                        this.visitLogMap.set(this.currentVisitLog.id, this.currentVisitLog);
                    }
                });
                this.loadingVisits = false
                return visitLog;
            } catch(error) {
                console.log(error)
                this.loadingVisits = false
            }
        }
    }

    getVisitLog = (id: string) => {
        return this.visitLogMap.get(id);
    }

    visitLogsByPark = (parkId: string) => {
        return Array.from(this.visitLogMap.values()).filter(vl => vl.parkRef === store.parkStore.getPark(parkId)?.id) || [];
    }

    get allVisitLogs() {
        return Array.from(this.visitLogMap.values());
    }

    setVisitLog(visitLog: VisitLog) {
        visitLog.startDate = new Date(visitLog.startDate!);
        visitLog.endDate = new Date(visitLog.endDate!);
        this.visitLogMap.set(visitLog.id, visitLog);
    }

    createVisitLog = async (parkId: string, visitLog: VisitLogFormValues) => {
        try {
            await agent.VisitLogs.addVisitLog(parkId, visitLog);
            const newVisitLog = new VisitLog(visitLog);
            this.setVisitLog(newVisitLog);
            runInAction(() => {
                console.log(this.currentVisitLog);
                console.log(newVisitLog);
                this.currentVisitLog = newVisitLog;
            })
        } catch (error) {
            console.log(error);
        }
    }

    editVisitLog = async (visitLog: VisitLogFormValues) => {
        try {
            await agent.VisitLogs.editVisitLog(visitLog);
            runInAction(() => {
                if (visitLog.id) {
                    let updatedVisitLog = {...this.getVisitLog(visitLog.id), ...visitLog}
                    this.visitLogMap.set(visitLog.id, updatedVisitLog as VisitLog);
                    this.currentVisitLog = updatedVisitLog as VisitLog;
                } 
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteVisitLog = async (id: string) => {
        this.loadingVisits = true;
        try {
            await agent.VisitLogs.removeVisitLog(id);
            runInAction(() => {
                this.visitLogMap.delete(id);
                this.loadingVisits = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingVisits = false;
            })
        }
    }

    clearVisitLog = () => {
        this.currentVisitLog = undefined;
    }
}
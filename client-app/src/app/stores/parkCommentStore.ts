import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ParkComment } from "../models/parkComment";
import { store } from "./store";


export default class ParkCommentStore {
    comments: ParkComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (parkId: string) => {
        if(store.parkStore.currentPark) {
            this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_CHAT_URL + '?parkId=' + parkId, {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

            this.hubConnection.on('LoadComments', (comments: ParkComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    })
                    this.comments = comments
                });
            })

            this.hubConnection.on('ReceiveComment', (comment: ParkComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment)
                });
            })

        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }
    
    addComment = async (values: any) => {
        values.parkId = store.parkStore.currentPark?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch(error) {
            console.log(error);
        }
    }
}
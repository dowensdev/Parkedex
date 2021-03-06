import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import MapStore from "./mapStore";
import ModalStore from "./modalStore";
import ParkCommentStore from "./parkCommentStore";
import ParkStore from "./parkStore";
import UserStore from "./userStore";
import VisitLogStore from "./visitLogStore";

interface Store {
    commonStore: CommonStore;
    parkStore: ParkStore;
    userStore: UserStore;
    modalStore: ModalStore;
    parkCommentStore: ParkCommentStore;
    mapStore: MapStore;
    visitLogStore: VisitLogStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    parkStore: new ParkStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    parkCommentStore: new ParkCommentStore(),
    mapStore: new MapStore(),
    visitLogStore: new VisitLogStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
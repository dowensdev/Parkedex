import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ParkCommentStore from "./parkCommentStore";
import ParkStore from "./parkStore";
import UserStore from "./userStore";

interface Store {
    commonStore: CommonStore;
    parkStore: ParkStore;
    userStore: UserStore;
    modalStore: ModalStore;
    parkCommentStore: ParkCommentStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    parkStore: new ParkStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    parkCommentStore: new ParkCommentStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
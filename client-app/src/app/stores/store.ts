import { createContext, useContext } from "react";
import ParkStore from "./parkStore";

interface Store {
    parkStore: ParkStore
}

export const store: Store = {
    parkStore: new ParkStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
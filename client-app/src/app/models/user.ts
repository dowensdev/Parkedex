import { Park } from "./park";
import { VisitedPark } from "./visitedPark";

export interface User {
    displayName: string;
    username: string;
    token: string;
    visitedParks: VisitedPark[];
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}
import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useStore } from "../stores/store";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function PrivateRoute({component: Component, ...remainder}: Props) {
    const {userStore: {isLoggedIn}} = useStore();

    return (
        <Route 
            {...remainder}
            render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to='/' />}
        />
    )

}
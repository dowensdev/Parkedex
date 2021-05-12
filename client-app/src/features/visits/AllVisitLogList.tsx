import { observer } from "mobx-react-lite";
import React from "react";
import { Divider, Header } from "semantic-ui-react";
import { VisitLog } from "../../app/models/visitLog";
import { useStore } from "../../app/stores/store";
import VisitLogDetails from "./details/VisitLogDetails";

export default observer(function ParkVisitLogList() {
    const {visitLogStore} = useStore();
    const {allVisitLogs} = visitLogStore;

    return (
        <>
            <Header as='h1' content='All Visits' textAlign='center'/>
            <Divider></Divider>
            {allVisitLogs.map((visitLog: VisitLog) => (
                <VisitLogDetails key={visitLog.id} visitLog={visitLog} />
            ))}
        </>      
    )
})
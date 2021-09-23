import {Icon, Intent, Tag} from "@blueprintjs/core";
import React from "react";

/*
* Session uses the Blueprintjs {@link https://blueprintjs.com/docs/#core/components/tag Tag} component to render a
* session's details
* TODO Looks very ugly right now
*
* */
function Session(props) {
    const { session } = props;

    return (
        <Tag className="session" intent={Intent.PRIMARY} >
            <Icon icon={"calendar"} />
            <span className="session-info">{session.date}</span>
            <span className="session-info">{session.vaccine}</span>
            <span className="session-info">Dose 1: {session.available_capacity_dose1}</span>
            <span className="session-info">Dose 2: {session.available_capacity_dose2}</span>
        </Tag>
    )
}

export default Session;
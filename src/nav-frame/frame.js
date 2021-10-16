import React from "react";
import {useSelector} from "react-redux";

function Frame(props) {
    const target = props.target;
    const {frames} = useSelector(state => state.tabFrame);

    return (
        <div
            id={frames[target].id}
            className={frames[target].classNames.join(' ')}
        >
            {props.children}
        </div>
    );
}

export default Frame;

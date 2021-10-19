import React from "react";
import {useSelector} from "react-redux";

function Frame(props) {
    const target = props.target,
        {tab} = useSelector(state => state.tabFrame),
        classNames = ['ntm-tab-frame', (tab === target ? 'ntm-frame-active' : '')];

    return (
        <div
            id={'ntm-frame-' + target}
            className={classNames.join(' ')}
        >
            {props.children}
        </div>
    );
}

export default Frame;

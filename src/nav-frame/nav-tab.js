import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {updateTab} from "../store/tab-frame-slice";

function NavTab(props) {
    const target = props.target,
        {tab} = useSelector(state => state.tabFrame),
        dispatch = useDispatch(),
        classNames = ['nav-tab', (target === tab ? 'nav-tab-active' : '')];

    return <a
        href="#"
        id={'ntm-tab-' + target}
        className={classNames.join(' ')}
        onClick={() => dispatch(updateTab(target))}
    >
        {props.children}
    </a>
}

export default NavTab;

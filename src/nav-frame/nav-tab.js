import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {switchTabFrame} from "../store/tab-frame-slice";

function NavTab(props) {
    const target = props.target;
    const {tabs} = useSelector(state => state.tabFrame);
    const dispatch = useDispatch();

    return <a
        href="#"
        id={tabs[target].id}
        className={tabs[target].classNames.join(' ')}
        onClick={() => dispatch(switchTabFrame(target))}
    >
        {props.children}
    </a>
}

export default NavTab;

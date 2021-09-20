import React from "react";

function NavTab(props) {
    const
        stateKey = props.stateKey,
        {id, classNames} = props.tabData,
        onClickTab = props.onClickTab;

    return (
        <a
            id={id}
            href="#"
            className={classNames.join(' ')}
            onClick={() => {
                onClickTab(stateKey);
            }}
        >
            {props.children}
        </a>
    )
}

export default NavTab;

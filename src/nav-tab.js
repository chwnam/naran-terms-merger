import React from "react";

function NavTab(props) {
    const
        tabId = props.tabId,
        {id, classNames} = props.tabData,
        onClickTab = props.onClickTab;

    return (
        <a
            id={id}
            href="#"
            className={classNames.join(' ')}
            onClick={() => {
                onClickTab(tabId);
            }}
        >
            {props.children}
        </a>
    )
}

export default NavTab;

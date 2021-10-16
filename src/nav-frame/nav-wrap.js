import React from "react";

function NavWrap(props) {
    const ariaLabel = props.ariaLabel || 'Secondary Menu';

    return (
        <nav
            className="nav-tab-wrapper wp-clearfix"
            aria-label={ariaLabel}
        >
            {props.children}
        </nav>
    )
}

export default NavWrap;
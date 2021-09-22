import React from "react";

function Frame(props) {
    const id = props.id,
        classNames = props.classNames;

    return (
        <div
            id={id}
            className={classNames.join(' ')}
        >
            {props.children}
        </div>
    );
}

export default Frame;

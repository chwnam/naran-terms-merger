import React from "react";

function FrameControls(props) {
    return (
        <ul className="ntm-frame-controls">
            {props.children}
        </ul>
    )
}

export default FrameControls;
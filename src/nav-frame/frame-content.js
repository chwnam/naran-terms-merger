import React from "react";

function FrameContent(props) {
    return (
        <div className="frame-content">
            {props.children}
        </div>
    );
}

export default FrameContent;

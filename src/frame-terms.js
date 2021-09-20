import React from "react";

class FrameTerms extends React.Component {
    render() {
        const classNames = this.props.classNames;

        return <div
            id="ntm-frame-terms"
            className={classNames.join(' ')}
        >Terms</div>
    }
}

export default FrameTerms;
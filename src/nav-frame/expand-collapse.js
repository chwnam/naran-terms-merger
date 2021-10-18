import React from 'react';

function ExpandCollapse(props) {
    const {onExpandAll, onCollapseAll} = props;

    return (
        <li>
            <div className="expand-collapse">
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        onExpandAll();
                    }}
                >Expand All</a>

                <span className="control-separator">|</span>

                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        onCollapseAll();
                    }}
                >Collapse All</a>
            </div>
        </li>
    );
}

export default ExpandCollapse;

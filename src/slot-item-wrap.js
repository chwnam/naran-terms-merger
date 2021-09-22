import React from "react";

function SlotItemWrap(props) {
    const {
        index,
        slot,
        updateSlot
    } = props;

    let spanClass = 'ntm-item-toggle ntm-item-icon',
        insideClass = 'ntm-item-inside';

    if (slot && slot.isCollapsed()) {
        spanClass += ' ntm-icon-chevron-up';
        insideClass += ' collapsed';
    } else {
        spanClass += ' ntm-icon-chevron-down';
    }

    return (
        <>
            <div
                className="ntm-title-wrap"
                onClick={() => {
                    updateSlot(slot)
                }}
            >
                <h3 className="ntm-item-title">
                    [#{index + 1}] {slot.getTitle()}
                    <a
                        href="#"
                        className="ntm-slot-title-action"
                        role="button"
                    >Edit name...</a>
                </h3>
                <div className="ntm-item-control">
                    <span className={spanClass}/>
                </div>
            </div>
            <div className={insideClass}>
                <div className="ntm-slot-tool collapsed">
                    <div className="ntm-slot-name-input">
                        <label htmlFor="slot-name">Name</label>
                        <input
                            id="slot-name"
                            type="text"
                            className="text"
                            placeholder="Name of this slot"
                            defaultValue=""
                        />
                        <button
                            type="button"
                            className="button ntm-button-rename-slot"
                        >
                            OK
                        </button>
                        <button
                            type="button"
                            className="button ntm-button-cancel"
                        >
                            Cancel
                        </button>
                    </div>
                    <hr/>
                </div>
                <div className="ntm-slot-item">
                    <h4>Assigned terms</h4>
                    <ul className="ntm-slot-assigned-terms">
                        <li
                            className="header-term"
                            title="Term ID: 414"
                        >
                            Term one
                            <span className="remove-term">&times;</span>
                        </li>
                        <li
                            title="Term ID: 418"
                        >
                            Term two
                            <span className="remove-term">&times;</span>
                        </li>
                    </ul>
                </div>
                <hr/>
                <div className="ntm-slot-item">
                    <h4>Actions</h4>
                    <ul className="ntm-slot-actions">
                        <li>
                            <label htmlFor="header-term">Header term</label>
                            <select id="header-term">
                                <option value="414">Term one</option>
                                <option value="418">Term two</option>
                            </select>
                        </li>
                        <li>
                            <button type="button"
                                    className="button button-primary">Merge Terms
                            </button>
                        </li>
                        <li>
                            <a href="#"
                               role="button"
                               className="remove"
                            >Remove this slot
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SlotItemWrap;

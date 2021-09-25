import React from "react";

class SlotItemWrap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNameInput: false
        };
    }

    render() {
        const {
            index,
            slot,
            updateSlot,
            removeSlot
        } = this.props;

        let spanClass = 'ntm-item-toggle ntm-item-icon',
            insideClass = 'ntm-item-inside',
            slotToolClassNames = 'ntm-slot-tool';

        if (slot && slot.isCollapsed()) {
            spanClass += ' ntm-icon-chevron-up';
            insideClass += ' collapsed';
        } else {
            spanClass += ' ntm-icon-chevron-down';
        }

        if (!this.state.showNameInput) {
            slotToolClassNames += ' collapsed';
        }

        return (
            <>
                <div
                    className="ntm-title-wrap"
                    onClick={() => {
                        slot.setCollapsed(!slot.isCollapsed());
                        updateSlot(slot)
                    }}
                >
                    <h3 className="ntm-item-title">
                        [#{index + 1}] {slot.getTitle()}
                        <a
                            href="#"
                            className="ntm-slot-title-action"
                            role="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.setState(({showNameInput}) => {
                                    return {showNameInput: !showNameInput}
                                });
                            }}
                        >Edit name...</a>
                    </h3>
                    <div className="ntm-item-control">
                        <span className={spanClass}/>
                    </div>
                </div>
                <div className={insideClass}>
                    <div className={slotToolClassNames}>
                        <div className="ntm-slot-name-input">
                            <label htmlFor="slot-name">Name</label>
                            <input
                                id="slot-name"
                                type="text"
                                className="text"
                                placeholder="Name of this slot"
                                value={slot.getTitle()}
                                onChange={(e) => {
                                    slot.setTitle(e.target.value);
                                    updateSlot(slot);
                                }}
                            />
                            <button
                                type="button"
                                className="button ntm-button-close"
                                onClick={() => {
                                    this.setState({showNameInput: false});
                                }}
                            >Close
                            </button>
                        </div>
                        <hr/>
                    </div>
                    <div className="ntm-slot-item">
                        <h4>Assigned terms</h4>
                        <ul className="ntm-slot-assigned-terms">
                            {Object.values(slot.getTerms()).map(term => {
                                return (
                                    <li
                                        key={term.getTermId()}
                                        className="header-term"
                                        title={"Term ID: " + term.getTermId()}
                                    >
                                        {term.getName()}
                                        <span className="remove-term">&times;</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <hr/>
                    <div className="ntm-slot-item">
                        <h4>Actions</h4>
                        <ul className="ntm-slot-actions">
                            <li>
                                <label htmlFor="header-term">Header term</label>
                                <select>
                                    {Object.values(slot.getTerms()).map(term => {
                                        return (
                                            <option
                                                key={term.getTermId()}
                                                value={term.getTermId()}
                                            >
                                                {term.getName()}
                                            </option>
                                        );
                                    })}
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
                                   onClick={(e) => {
                                       e.preventDefault();
                                       if (!confirm('Are you sure you want to remove this slot?')) {
                                           return;
                                       }
                                       removeSlot(slot);
                                   }}
                                >Remove this slot
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default SlotItemWrap;

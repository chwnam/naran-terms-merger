import React from "react";
import {useDispatch} from "react-redux";
import {removeSlot, removeTermFromSlot, selectSlot, toggleNameInput, updateSlotName} from "../store/tax-slot-slice";
import {insideClasses, spanClasses} from "../nav-frame/class-names";

function slotToolClassNames(slot) {
    let classNames = ['ntm-slot-tool'];

    if (!slot.showNameInput) {
        classNames.push('collapsed')
    }

    return classNames.join(' ');
}

function SlotItemWrap(props) {
    const {index, slot} = props,
        dispatch = useDispatch();

    return (
        <>
            <div
                className="ntm-title-wrap"
                onClick={() => {
                    dispatch(selectSlot({slot: slot}));
                }}
            >
                <h3 className="ntm-item-title">
                    [#{index + 1}] {slot.name}
                    <a
                        href="#"
                        className="ntm-slot-title-action"
                        role="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(toggleNameInput({slot: slot}));
                        }}
                    >Edit name...</a>
                </h3>
                <div className="ntm-item-control">
                    <span className={spanClasses(slot)}/>
                </div>
            </div>
            <div className={insideClasses(slot)}>
                <div className={slotToolClassNames(slot)}>
                    <div className="ntm-slot-name-input">
                        <label htmlFor="slot-name">Name</label>
                        <input
                            id="slot-name"
                            type="text"
                            className="text"
                            placeholder="Name of this slot"
                            value={slot.name}
                            onChange={(e) => {
                                dispatch(updateSlotName({
                                    slot: slot,
                                    name: e.target.value
                                }));
                            }}
                        />
                        <button
                            type="button"
                            className="button ntm-button-close"
                            onClick={() => {
                                dispatch(toggleNameInput({slot: slot}));
                            }}
                        >Close
                        </button>
                    </div>
                    <hr/>
                </div>
                <div className="ntm-slot-item">
                    <h4>Assigned terms</h4>
                    <ul className="ntm-slot-assigned-terms">
                        {Object.values(slot.terms).map(term => {
                            return (
                                <li
                                    key={term.id}
                                    className="header-term"
                                    title={"Term ID: " + term.id}
                                >
                                    {term.name}
                                    <span
                                        className="remove-term"
                                        onClick={() => {
                                            dispatch(removeTermFromSlot({
                                                slot: slot,
                                                term: term,
                                            }));
                                        }}
                                    >&times;</span>
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
                                {Object.values(slot.terms).map(term => {
                                    return (
                                        <option key={term.id} value={term.id}>
                                            {term.name}
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
                                   dispatch(removeSlot({slot: slot}));
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

export default SlotItemWrap;

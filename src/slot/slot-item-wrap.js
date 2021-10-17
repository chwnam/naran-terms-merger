import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    afterMerge,
    removeSlot,
    removeTermFromSlot,
    selectSlot,
    toggleNameInput,
    updateHeaderTerm,
    updateSlotName,
    updateTerms,
} from "../store/tax-slot-slice";
import {insideClasses, spanClasses} from "../nav-frame/class-names";
import {getTaxonomyTerms, getTermsFromSlot, isHeaderTerm, requestMergeTerms} from "../store/utils";

function slotToolClassNames(slot) {
    let classNames = ['ntm-slot-tool'];

    if (!slot.showNameInput) {
        classNames.push('collapsed')
    }

    return classNames.join(' ');
}

function SlotItemWrap(props) {
    const {index, slot} = props,
        {map, hierarchical, flat, taxonomy} = useSelector(state => state.taxSlot),
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
                    <h4>
                        Assigned term(s)
                    </h4>
                    <ul className="ntm-slot-assigned-terms">
                        {getTermsFromSlot(map, slot.id).map(term => {
                            return (
                                <li
                                    key={term.id}
                                    className={isHeaderTerm(map, slot.id, term.id) ? "header-term" : ""}
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
                            <select
                                id="header-term"
                                onChange={(e) => {
                                    dispatch(updateHeaderTerm({
                                        slot: slot,
                                        termId: parseInt(e.target.value)
                                    }));
                                }}>
                                {getTermsFromSlot(map, slot.id).map(term =>
                                    <option key={term.id} value={term.id}>{term.name} </option>
                                )}
                            </select>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="button button-primary"
                                disabled={getTermsFromSlot(map, slot.id).length < 2}
                                onClick={(e) => {
                                    if (!confirm(`Merge ${slot.name}. Proceed?`)) {
                                        e.preventDefault();
                                        return;
                                    }
                                    const termIds = map.slotMap[slot.id];
                                    const headerTerm = map.headerTerms[slot.id];

                                    requestMergeTerms(termIds, headerTerm).then(r => {
                                        if (r.success) {
                                            dispatch(afterMerge({slot: slot}));
                                            getTaxonomyTerms(hierarchical, flat, taxonomy).then(terms => {
                                                dispatch(updateTerms({terms: terms}));
                                            });
                                            alert('Successfully merged!');
                                        } else {
                                            console.log(r.data);
                                        }
                                    });
                                }}
                            >Merge Terms
                            </button>
                        </li>
                        <li>
                            <a href="#"
                               role="button"
                               className="remove"
                               onClick={(e) => {
                                   e.preventDefault();
                                   if (getTermsFromSlot(map, slot.id).length && !confirm('Are you sure you want to remove this slot?')) {
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

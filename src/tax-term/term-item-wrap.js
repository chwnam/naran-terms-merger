import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {designateSlot, updateTerm} from "../store/tax-slot-slice";
import {insideClasses, spanClasses} from "../nav-frame/class-names";

function TermItemWrap(props) {
    const {term} = props,
        {slots} = useSelector(state => state.taxSlot),
        dispatch = useDispatch();

    return (
        <>
            <div
                className="ntm-title-wrap"
                onClick={() => {
                    dispatch(updateTerm(term));
                }}
            >
                <h3 className="ntm-item-title">
                    [#{term.id}] {term.name}
                </h3>
                <div className="ntm-item-control">
                    <span className={spanClasses(term)}/>
                </div>
            </div>
            <div className={insideClasses(term)}>
                <ul className="ntm-term-detail">
                    <li>
                        {term.description}
                    </li>
                    <li>
                        Term ID: {term.id}
                    </li>
                    <li>
                        Slug: {term.slug}
                    </li>
                    <li>
                        Count: {term.count}
                    </li>
                </ul>
                <div className="ntm-designate-slot-wrap">
                    <label htmlFor="designated-slot">Designated to</label>:

                    <select
                        value={term.slotId}
                        onChange={(e) => {
                            dispatch(designateSlot({
                                term: term,
                                slotId: parseInt(e.target.value)
                            }));
                        }}
                    >
                        <option value={0}>None</option>

                        {slots.map((slot, idx) => {
                            return (
                                <option key={slot.id} value={slot.id}>
                                    [#{idx + 1}] {slot.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </>
    );
}

export default TermItemWrap;

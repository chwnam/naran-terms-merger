import React from 'react';

import {isHeaderTerm} from "../store/utils";
import {removeTermFromSlot} from "../store/tax-slot-slice";
import {useDispatch} from "react-redux";

function AssignedTerms(props) {
    const {map, slot, terms} = props,
        dispatch = useDispatch();

    if (terms.length) {
        return (
            <div className="ntm-slot-item">
                <h4>Assigned term(s)</h4>
                <ul className="ntm-slot-assigned-terms">
                    {terms.map(term => {
                        return (
                            <li
                                key={term.id}
                                className={isHeaderTerm(map, slot.id, term.id) ? "header-term" : ""}
                                title={"Term ID: " + term.id}
                            >
                                [#{term.id}] {term.name}
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
        );
    } else {
        return (
            <div className="ntm-slot-item">
                <h4>Assigned terms</h4>
                <p className="ntm-slot-assigned-terms no-assigned-terms">No assigned Terms</p>
            </div>
        );
    }
}

export default AssignedTerms;
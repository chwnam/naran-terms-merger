import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewSlot} from "../store/tax-slot-slice";

function SlotAdder() {
    const {
            slots,
            maxNumSlots
        } = useSelector(state => state.taxSlot),
        dispatch = useDispatch(),
        numSlots = slots.length,
        exceeded = numSlots >= maxNumSlots;

    return (
        <li>
            <button
                type="button"
                className="button"
                disabled={exceeded}
                onClick={() => {
                    if (!exceeded) {
                        dispatch(addNewSlot());
                    }
                }}
            >
                {exceeded ? 'Unable to add more' : 'Add new slot'}
            </button>
        </li>
    );
}

export default SlotAdder;
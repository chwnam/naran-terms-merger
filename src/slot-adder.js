import React from "react";

function SlotAdder(props) {
    const {
            addNewSlot,
            numSlots,
            maxNumSlots
        } = props,
        exceeded = numSlots >= maxNumSlots;

    return (
        <li>
            <button
                type="button"
                className="button"
                disabled={exceeded}
                onClick={() => {
                    addNewSlot(exceeded);
                }}
            >
                {exceeded ? 'Unable to add more' : 'Add new slot'}
            </button>
        </li>
    );
}

export default SlotAdder;
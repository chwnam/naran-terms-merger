import React from "react";
import FrameControls from "./frame-controls";
import FrameContent from "./frame-content";
import SlotAdder from "./slot-adder";
import SlotsList from "./slots-list";

function Slots(props) {
    const {
        slots,
        slot,
        maxNumSlots,
        addNewSlot,
        updateSlot,
        removeSlot
    } = props;

    return (
        <>
            <FrameControls>
                <SlotAdder
                    addNewSlot={addNewSlot}
                    numSlots={slots.length}
                    maxNumSlots={maxNumSlots}
                />
            </FrameControls>
            <FrameContent>
                <SlotsList
                    slots={slots}
                    slot={slot}
                    updateSlot={updateSlot}
                    removeSlot={removeSlot}
                />
            </FrameContent>
        </>
    );
}

export default Slots;

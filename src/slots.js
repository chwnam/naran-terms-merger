import React from "react";
import FrameControls from "./frame-controls";
import FrameContent from "./frame-content";
import SlotAdder from "./slot-adder";
import SlotsList from "./slots-list";
import Slot from "./slot";

class Slots extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slots: [
                new Slot()
            ],
            slot: null,
            maxNumSlots: 10
        }

        this.addNewSlot = this.addNewSlot.bind(this);
        this.updateSlot = this.updateSlot.bind(this);
    }

    render() {
        return (
            <>
                <FrameControls>
                    <SlotAdder
                        addNewSlot={this.addNewSlot}
                        numSlots={this.state.slots.length}
                        maxNumSlots={this.state.maxNumSlots}
                    />
                </FrameControls>
                <FrameContent>
                    <SlotsList
                        slots={this.state.slots}
                        slot={this.state.slot}
                        updateSlot={this.updateSlot}
                    />
                </FrameContent>
            </>
        )
    }

    addNewSlot() {
        if (this.state.slots.length < this.state.maxNumSlots) {
            this.setState(({slots}) => {
                slots.push(new Slot());
                return {slots: slots};
            });
        }
    }

    updateSlot(slot) {
        slot.toggle();
        this.setState({slot: slot});
    }
}

export default Slots;

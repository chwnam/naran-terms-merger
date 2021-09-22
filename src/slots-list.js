import React from "react";
import SlotItemWrap from "./slot-item-wrap";

function SlotsList(props) {
    const {
        slots,
        slot,
        updateSlot
    } = props;

    if (slots.length) {
        return (
            <ul id="ntm-slots">
                {slots.map((s, i) => {
                    let className = ['ntm-slot', 'ntm-item-wrap'];

                    if (slot) {
                        if(slot.getId() === s.getId()) {
                            className.push('current');
                        }
                        if(s.isCollapsed) {
                            className.push()
                        }
                    }

                    return (
                        <li
                            key={'slot-' + i}
                            className={'ntm-slot ntm-item-wrap ' + (slot && slot.getId() === s.getId() ? 'current' : '')}
                        >
                            <SlotItemWrap
                                index={i}
                                slot={s}
                                updateSlot={updateSlot}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return (
            <ul id="ntm-slots">
                <li className="ntm-no-items">
                    <p>[Zero slots. Please create a new slot]</p>
                </li>
            </ul>
        );
    }
}

export default SlotsList;

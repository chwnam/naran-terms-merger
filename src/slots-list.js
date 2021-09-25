import React from "react";
import SlotItemWrap from "./slot-item-wrap";

function SlotsList(props) {
    const {
        slots,
        slot,
        updateSlot,
        removeSlot
    } = props;

    if (slots.length) {
        return (
            <ul id="ntm-slots">
                {slots.map((s, i) => {
                    let classNames = ['ntm-slot', 'ntm-item-wrap'];

                    if (slot) {
                        if (slot.getId() === s.getId()) {
                            classNames.push('current');
                        }
                    }

                    if (s.isCollapsed()) {
                        classNames.push('collapsed');
                    }

                    return (
                        <li
                            key={'slot-' + i}
                            className={classNames.join(' ')}
                        >
                            <SlotItemWrap
                                index={i}
                                slot={s}
                                updateSlot={updateSlot}
                                removeSlot={removeSlot}
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

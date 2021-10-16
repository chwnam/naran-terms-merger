import React from "react";
import SlotItemWrap from "./slot-item-wrap";
import {useSelector} from "react-redux";

function slotClassNames(iterated, selected) {
    let classNames = ['ntm-slot', 'ntm-item-wrap'];

    if (selected.id === iterated.id) {
        classNames.push('current');
    }

    if (iterated.collapsed) {
        classNames.push('collapsed');
    }

    return classNames.join(' ');
}


function SlotsList() {
    const {slots, slot} = useSelector(state => state.taxSlot);

    if (slots.length) {
        return (
            <ul id="ntm-slots">
                {slots.map((s, i) => {
                    return (
                        <li key={'slot-' + i} className={slotClassNames(s, slot)}>
                            <SlotItemWrap index={i} slot={s}/>
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

import React from "react";
import {GlobalHotKeys} from 'react-hotkeys';
import store from "../store/store";
import {updateTab} from "../store/tab-frame-slice";
import {addNewSlot, selectSlot, updateTerm} from "../store/tax-slot-slice";
import {useDispatch} from "react-redux";

function TermsMergerHotKeys() {
    const dispatch = useDispatch();

    const keyMaps = {
        TAP_TERMS: 'ctrl+1',
        TAP_SLOTS: 'ctrl+2',
        UP: 'w',
        DOWN: 's',
        HOME: 'Home',
        END: 'End',
        PAGE_UP: 'shift+w',
        PAGE_DOWN: 'shift+s',
        SPACE: 'Space',
        PAGE_PREV: 'A',
        PAGE_NEXT: 'D',
        PAGE_FIRST: 'Shift+A',
        PAGE_LAST: 'Shift+D',
        NUM1: '1',
        NUM2: '2',
        NUM3: '3',
        NUM4: '4',
        NUM5: '5',
        NUM6: '6',
        NUM7: '7',
        NUM8: '8',
        NUM9: '9',
        NUM0: '0',
        SLOT_CREATE: 'c',
        SLOT_REMOVE: 'x',
        SLOT_MERGE: 'm',
        SLOT_RENAME: 'r',
    };

    const handlers = {
        TAP_TERMS() {
            dispatch(updateTab('terms'));
        },
        TAP_SLOTS() {
            dispatch(updateTab('slots'));
        },
        UP(e) {
            const tab = store.getState().tabFrame.tab,
                {terms, term, slots, slot} = store.getState().taxSlot;
            e.preventDefault();

            if ('terms' === tab) {
                dispatch(updateTerm({
                    term: choosePrev(terms, term),
                    toggle: false,
                }));
            } else if ('slots' === tab) {
                dispatch(selectSlot({
                    slot: choosePrev(slots, slot),
                    toggle: false,
                }));
            }
        },
        DOWN(e) {
            const tab = store.getState().tabFrame.tab,
                {terms, term, slots, slot} = store.getState().taxSlot;
            e.preventDefault();

            if ('terms' === tab) {
                dispatch(updateTerm({
                    term: chooseNext(terms, term),
                    toggle: false,
                }));
            } else if ('slots' === tab) {
                dispatch(selectSlot({
                    slot: chooseNext(slots, slot),
                    toggle: false,
                }));
            }
        },
        HOME(e) {
        },
        END(e) {
        },
        PAGE_UP(e) {
        },
        PAGE_DOWN(e) {
        },
        SPACE(e) {
            e.preventDefault();
            const tab = store.getState().tabFrame.tab,
                {term, slot} = store.getState().taxSlot;

            if ('terms' === tab) {
                dispatch(updateTerm({
                    term: term,
                    toggle: true,
                }));
            } else if ('slots' === tab) {
                dispatch(selectSlot({
                    slot: slot,
                    toggle: true,
                }));
            }
        },
        NUM1(e) {
        },
        NUM2(e) {
        },
        NUM3(e) {
        },
        NUM4(e) {
        },
        NUM5(e) {
        },
        NUM6(e) {
        },
        NUM7(e) {
        },
        NUM8(e) {
        },
        NUM9(e) {
        },
        NUM0(e) {
        },
        CREATE(e) {
            const tab = store.getState().tabFrame.tab;

            e.preventDefault();

            if ('slots' === tab) {
                dispatch(addNewSlot());
            }
        },
        REMOVE(e) {
        },
        MERGE(e) {
        },
    };

    function choosePrev(group, current, field = 'id') {
        const idx = group.findIndex(elem => elem[field] === current[field]);
        return idx > 0 ? group[idx - 1] : group[0];
    }

    function chooseNext(group, current, field = 'id') {
        const idx = group.findIndex(elem => elem[field] === current[field]);
        return idx < group.length - 1 ? group[idx + 1] : group[group.length - 1];
    }

    return (
        <GlobalHotKeys keyMap={keyMaps} handlers={handlers}/>
    )
}

export default TermsMergerHotKeys;
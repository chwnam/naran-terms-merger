import React from "react";
import {GlobalHotKeys} from 'react-hotkeys';
import store from "../store/store";
import {updateTab} from "../store/tab-frame-slice";
import {
    addNewSlot,
    afterMerge,
    designateSlot,
    removeSlot,
    selectSlot,
    updateTerm,
    updateTerms
} from "../store/tax-slot-slice";
import {useDispatch} from "react-redux";
import {getTaxonomyTerms, getTermsFromSlot, getTermsListUrl, requestMergeTerms} from "../store/utils";

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
            const tab = store.getState().tabFrame.tab,
                {terms, slots} = store.getState().taxSlot;
            e.preventDefault();

            if ('terms' === tab) {
                dispatch(updateTerm({
                    term: terms.length > 0 ? terms[0] : {},
                    toggle: false,
                }))
            } else if ('slots' === tab) {
                dispatch(selectSlot({
                    slot: slots.length > 0 ? slots[0] : {},
                    toggle: false,
                }));
            }
        },
        END(e) {
            const tab = store.getState().tabFrame.tab,
                {terms, slots} = store.getState().taxSlot;
            e.preventDefault();

            if ('terms' === tab) {
                dispatch(updateTerm({
                    term: terms.length > 0 ? terms[terms.length - 1] : {},
                    toggle: false,
                }))
            } else if ('slots' === tab) {
                dispatch(selectSlot({
                    slot: slots.length > 0 ? slots[slots.length - 1] : {},
                    toggle: false,
                }));
            }
        },
        PAGE_UP(e) {
            const tab = store.getState().tabFrame.tab,
                {terms, term, slots, slot} = store.getState().taxSlot;
            e.preventDefault();

            if ('terms' === tab) {
                dispatch(updateTerm({
                    term: choosePrev(terms, term, 5),
                    toggle: false,
                }))
            } else if ('slots' === tab) {
                dispatch(selectSlot({
                    slot: choosePrev(slots, slot, 5),
                    toggle: false,
                }));
            }
        },
        PAGE_DOWN(e) {
            const tab = store.getState().tabFrame.tab,
                {terms, term, slots, slot} = store.getState().taxSlot;
            e.preventDefault();

            if ('terms' === tab) {
                dispatch(updateTerm({
                    term: chooseNext(terms, term, 5),
                    toggle: false,
                }))
            } else if ('slots' === tab) {
                dispatch(selectSlot({
                    slot: chooseNext(slots, slot, 5),
                    toggle: false,
                }));
            }
        },
        SPACE(e) {
            const tab = store.getState().tabFrame.tab,
                {term, slot} = store.getState().taxSlot;

            e.preventDefault();

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
            e.preventDefault();
            designateTo(0);
        },
        NUM2(e) {
            e.preventDefault();
            designateTo(1);
        },
        NUM3(e) {
            e.preventDefault();
            designateTo(2);
        },
        NUM4(e) {
            e.preventDefault();
            designateTo(3);
        },
        NUM5(e) {
            e.preventDefault();
            designateTo(4);
        },
        NUM6(e) {
            e.preventDefault();
            designateTo(5);
        },
        NUM7(e) {
            e.preventDefault();
            designateTo(6);
        },
        NUM8(e) {
            e.preventDefault();
            designateTo(7);
        },
        NUM9(e) {
            e.preventDefault();
            designateTo(8);
        },
        NUM0(e) {
            e.preventDefault();
            designateTo(9);
        },
        CREATE(e) {
            const tab = store.getState().tabFrame.tab;

            e.preventDefault();

            if ('slots' === tab) {
                dispatch(addNewSlot());
            }
        },
        REMOVE(e) {
            const state = store.getState(),
                tab = state.tabFrame.tab,
                {map, slot} = state.taxSlot;

            e.preventDefault();

            if ('slots' === tab &&
                getTermsFromSlot(map, slot.id).length &&
                confirm('Are you sure you want to remove this slot?')) {
                dispatch(removeSlot({slot: slot}));
            }
        },
        MERGE(e) {
            const state = store.getState(),
                {
                    hierarchical,
                    flat,
                    taxonomy,
                    map,
                    slot,
                    termsOrderBy,
                    termsPerPage,
                    termsCurrentPage,
                } = state.taxSlot;

            e.preventDefault();

            if (confirm(`Merge ${slot.name}. Proceed?`)) {
                const termIds = map.slotMap[slot.id],
                    headerTerm = map.headerTerms[slot.id];

                requestMergeTerms(termIds, headerTerm).then(r => {
                    if (r.success) {
                        dispatch(afterMerge({slot: slot}));
                        getTaxonomyTerms(
                            getTermsListUrl(hierarchical, flat, taxonomy), {
                                orderBy: termsOrderBy,
                                perPage: termsPerPage,
                                page: termsCurrentPage,
                            }
                        ).then(response => {
                            dispatch(updateTerms(response));
                        });
                        alert('Successfully merged!');
                    } else {
                        console.log(r.data);
                    }
                });
            }
        },
    };

    function choosePrev(group, current, offset = 1, field = 'id') {
        const idx = group.findIndex(elem => elem[field] === current[field]);

        if (idx > -1 && idx - offset >= 0) {
            return group[idx - offset];
        } else if (idx > -1 && group.length > 0) {
            return group[0];
        } else {
            return {};
        }
    }

    function chooseNext(group, current, offset = 1, field = 'id') {
        const idx = group.findIndex(elem => elem[field] === current[field]);

        if (idx > -1 && idx + offset < group.length) {
            return group[idx + offset];
        } else if (idx > -1 && group.length > 0.) {
            return group[group.length - 1];
        } else {
            return {};
        }
    }

    function designateTo(n) {
        const state = store.getState(),
            tab = state.tabFrame.tab,
            {term, slots} = state.taxSlot;

        if ('terms' === tab && term.id > 0 && slots.length > n && n > -1) {
            dispatch(designateSlot({
                term: term,
                slotId: slots[n].id
            }));
        }
    };

    return (
        <GlobalHotKeys keyMap={keyMaps} handlers={handlers}/>
    )
}

export default TermsMergerHotKeys;
import {createSlice} from '@reduxjs/toolkit';
import {newSlot} from "./utils";

export const taxSlotSlice = createSlice({
    name: 'taxSlot',
    initialState: {
        // Hierarchical taxonomies list.
        hierarchical: {},

        // Flat taxonomies list.
        flat: {},

        // Currently selected taxonomy.
        taxonomy: '',

        // Terms of current selected taxonomy.
        terms: [],

        // Currently selected term.
        term: {},

        // Term order by
        termsOrderBy: 'name-asc',

        // Terms per page.
        termsPerPage: 10,

        // Terms current page.
        termsCurrentPage: 0,

        // Terms last page.
        termsLastPage: 0,

        // Total terms.
        termsTotal: 0,

        // slot's counter.
        counter: 2,

        // All slots list.
        slots: [
            newSlot(1)
        ],

        // Currently selected slot.
        slot: {},

        // Maximum number of slots.
        maxNumSlots: 10,

        map: {
            // Mapping by slots.
            // Each key is slot id, value is a list of term ids.
            slotMap: {},

            // Mapping by terms.
            // Each key is term id, value is slot id.
            termMap: {},

            // Stored terms.
            terms: {},

            // Header term info
            // Each key is slot id, value is term id.
            headerTerms: {}
        },
    },
    reducers: {
        // Update taxonomies list.
        updateTaxonomies: (state, action) => {
            state.hierarchical = action.payload.hierarchical;
            state.flat = action.payload.flat;

            return state;
        },
        // Update selected taxonomy.
        updateTaxonomy: (state, action) => {
            state.taxonomy = action.payload.taxonomy;
            state.terms = [];
            state.termsCurrentPage = 0;
            state.termsLastPage = 0;
            state.termsTotal = 0;

            return state;
        },
        // Choose selected taxonomy, and fetch taxonomy terms.
        updateTerms: (state, action) => {
            const {
                termsTotal,
                termsLastPage,
                terms,
            } = action.payload;

            state.terms = terms;
            state.termsTotal = termsTotal;
            state.termsLastPage = termsLastPage;

            if (terms.length) {
                state.termsCurrentPage = Math.max(1, state.termsCurrentPage)
            } else {
                state.termsCurrentPage = 0;
            }

            return state;
        },
        // Select term.
        updateTerm: (state, action) => {
            let term = state.terms.find(term => term.id === action.payload.term.id);

            if (term) {
                term.collapsed = !term.collapsed;
                state.term = term;
            }

            return state;
        },
        updateTermsOrderBy: (state, action) => {
            state.termsOrderBy = action.payload;

            return state;
        },
        updateTermsPerPage: (state, action) => {
            state.termsPerPage = action.payload;

            return state;
        },
        updateTermsCurrentPage: (state, action) => {
            state.termsCurrentPage = parseInt(action.payload);

            return state;
        },
        // Designate a term to slot.
        designateSlot: (state, action) => {
            const {term, slotId} = action.payload;
            let map = state.map;

            if (term.hasOwnProperty('id')) {
                const termId = term.id;

                if (!map.slotMap.hasOwnProperty(slotId)) {
                    map.slotMap[slotId] = [];
                }

                // Store term info.
                if (!map.terms.hasOwnProperty(termId)) {
                    map.terms[termId] = term;
                }

                if (map.termMap.hasOwnProperty(termId)) {
                    const oldSlotId = map.termMap[termId];
                    const idx = map.slotMap[oldSlotId].indexOf(termId)
                    if (idx > -1) {
                        map.slotMap[oldSlotId].splice(idx, 1);
                    }
                    if (map.headerTerms.hasOwnProperty(oldSlotId) && map.headerTerms[oldSlotId] === termId) {
                        map.headerTerms[oldSlotId] = 0;
                    }
                }

                map.termMap[term.id] = slotId;
                map.slotMap[slotId].push(termId);

                // Set header term if the first term is designated.
                if (1 === map.slotMap[slotId].length) {
                    map.headerTerms[slotId] = termId;
                }
            }

            return state;
        },
        // Create a new slot.
        addNewSlot: (state) => {
            state.slots.push(newSlot(state.counter++));

            return state;
        },
        // Set the current slot.
        selectSlot: (state, action) => {
            const slot = action.payload.slot,
                current = state.slots.find(s => s.id === slot.id);

            if (current) {
                current.collapsed = !current.collapsed;
                state.slot = current;
            }

            return state;
        },
        // Toggle name input text.
        toggleNameInput: (state, action) => {
            const slot = action.payload.slot,
                current = state.slots.find(s => s.id === slot.id);

            if (current) {
                current.showNameInput = !current.showNameInput;
            }

            return state;
        },
        // Save slot's name.
        updateSlotName: (state, action) => {
            const {slot, name} = action.payload,
                current = state.slots.find(s => s.id === slot.id)

            if (current) {
                current.name = name;
            }

            return state;
        },
        // Remove a term from a slot.
        removeTermFromSlot: (state, action) => {
            const {
                slot,
                term,
            } = action.payload;

            let map = state.map;

            if (map.termMap.hasOwnProperty(term.id)) {
                delete map.termMap[term.id];
            }

            if (map.slotMap.hasOwnProperty(slot.id)) {
                const idx = map.slotMap[slot.id].indexOf(term.id);
                if (idx > -1) {
                    map.slotMap[slot.id].splice(idx, 1);
                }
            }

            if (map.terms.hasOwnProperty(term.id)) {
                delete map.terms[term.id];
            }

            // Header term.
            if (map.headerTerms.hasOwnProperty(slot.id) && term.id === map.headerTerms[slot.id]) {
                if (map.slotMap[slot.id].length) {
                    map.headerTerms[slot.id] = map.slotMap[slot.id][0];
                } else {
                    map.headerTerms[slot.id] = 0;
                }
            }

            return state;
        },
        // Remove a slot from slots list.
        removeSlot: (state, action) => {
            const s = action.payload.slot,
                {slots, map} = state;

            let slot = state.slot;

            const idx = slots.findIndex(_s => _s.id === s.id);
            if (idx > -1) {
                slots.splice(idx, 1);
            }

            if (s.id === slot.id) {
                slot = {}
            }

            if (map.slotMap.hasOwnProperty(slot.id)) {
                map.slotMap[slot.id].map(termId => {
                    delete map.terms[termId];
                    delete map.termMap[termId];
                });
                delete map.slotMap[slot.id];
            }

            if (map.headerTerms.hasOwnProperty(slot.id)) {
                delete map.headerTerms[slot.id];
            }

            return state;
        },
        updateHeaderTerm: (state, action) => {
            const {
                slot,
                termId
            } = action.payload;

            state.map.headerTerms[slot.id] = termId;

            return state;
        },
        // After successful term merging.
        afterMerge: (state, action) => {
            const slot = action.payload.slot,
                map = state.map,
                headerTermId = map.headerTerms[slot.id];

            map.slotMap[slot.id].map(termId => {
                if (termId !== headerTermId) {
                    if (map.terms.hasOwnProperty(termId)) {
                        delete map.terms[termId];
                    }
                    if (map.termMap.hasOwnProperty(termId)) {
                        delete map.termMap[termId];
                    }
                } else {
                    map.termMap[termId] = 0;
                }
            });

            // Remove slot.
            map.slotMap[slot.id] = [];

            // Remove headerTerm
            map.headerTerms[slot.id] = 0;

            return state;
        },
        expandAllTerms: (state) => {
            state.terms.forEach(term => {
                term.collapsed = false;
            });

            return state;
        },
        collapseAllTerms: (state) => {
            state.terms.forEach(term => {
                term.collapsed = true;
            });
            return state;
        },
        expandAllSlots: (state) => {
            state.slots.forEach(slot => {
                slot.collapsed = false;
            });
            return state;
        },
        collapseAllSlots: (state) => {
            state.slots.forEach(slot => {
                slot.collapsed = true;
            });
            return state;
        },
    }
});

export const {
    updateTaxonomies,
    updateTaxonomy,
    updateTerms,
    updateTerm,
    updateTermsOrderBy,
    updateTermsPerPage,
    updateTermsCurrentPage,
    designateSlot,
    addNewSlot,
    selectSlot,
    toggleNameInput,
    updateSlotName,
    removeTermFromSlot,
    removeSlot,
    updateHeaderTerm,
    afterMerge,
    expandAllTerms,
    collapseAllTerms,
    expandAllSlots,
    collapseAllSlots,
} = taxSlotSlice.actions;

export default taxSlotSlice.reducer;
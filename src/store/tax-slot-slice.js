import {createSlice} from '@reduxjs/toolkit';

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

        // slot's counter.
        counter: 1,

        // All slots list.
        slots: [],

        // Currently selected slot.
        slot: {},

        // Maximum number of slots.
        maxNumSlots: 10
    },
    reducers: {
        // Update taxonomies list.
        updateTaxonomies: (state, action) => {
            state.hierarchical = action.payload.hierarchical;
            state.flat = action.payload.flat;

            return state;
        },
        // Choose selected taxonomy, and fetch taxonomy terms.
        selectTaxonomy: (state, action) => {
            state.taxonomy = action.payload.taxonomy;
            state.terms = action.payload.terms;

            return state;
        },
        // Select term.
        updateTerm: (state, action) => {
            let term = state.terms.find(term => term.id === action.payload.id);

            if (term) {
                term.collapsed = !term.collapsed;
                state.term = term;
            }

            return state;
        },
        // Designate a term to slot.
        designateSlot: (state, action) => {
            const {term, slotId} = action.payload,
                {slots, terms} = state;

            let oldSlot = slots.find(slot => slot.id === term.slotId);
            if (oldSlot && oldSlot.terms.hasOwnProperty(term.id)) {
                delete oldSlot.terms[term.id];
            }

            let newSlot = slots.find(slot => slot.id === slotId);
            if (newSlot) {
                newSlot.terms[term.id] = term
            }

            let _term = terms.find(t => t.id === term.id);
            if (_term) {
                _term.slotId = slotId;
            }

            return state;
        },
        // Create a new slot.
        addNewSlot: (state) => {
            state.slots.push({
                id: state.counter,
                name: `Slot #${state.counter}`,
                terms: {},
                collapsed: true,
                showNameInput: false,
            });

            state.counter += 1;

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

            let _slot = state.slots.find(s => s.id === slot.id),
                _term = state.terms.find(t => t.id === term.id);

            if (_slot && _slot.terms.hasOwnProperty(term.id)) {
                delete _slot.terms[term.id];
            }

            if (_term) {
                _term.slotId = 0;
            }

            return state;
        },
        // Remove a slot from slots list.
        removeSlot: (state, action) => {
            let {slots, terms} = state;

            const slot = action.payload.slot,
                idx = slots.findIndex(s => s.id === slot.id);

            if (idx > -1) {
                Object.values(slots[idx].terms).map(t => {
                    let term = terms.find(term => term.id === t.id);
                    if (term) {
                        term.slotId = 0;
                    }
                });
                slots.splice(idx, 1);
                state.slot = {};
            }

            return state;
        },
    }
});

export const {
    updateTaxonomies,
    selectTaxonomy,
    updateTerm,
    designateSlot,
    addNewSlot,
    selectSlot,
    toggleNameInput,
    updateSlotName,
    removeTermFromSlot,
    removeSlot,
} = taxSlotSlice.actions;

export default taxSlotSlice.reducer;
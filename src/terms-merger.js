import React from "react";
import Frame from './frame';
import FrameWrap from './frame-wrap';
import NavTab from './nav-tab';
import NavWrap from './nav-wrap';
import Terms from './terms';
import Slots from './slots';
import Slot from "./slot";
import Term from "./term";
import axios from "axios";

class TermsMerger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: {
                terms: {
                    id: 'ntm-tab-terms',
                    classNames: ['nav-tab'],
                },
                slots: {
                    id: 'ntm-tab-slots',
                    classNames: ['nav-tab', 'nav-tab-active'],
                }
            },
            frames: {
                terms: {
                    id: 'ntm-frame-terms',
                    classNames: ['ntm-tab-frame']
                },
                slots: {
                    id: 'ntm-frame-slots',
                    classNames: ['ntm-tab-frame', 'ntm-frame-active']
                }
            },
            taxonomies: {
                hierarchical: {},
                flat: {}
            },
            taxonomy: '',
            terms: [],
            term: new Term(),
            slots: [new Slot()],
            slot: null,
            maxNumSlots: 10,
        }

        this.updateTaxonomies = this.updateTaxonomies.bind(this);
        this.updateTaxonomy = this.updateTaxonomy.bind(this);
        this.updateTerm = this.updateTerm.bind(this);
        this.updateDesignation = this.updateDesignation.bind(this);

        this.addNewSlot = this.addNewSlot.bind(this);
        this.updateSlot = this.updateSlot.bind(this);
        this.removeSlot = this.removeSlot.bind(this);

        this.onClickTab = this.onClickTab.bind(this);
    }

    componentDidMount() {
        this.updateTaxonomies();
    }

    updateTaxonomies() {
        axios
            // TODO: paging.
            .get('/wp-json/wp/v2/taxonomies')
            .then(response => {
                let taxonomies = {
                    hierarchical: {},
                    flat: {},
                };

                Object.values(response.data).map(data => {
                    if (data.hierarchical) {
                        taxonomies.hierarchical[data.slug] = {
                            name: data.name,
                            href: data._links['wp:items'][0].href
                        }
                    } else {
                        taxonomies.flat[data.slug] = {
                            name: data.name,
                            href: data._links['wp:items'][0].href
                        }
                    }
                });

                this.setState({taxonomies: taxonomies});
            });
    }

    updateTaxonomy(taxonomy) {
        let url = '';

        if (this.state.taxonomies.hierarchical.hasOwnProperty(taxonomy)) {
            url = this.state.taxonomies.hierarchical[taxonomy].href;
        } else if (this.state.taxonomies.flat.hasOwnProperty(taxonomy)) {
            url = this.state.taxonomies.flat[taxonomy].href;
        }

        if (url.length) {
            axios
                .get(url)
                .then(response => {
                    this.setState({
                        taxonomy: taxonomy,
                        terms: response.data.map(data => {
                            return new Term(data);
                        })
                    });
                });
        }
    }

    updateTerm(term) {
        this.setState(() => {
            return {term: term};
        });
    }

    updateDesignation(slotId) {
        slotId = parseInt(slotId);

        this.setState(({term, slots}) => {
            if (term.getTermId()) {
                const oldSlot = slots.find(slot => slot.getId() === term.getSlotId());
                if (oldSlot) {
                    oldSlot.removeTerm(term);
                }

                const newSlot = slots.find(slot => slot.getId() === slotId);
                if (newSlot) {
                    newSlot.addTerm(term);
                }

                term.setSlotId(slotId);
            }

            return {
                term: term,
                slots: slots
            }
        });
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
        this.setState({slot: slot});
    }

    removeSlot(selected) {
        this.setState(({slots, slot}) => {
            const idx = slots.findIndex(s => s.getId() === selected.getId());

            if (idx > -1 && slot) {
                const s = slots[idx];
                if (slot.getId() === s.getId()) {
                    slot = null;
                }
                slots.splice(idx, 1);
            }

            if (!slots.length) {
                slot = null;
            }

            return {
                slots: slots,
                slot: slot
            };
        })
    }

    onClickTab(tabId) {
        if (this.state.tabs.hasOwnProperty(tabId)) {
            this.setState((state) => {
                Object.keys(state.tabs).map(k => {
                    state.tabs[k].classNames = ['nav-tab'];
                });
                state.tabs[tabId].classNames.push('nav-tab-active');

                Object.keys(state.frames).map(k => {
                    state.frames[k].classNames = ['ntm-tab-frame'];
                });
                state.frames[tabId].classNames.push('ntm-frame-active');

                return state;
            });
        }
    }

    render() {
        return <>
            <NavWrap>
                <NavTab
                    tabId="terms"
                    tabData={this.state.tabs.terms}
                    onClickTab={this.onClickTab}
                >Terms</NavTab>

                <NavTab
                    tabId="slots"
                    tabData={this.state.tabs.slots}
                    onClickTab={this.onClickTab}
                >Slots</NavTab>
            </NavWrap>

            <FrameWrap>
                <Frame
                    id={this.state.frames.terms.id}
                    classNames={this.state.frames.terms.classNames}
                >
                    <Terms
                        taxonomies={this.state.taxonomies}
                        taxonomy={this.state.taxonomy}
                        terms={this.state.terms}
                        term={this.state.term}
                        updateTaxonomy={this.updateTaxonomy}
                        updateTerm={this.updateTerm}
                        slots={this.state.slots}
                        updateDesignation={this.updateDesignation}
                    />
                </Frame>

                <Frame
                    id={this.state.frames.slots.id}
                    classNames={this.state.frames.slots.classNames}
                >
                    <Slots
                        slots={this.state.slots}
                        slot={this.state.slot}
                        maxNumSlots={this.state.maxNumSlots}
                        addNewSlot={this.addNewSlot}
                        updateSlot={this.updateSlot}
                        removeSlot={this.removeSlot}
                    />
                </Frame>
            </FrameWrap>
        </>;
    }
}

export default TermsMerger;

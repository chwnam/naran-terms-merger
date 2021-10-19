import React from "react";
import ReactDOM from "react-dom";
import {Provider, useDispatch, useSelector} from 'react-redux';

import store from "./store/store";
import ExpandCollapse from "./nav-frame/expand-collapse";
import Frame from './nav-frame/frame';
import FrameContent from "./nav-frame/frame-content";
import FrameControls from "./nav-frame/frame-controls";
import FrameWrap from './nav-frame/frame-wrap';
import NavWrap from './nav-frame/nav-wrap';
import NavTab from './nav-frame/nav-tab';
import SlotAdder from "./slot/slot-adder";
import SlotsList from "./slot/slots-list";
import TaxonomySelector from "./tax-term/taxonomy-selector";
import TermsList from "./tax-term/terms-list";
import TermPaginator from "./tax-term/term-paginator";
import {collapseAllSlots, collapseAllTerms, expandAllSlots, expandAllTerms,} from './store/tax-slot-slice';

function TermsMerger() {
    const dispatch = useDispatch(),
        {terms, slots} = useSelector(state => state.taxSlot);

    return <>
        <NavWrap>
            <NavTab target="terms">Terms</NavTab>
            <NavTab target="slots">Slots</NavTab>
        </NavWrap>
        <FrameWrap>
            <Frame target="terms">
                <FrameControls>
                    <TaxonomySelector/>
                    <ExpandCollapse
                        show={terms.length > 0}
                        onExpandAll={() => {
                            dispatch(expandAllTerms());
                        }}
                        onCollapseAll={() => {
                            dispatch(collapseAllTerms());
                        }}
                    />
                    <TermPaginator/>
                </FrameControls>
                <FrameContent>
                    <TermsList/>
                </FrameContent>
            </Frame>
            <Frame target="slots">
                <FrameControls>
                    <SlotAdder/>
                    <ExpandCollapse
                        show={slots.length > 0}
                        onExpandAll={() => {
                            dispatch(expandAllSlots());
                        }}
                        onCollapseAll={() => {
                            dispatch(collapseAllSlots());
                        }}
                    />
                </FrameControls>
                <FrameContent>
                    <SlotsList/>
                </FrameContent>
            </Frame>
        </FrameWrap>
    </>;
}

ReactDOM.render(
    <Provider store={store}>
        <TermsMerger/>
    </Provider>,
    document.getElementById('naran-terms-merger')
);

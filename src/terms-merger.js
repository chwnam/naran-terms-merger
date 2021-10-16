import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';

import store from "./store/store";
import Frame from './nav-frame/frame';
import FrameContent from "./nav-frame/frame-content";
import FrameControls from "./nav-frame/frame-controls";
import FrameWrap from './nav-frame/frame-wrap';
import NavWrap from './nav-frame/nav-wrap';
import NavTab from './nav-frame/nav-tab';
import SlotAdder from "./slot/slot-adder";
import SlotsList from "./slot/slots-list";
import TermsList from "./tax-term/terms-list";
import TaxonomySelector from "./tax-term/taxonomy-selector";

function TermsMerger() {
    return <>
        <NavWrap>
            <NavTab target="terms">Terms</NavTab>
            <NavTab target="slots">Slots</NavTab>
        </NavWrap>
        <FrameWrap>
            <Frame target="terms">
                <FrameControls>
                    <TaxonomySelector/>
                </FrameControls>
                <FrameContent>
                    <TermsList/>
                </FrameContent>
            </Frame>
            <Frame target="slots">
                <FrameControls>
                    <SlotAdder/>
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

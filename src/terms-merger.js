import React from "react";
import Frame from './frame';
import FrameWrap from './frame-wrap';
import NavTab from './nav-tab';
import NavWrap from './nav-wrap';
import Terms from './terms';
import Slots from './slots';

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
            }
        }

        this.onClickTab = this.onClickTab.bind(this);
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
                    <Terms/>
                </Frame>

                <Frame
                    id={this.state.frames.slots.id}
                    classNames={this.state.frames.slots.classNames}
                >
                    <Slots/>
                </Frame>
            </FrameWrap>
        </>;
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
}

export default TermsMerger;

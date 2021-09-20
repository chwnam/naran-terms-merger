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
                    classNames: ['nav-tab', 'nav-tab-active'],
                },
                slots: {
                    id: 'ntm-tab-slots',
                    classNames: ['nav-tab'],
                }
            },
            frames: {
                terms: {
                    id: 'ntm-frame-terms',
                    classNames: ['ntm-tab-frame', 'ntm-frame-active']
                },
                slots: {
                    id: 'ntm-frame-slots',
                    classNames: ['ntm-tab-frame']
                }
            }
        }

        this.onClickTab = this.onClickTab.bind(this);
    }

    render() {
        return <>
            <NavWrap>
                <NavTab
                    stateKey="terms"
                    tabData={this.state.tabs.terms}
                    onClickTab={this.onClickTab}
                >Terms</NavTab>

                <NavTab
                    stateKey="slots"
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

    onClickTab(key) {
        if (this.state.tabs.hasOwnProperty(key)) {
            this.setState((state) => {
                Object.keys(state.tabs).map(k => {
                    state.tabs[k].classNames = ['nav-tab'];
                });
                state.tabs[key].classNames.push('nav-tab-active');

                Object.keys(state.frames).map(k => {
                    state.frames[k].classNames = ['ntm-tab-frame'];
                });
                state.frames[key].classNames.push('ntm-frame-active');

                return state;
            });
        }
    }
}

export default TermsMerger;

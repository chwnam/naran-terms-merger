import React from "react";
import {useSelector} from "react-redux";

import TermItemWrap from "./term-item-wrap";

function getClassNames(a, b) {
    let classNames = ['ntm-term', 'ntm-item-wrap'];

    if (a.id === b.id) {
        classNames.push('current');
    }

    return classNames.join(' ');
}

function TermsList(props) {
    const {
        taxonomy,
        terms,
        term,
    } = useSelector(state => state.taxSlot);

    if (taxonomy.length && terms && terms.length) {
        return (
            <ul id="ntm-terms" className={'taxonomy-' + taxonomy}>
                {terms.map(t => {
                    return (
                        <li key={'term-' + t.id} className={getClassNames(t, term)}>
                            <TermItemWrap term={t}/>
                        </li>
                    );
                })}
            </ul>
        )
    } else {
        let text;

        if (!taxonomy.length) {
            text = '[Please choose a taxonomy]';
        } else {
            text = '[Sorry, no terms found]';
        }

        return (
            <ul id="ntm-terms" className={'taxonomy-' + taxonomy}>
                <li key="no-item" className="ntm-no-items">
                    <p>{text}</p>
                </li>
            </ul>
        )
    }
}

export default TermsList;

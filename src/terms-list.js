import React from "react";
import TermItemWrap from "./term-item-wrap";

function TermsList(props) {
    const {
        taxonomy,
        terms,
        term,
        updateTerm
    } = props;

    if (taxonomy.length && terms && terms.length) {
        return (
            <ul id="ntm-terms" className={'taxonomy-' + taxonomy}>
                {terms.map(t => {
                    return (
                        <li
                            key={'term-' + t.term_id}
                            className={'ntm-term ntm-item-wrap ' + (term && t.term_id === term.term_id ? 'current' : '')}
                        >
                            <TermItemWrap
                                term={t}
                                current={term}
                                taxonomy={taxonomy}
                                updateTerm={updateTerm}
                            />
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
            text = '[Sorry, no items found]';
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

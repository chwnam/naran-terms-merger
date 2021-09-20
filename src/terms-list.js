import React from "react";
import TermItemWrap from "./term-item-wrap";

class TermsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            taxonomy,
            terms,
            term,
            updateTerm
        } = this.props;

        if (taxonomy.length && terms && terms.length) {
            return (
                <ul id="ntm-terms" className={'taxonomy-' + taxonomy}>
                    {terms.map(t => {
                        return (
                            <TermItemWrap
                                key={'term-item-wrap-' + t.term_id}
                                term={t}
                                current={term}
                                taxonomy={taxonomy}
                                updateTerm={updateTerm}
                            />
                        )
                    })}
                </ul>
            )
        } else {
            let text = '';

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
}

export default TermsList;

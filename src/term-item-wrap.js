import React from "react";

function TermItemWrap(props) {
    const {
        term,
        current,
        updateTerm
    } = props;

    let wrapClass = 'ntm-item-wrap',
        spanClass = 'ntm-item-toggle ntm-item-icon',
        insideClass = 'ntm-item-inside';

    if (current && current.term_id === term.term_id) {
        wrapClass += ' current';
    }

    if (term && term.collapsed) {
        insideClass += ' collapsed';
        spanClass += ' ntm-icon-chevron-up';
    } else {
        spanClass += ' ntm-icon-chevron-down';
    }

    return (
        <li className={wrapClass}>
            <div
                className="ntm-title-wrap"
                onClick={() => {
                    updateTerm(term);
                }}
            >
                <h3 className="ntm-item-title">
                    [#{term.term_id}] {term.name}
                </h3>
                <div className="ntm-item-control">
                    <span className={spanClass}/>
                </div>
            </div>
            <div className={insideClass}>
                <ul className="ntm-term-detail">
                    <li>
                        {term.description}
                    </li>
                    <li>
                        Term ID: {term.term_id}
                    </li>
                    <li>
                        Slug: {term.slug}
                    </li>
                    <li>
                        Count: {term.count}
                    </li>
                </ul>
                <div className="ntm-designate-slot-wrap">
                    <label htmlFor="designated-slot">Designated to</label>:
                    <select id="designated-slot">
                        <option defaultValue="slog-1">Slot #1</option>
                        <option defaultValue="slot-2">Slot #2</option>
                        <option defaultValue="slot-3">Slot #3</option>
                    </select>
                </div>
            </div>
        </li>
    );
}

export default TermItemWrap;

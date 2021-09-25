import React from "react";

function TermItemWrap(props) {
    const {
        term,
        updateTerm,
        slots,
        updateDesignation,
    } = props;

    let spanClass = 'ntm-item-toggle ntm-item-icon',
        insideClass = 'ntm-item-inside';

    if (term.isCollapsed()) {
        spanClass += ' ntm-icon-chevron-up';
        insideClass += ' collapsed';
    } else {
        spanClass += ' ntm-icon-chevron-down';
    }

    return (
        <>
            <div
                className="ntm-title-wrap"
                onClick={() => {
                    term.setCollapsed(!term.isCollapsed());
                    updateTerm(term);
                }}
            >
                <h3 className="ntm-item-title">
                    [#{term.getTermId()}] {term.getName()}
                </h3>
                <div className="ntm-item-control">
                    <span className={spanClass}/>
                </div>
            </div>
            <div className={insideClass}>
                <ul className="ntm-term-detail">
                    <li>
                        {term.getDescription()}
                    </li>
                    <li>
                        Term ID: {term.getTermId()}
                    </li>
                    <li>
                        Slug: {term.getSlug()}
                    </li>
                    <li>
                        Count: {term.getCount()}
                    </li>
                </ul>
                <div className="ntm-designate-slot-wrap">
                    <label htmlFor="designated-slot">Designated to</label>:
                    <select
                        value={term.getSlotId()}
                        onChange={(e) => {
                            updateDesignation(e.target.value);
                        }}
                    >
                        <option
                            value={0}
                        >
                            None
                        </option>

                        {slots.map((slot, idx) => {
                            return (
                                <option
                                    key={slot.getId()}
                                    value={slot.getId()}
                                >
                                    [#{idx + 1}] {slot.getTitle()}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </>
    );
}

export default TermItemWrap;

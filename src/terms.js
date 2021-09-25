import React from "react";
import FrameControls from "./frame-controls";
import FrameContent from "./frame-content";
import TermsList from "./terms-list";
import TaxonomySelector from "./taxonomy-selector";

function Terms(props) {
    const {
        taxonomies,
        taxonomy,
        terms,
        term,
        updateTaxonomy,
        updateTerm,
        slots,
        updateDesignation
    } = props;

    return (
        <>
            <FrameControls>
                <TaxonomySelector
                    taxonomies={taxonomies}
                    taxonomy={taxonomy}
                    updateTaxonomy={updateTaxonomy}
                />
            </FrameControls>
            <FrameContent>
                <TermsList
                    taxonomy={taxonomy}
                    terms={terms}
                    term={term}
                    updateTerm={updateTerm}
                    slots={slots}
                    updateDesignation={updateDesignation}
                />
            </FrameContent>
        </>
    )
}

export default Terms;

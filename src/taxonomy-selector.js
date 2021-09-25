import React from "react";

function TaxonomySelector(props) {
    const hierarchical = props.taxonomies.hierarchical,
        flat = props.taxonomies.flat,
        updateTaxonomy = props.updateTaxonomy,
        taxonomy = props.taxonomy;

    return (
        <li>
            <label htmlFor="taxonomy-selector">Taxonomy</label>:

            <select
                id="taxonomy-selector"
                autoComplete="off"
                value={taxonomy}
                onChange={(e) => {
                    updateTaxonomy(e.target.value);
                }}
            >
                <option disabled="disabled" value="">-- Choose --</option>

                <optgroup label="Hierarchical">
                    {Object.entries(hierarchical).map(([taxonomy, {name}]) => {
                        return <option key={taxonomy} value={taxonomy}>{name}</option>
                    })}
                </optgroup>

                <optgroup label="Flat">
                    {Object.entries(flat).map(([taxonomy, {name}]) => {
                        return <option key={taxonomy} value={taxonomy}>{name}</option>
                    })}
                </optgroup>
            </select>
        </li>
    );
}

export default TaxonomySelector;
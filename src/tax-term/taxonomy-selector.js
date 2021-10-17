import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateTaxonomies, updateTaxonomy, updateTerms} from "../store/tax-slot-slice";
import {fetchInitialTaxonomies, getTaxonomyTerms} from "../store/utils";

function TaxonomySelector() {
    const {
        hierarchical,
        flat,
        taxonomy
    } = useSelector(state => state.taxSlot);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchInitialTaxonomies().then(taxonomies => {
            dispatch(updateTaxonomies(taxonomies));
        });
    }, []);

    return (
        <li>
            <label htmlFor="taxonomy-selector">Taxonomy</label>

            <select
                id="taxonomy-selector"
                autoComplete="off"
                value={taxonomy}
                onChange={(e) => {
                    dispatch(updateTaxonomy({taxonomy: e.target.value}));
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

            <input
                type="button"
                className="button button-secondary"
                value="Load"
                onClick={() => {
                    getTaxonomyTerms(hierarchical, flat, taxonomy).then(terms => {
                        dispatch(updateTerms({terms: terms}));
                    });
                }}
            />
        </li>
    );
}

export default TaxonomySelector;
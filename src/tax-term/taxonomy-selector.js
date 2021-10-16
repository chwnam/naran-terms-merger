import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateTaxonomies, updateTaxonomy, updateTerms} from "../store/tax-slot-slice";
import {fetchInitialTaxonomies, newTerm} from "../store/utils";

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
                    let url = '';

                    if (hierarchical.hasOwnProperty(taxonomy)) {
                        url = hierarchical[taxonomy].href;
                    } else if (flat.hasOwnProperty(taxonomy)) {
                        url = flat[taxonomy].href;
                    }

                    if (url.length) {
                        fetch(url)
                            .then(r => r.json())
                            .then(terms => {
                                dispatch(updateTerms({terms: terms.map(term => newTerm(term))}));
                            });
                    }
                }}
            />
        </li>
    );
}

export default TaxonomySelector;
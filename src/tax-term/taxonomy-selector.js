import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    updateTaxonomies,
    updateTaxonomy,
    updateTerms,
    updateTermsOrderBy,
    updateTermsPerPage,
} from "../store/tax-slot-slice";

import {fetchInitialTaxonomies, getTaxonomyTerms} from "../store/utils";

function TaxonomySelector() {
    const {
        hierarchical,
        flat,
        termsOrderBy,
        termsPerPage,
        termsPerPageMax,
        termsCurrentPage,
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

            <span className="control-separator">|</span>

            <label htmlFor="terms-orderby">Order</label>
            <select
                id="terms-orderby"
                autoComplete="off"
                value={termsOrderBy}
                onChange={(e) => {
                    dispatch(updateTermsOrderBy(e.target.value));
                }}
            >
                <option value="name-asc">Name Asc.</option>
                <option value="name-desc">Name Desc.</option>
                <option value="id-asc">ID Asc.</option>
                <option value="id-desc">ID Desc.</option>
            </select>

            <span className="control-separator">|</span>

            <label htmlFor="terms-per-page">Per Page</label>
            <input
                id="terms-per-page"
                type="number"
                className="text short-input"
                value={termsPerPage}
                min="10"
                max={termsPerPageMax}
                step="10"
                onChange={e => {
                    dispatch(updateTermsPerPage(parseInt(e.target.value)));
                }}
            />

            <span className="control-separator">|</span>

            <input
                type="button"
                className="button button-secondary"
                value="Load"
                onClick={() => {
                    getTaxonomyTerms({
                            hierarchical,
                            flat,
                            taxonomy,
                            orderby: termsOrderBy,
                            perPage: termsPerPage,
                            page: termsCurrentPage
                        }
                    ).then(response => {
                        dispatch(updateTerms(response));
                    });
                }}
            />
        </li>
    );
}

export default TaxonomySelector;
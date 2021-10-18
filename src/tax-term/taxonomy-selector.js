import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    updateTaxonomies,
    updateTaxonomy,
    updateTerms,
    updateTermsOrderBy,
    updateTermsPerPage,
} from "../store/tax-slot-slice";

import {fetchInitialTaxonomies, getTaxonomyTerms, getTermsListUrl} from "../store/utils";

function TaxonomySelector() {
    const {
        hierarchical,
        flat,
        termsOrderBy,
        termsPerPage,
        termsCurrentPage,
        taxonomy
    } = useSelector(state => state.taxSlot);

    const dispatch = useDispatch();

    const $ = jQuery;

    const update = function (url, args = {}) {
        args = $.extend({
            orderBy: termsOrderBy,
            perPage: termsPerPage,
            page: termsCurrentPage,
        }, args);

        getTaxonomyTerms(url, args).then(response => {
            dispatch(updateTerms(response));
        })
    };

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
                    const newTaxonomy = e.target.value;
                    dispatch(updateTaxonomy({taxonomy: newTaxonomy}));
                    update(getTermsListUrl(hierarchical, flat, newTaxonomy), {taxonomy: newTaxonomy});
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
                    const newTermsOrder = e.target.value;
                    dispatch(updateTermsOrderBy(newTermsOrder));
                    update(getTermsListUrl(hierarchical, flat, taxonomy), {orderBy: newTermsOrder})
                }}
            >
                <option value="name-asc">Name Asc.</option>
                <option value="name-desc">Name Desc.</option>
                <option value="id-asc">ID Asc.</option>
                <option value="id-desc">ID Desc.</option>
            </select>

            <span className="control-separator">|</span>

            <label htmlFor="terms-per-page">Per Page</label>
            <select
                id="terms-per-page"
                value={termsPerPage}
                onChange={e => {
                    const newPerPage = parseInt(e.target.value);
                    dispatch(updateTermsPerPage(newPerPage));
                    update(getTermsListUrl(hierarchical, flat, taxonomy), {perPage: newPerPage});
                }}
            >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={70}>70</option>
                <option value={100}>100</option>
            </select>
        </li>
    );
}

export default TaxonomySelector;
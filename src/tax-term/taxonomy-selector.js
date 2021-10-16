import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTaxonomy, updateTaxonomies} from "../store/tax-slot-slice";

function TaxonomySelector() {
    const {
        hierarchical,
        flat,
        taxonomy
    } = useSelector(state => state.taxSlot);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/wp-json/wp/v2/taxonomies')
            .then(r => r.json())
            .then(taxonomies => {
                let hierarchical = {},
                    flat = {};

                Object.values(taxonomies).map(taxonomy => {
                    if (taxonomy.hierarchical) {
                        hierarchical[taxonomy.slug] = {
                            name: taxonomy.name,
                            href: taxonomy._links['wp:items'][0].href
                        }
                    } else {
                        flat[taxonomy.slug] = {
                            name: taxonomy.name,
                            href: taxonomy._links['wp:items'][0].href
                        }
                    }
                });

                dispatch(updateTaxonomies({hierarchical, flat}));
            });
    }, []);

    return (
        <li>
            <label htmlFor="taxonomy-selector">Taxonomy</label>:

            <select
                id="taxonomy-selector"
                autoComplete="off"
                value={taxonomy}
                onChange={(e) => {
                    const taxonomy = e.target.value;

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
                                dispatch(selectTaxonomy({
                                    taxonomy: taxonomy,
                                    terms: terms.map(term => {
                                        return {
                                            id: term.id,
                                            count: term.count,
                                            description: term.description,
                                            link: term.link,
                                            name: term.name,
                                            slug: term.slug,
                                            parent: term.parent,
                                            collapsed: true,
                                            slotId: 0,
                                        }
                                    })
                                }));
                            });
                    }
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
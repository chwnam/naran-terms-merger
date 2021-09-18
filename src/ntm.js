/* globals ntm, wp */
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

function TaxonomySelection(props) {
    const hierarchical = props.hierarchical || {}
    const flat = props.flat || {}
    const taxonomy = props.taxonomy
    const onTaxonomyChange = props.onTaxonomyChange
    const updateTerms = props.updateTerms

    return (
        <div id="taxonomy-selection">
            <label htmlFor="taxonomy">Taxonomy</label>:
            &nbsp;

            <select
                id="taxonomy"
                autoComplete="off"
                value={taxonomy}
                onChange={(e) => onTaxonomyChange(e.target.value)}
            >
                <option value="" disabled>-- Choose a taxonomy --</option>
                <optgroup label="Hierarchical">
                    {Object.entries(hierarchical).map(([k, v]) => {
                        return <option key={k} value={k}>{v}</option>
                    })}
                </optgroup>
                <optgroup label="Flat">
                    {Object.entries(flat).map(([k, v]) => {
                        return <option key={k} value={k}>{v}</option>
                    })}
                </optgroup>
            </select>
            &nbsp;

            <button
                type="button"
                className="button button-secondary"
                onClick={() => updateTerms()}
            >Select
            </button>
        </div>
    )
}

function TermsSection(props) {
    const orderBy = props.orderBy
    const onOrderByChange = props.onOrderByChange
    const updateTerms = props.updateTerms
    const terms = props.terms

    return (
        <section className="ntm-section terms-section">
            <div>
                <h3>All Terms</h3>

                <label htmlFor="orderby">Order By</label>:
                &nbsp;

                <select
                    id="orderby"
                    autoComplete="off"
                    value={orderBy}
                    onChange={(e) => onOrderByChange(e.target.value)}
                >
                    <option value="name_asc">Name Asc.</option>
                    <option value="name_desc">Name Asc.</option>
                    <option value="count_asc">Count Asc.</option>
                    <option value="count_desc">Count Desc.</option>
                </select>
                &nbsp;

                <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => updateTerms()}
                >Reorder
                </button>

                <ul id="all-terms" className="slot overflow-y-scroll">
                    {terms.map((term, i) => {
                        console.log(term,i);
                    })}
                </ul>
            </div>
        </section>
    )
}

function ActionSection() {
    return (
        <section className="ntm-section action-section">

        </section>
    )
}

function TermMerger(props) {
    const nonce = props.nonce
    const ajax = wp.ajax

    const [taxonomy, setTaxonomy] = useState('')
    const [terms, setTerms] = useState([])
    const [orderBy, setOrderBy] = useState('name_asc')

    const onTaxonomyChange = (taxonomy) => {
        setTaxonomy(taxonomy)
    }

    const onOrderByChange = (order) => {
        setOrderBy(order)
    }

    const updateTerms = () => {
        ajax.send('ntm_get_terms', {
            type: 'GET',
            data: {
                taxonomy: taxonomy,
                nonce: nonce,
            },
            success(data) {
                setTerms(data)
            }
        });
    }

    return (
        <>
            <TaxonomySelection
                hierarchical={props.hierarchical}
                flat={props.flat}
                taxonomy={taxonomy}
                onTaxonomyChange={onTaxonomyChange}
                updateTerms={updateTerms}
            />
            <div id="ntm-container">
                <TermsSection
                    orderBy={orderBy}
                    onOrderByChange={onOrderByChange}
                    terms={terms}
                    updateTerms={updateTerms}
                />
                <ActionSection/>
            </div>
        </>
    )
}

console.dir('global ntm', ntm)

if (window.hasOwnProperty('ntm')) {
    ReactDOM.render(
        <TermMerger
            hierarchical={ntm.taxonomies.hierarchical}
            flat={ntm.taxonomies.flat}
            nonce={ntm.nonce}
        />,
        document.getElementById('naran-tag-merger')
    )
}

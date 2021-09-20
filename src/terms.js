import React from "react";
import axios from "axios";
import TermsControls from "./terms-controls";
import TermsFrameContent from "./terms-frame-content";
import TermsList from "./terms-list";

class Terms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taxonomies: {
                hierarchical: {},
                flat: {}
            },
            taxonomy: '',
            terms: [],
            term: null
        }

        this.updateTaxonomies = this.updateTaxonomies.bind(this);
        this.updateTaxonomy = this.updateTaxonomy.bind(this);
        this.updateTerm = this.updateTerm.bind(this);
    }

    componentDidMount() {
        this.updateTaxonomies();
    }

    updateTaxonomies() {
        axios
            // TODO: nopaging.
            .get('/wp-json/wp/v2/taxonomies')
            .then(response => {
                let taxonomies = {
                    hierarchical: {},
                    flat: {},
                };

                Object.values(response.data).map(data => {
                    if (data.hierarchical) {
                        taxonomies.hierarchical[data.slug] = {
                            name: data.name,
                            href: data._links['wp:items'][0].href
                        }
                    } else {
                        taxonomies.flat[data.slug] = {
                            name: data.name,
                            href: data._links['wp:items'][0].href
                        }
                    }
                });

                this.setState({taxonomies: taxonomies});
            });
    }

    updateTaxonomy(taxonomy) {
        let url = '';

        if (this.state.taxonomies.hierarchical.hasOwnProperty(taxonomy)) {
            url = this.state.taxonomies.hierarchical[taxonomy].href;
        } else if (this.state.taxonomies.flat.hasOwnProperty(taxonomy)) {
            url = this.state.taxonomies.flat[taxonomy].href;
        }

        if (url.length) {
            axios
                .get(url)
                .then(response => {
                    let terms = response.data.map(data => {
                        return {
                            term_id: data.id,
                            name: data.name,
                            slug: data.slug,
                            count: data.count,
                            parent: data.parent,
                            description: data.description,
                            collapsed: true
                        }
                    });
                    this.setState({
                        taxonomy: taxonomy,
                        terms: terms
                    });
                });
        }
    }

    updateTerm(term) {
        term.collapsed = !term.collapsed;
        this.setState({term:term});
    }

    render() {
        return (
            <>
                <TermsControls
                    taxonomies={this.state.taxonomies}
                    updateTaxonomy={this.updateTaxonomy}
                    taxonomy={this.state.taxonomy}
                />
                <TermsFrameContent>
                    <TermsList
                        taxonomy={this.state.taxonomy}
                        terms={this.state.terms}
                        term={this.state.term}
                        updateTerm={this.updateTerm}
                    />
                </TermsFrameContent>
            </>
        )
    }
}

export default Terms;

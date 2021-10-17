const {
    restUrl,
    ajaxUrl,
    nonce
} = window.hasOwnProperty('ntm') ? window.ntm : {
    restUrl: '',
    ajaxUrl: '',
    nonce: ''
};

function getEndpoint(endpoint) {
    return restUrl + 'wp/v2/' + endpoint;
}

async function fetchInitialTaxonomies() {
    const taxonomies = await (
        await fetch(getEndpoint('taxonomies'))
    ).json();

    if (taxonomies) {
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

        return {
            hierarchical,
            flat
        };
    }
}

async function getTaxonomyTerms(props) {
    const {
        hierarchical,
        flat,
        taxonomy,
        orderby,
        perPage,
        page,
    } = props;

    let url = '';

    if (hierarchical.hasOwnProperty(taxonomy)) {
        url = hierarchical[taxonomy].href;
    } else if (flat.hasOwnProperty(taxonomy)) {
        url = flat[taxonomy].href;
    }

    if (url.length) {
        let orders = orderby.split('-');

        url += '?page=' + (Math.max(page, 1)) +
            '&per_page=' + perPage +
            '&orderby=' + orders[0] +
            '&order=' + orders[1];

        const response = await fetch(url);
        const headers = await response.headers;
        const data = await response.json();

        if (headers && data) {
            let termsTotal = 0,
                termsLastPage = 0;

            if (headers.has('X-WP-Total')) {
                termsTotal = parseInt(headers.get('X-WP-Total'));
            }

            if (headers.get('X-WP-TotalPages')) {
                termsLastPage = parseInt(headers.get('X-WP-TotalPages'));
            }

            return {
                termsTotal,
                termsLastPage,
                terms: data.map(term => newTerm(term))
            };
        }
    }
}

async function requestMergeTerms(termIds, headerTerm) {
    let formData = new FormData();

    formData.append('action', 'ntm_request_merge_term');

    formData.append('nonce', nonce);

    termIds.map(termId => {
        formData.append('term_id[]', termId)
    });

    formData.append('header_term', headerTerm);

    return await (
        await fetch(ajaxUrl, {
            method: 'POST',
            body: formData,
        })
    ).json();
}

function newTerm(term) {
    return {
        id: term.id || 0,
        count: term.count || 0,
        description: term.description || '',
        link: term.link || '',
        name: term.name || '',
        slug: term.slug || '',
        parent: term.parent || 0,
        collapsed: true,
    }
}

function newSlot(counter) {
    return {
        id: counter,
        name: `Slot #${counter}`,
        collapsed: true,
        showNameInput: false,
    }
}

function getTermsFromSlot(map, slotId) {
    if (map.slotMap.hasOwnProperty(slotId)) {
        return map.slotMap[slotId].map(termId => map.terms[termId]);
    } else {
        return [];
    }
}

function getSlotIdByTermId(map, termId) {
    if (map.termMap.hasOwnProperty(termId)) {
        return map.termMap[termId];
    } else {
        return 0
    }
}

function isHeaderTerm(map, slotId, termId,) {
    return map.headerTerms.hasOwnProperty(slotId) && (termId === map.headerTerms[slotId]);
}

export {
    fetchInitialTaxonomies,
    getTaxonomyTerms,
    requestMergeTerms,
    newTerm,
    newSlot,
    getTermsFromSlot,
    getSlotIdByTermId,
    isHeaderTerm
};

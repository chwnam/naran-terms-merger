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

function requestMergeTerms(termIds, headerTerm) {
    let formData = new FormData();

    formData.append('action', 'ntm_request_merge_term');

    formData.append('nonce', nonce);

    termIds.map(termId => {
        formData.append('term_id[]', termId)
    });

    formData.append('header_term', headerTerm);

    fetch(ajaxUrl, {
        method: 'POST',
        body: formData,
    });
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
    requestMergeTerms,
    newTerm,
    newSlot,
    getTermsFromSlot,
    getSlotIdByTermId,
    isHeaderTerm
};

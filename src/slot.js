class Slot {
    static #sequence = 1;

    #title = '';

    #id = 0;

    #collapsed = true;

    #terms = {};

    constructor(title) {
        this.setTitle('undefined' === typeof title ? ('Slot #' + Slot.#sequence) : title)
        this.#id = Slot.#sequence;
        ++Slot.#sequence;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    setTitle(title) {
        this.#title = title;
        return this;
    }

    isCollapsed() {
        return this.#collapsed;
    }

    setCollapsed(collapsed) {
        this.#collapsed = collapsed;
        return this;
    }

    addTerm(term) {
        if (!this.#terms.hasOwnProperty(term.getTermId())) {
            this.#terms[term.getTermId()] = term;
        }
        return this;
    }

    removeTerm(term) {
        if (this.#terms.hasOwnProperty(term.getTermId())) {
            delete this.#terms[term.getTermId()];
        }
        return this;
    }

    getTerms() {
        return this.#terms
    }
}

export default Slot;
